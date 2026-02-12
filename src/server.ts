import Fastify from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./config/env";

const server = Fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.get("/health", async () => {
	return { ok: true };
});

server
	.listen({
		port: env.PORT || 3333,
		host: "0.0.0.0",
	})
	.then(() => console.log(`HTTP Server running in port ${process.env.PORT}`));
