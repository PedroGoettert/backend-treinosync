import fastifyCors from "@fastify/cors";
import Fastify from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./config/env/index.js";
import { auth } from "./lib/auth.js";
import { authRoutes } from "./modules/auth/auth.routes.js";

const server = Fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, {
	origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	credentials: true,
	maxAge: 86400,
});

// Register authentication endpoint
server.route({
	method: ["GET", "POST"],
	url: "/api/auth/*",
	async handler(request, reply) {
		try {
			// Construct request URL
			const url = new URL(request.url, `http://${request.headers.host}`);

			// Convert Fastify headers to standard Headers object
			const headers = new Headers();
			Object.entries(request.headers).forEach(([key, value]) => {
				if (value) headers.append(key, value.toString());
			});
			// Create Fetch API-compatible request
			const req = new Request(url.toString(), {
				method: request.method,
				headers,
				...(request.body ? { body: JSON.stringify(request.body) } : {}),
			});
			// Process authentication request
			const response = await auth.handler(req);
			// Forward response to client
			reply.status(response.status);
			for (const [key, value] of response.headers.entries()) {
				reply.header(key, value);
			}
			reply.send(response.body ? await response.text() : null);
		} catch (err: unknown) {
			server.log.error({ err }, "Authentication Error");
			reply.status(500).send({
				error: "Internal authentication error",
				code: "AUTH_FAILURE",
			});
		}
	},
});

server.get("/health", async () => {
	return { ok: true };
});

server.register(authRoutes, { prefix: "/api/auth" });

server
	.listen({
		port: env.PORT || 3333,
		host: "0.0.0.0",
	})
	.then(() => console.log(`HTTP Server running in port ${process.env.PORT}`));
