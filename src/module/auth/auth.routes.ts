import type { FastifyInstance } from "fastify";
import { singUpController } from "./auth.controller.js";
import { newUserSchema } from "./auth.schema.js";

export async function authRoutes(server: FastifyInstance) {
	server.post(
		"/signup",
		{
			schema: {
				body: newUserSchema,
			},
		},
		singUpController,
	);
}
