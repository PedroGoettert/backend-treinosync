import type { FastifyReply, FastifyRequest } from "fastify";
import { signUpEmailService } from "./auth.service.js";

type SignUpBody = {
	email: string;
	name: string;
	password: string;
};

export async function singUpController(
	request: FastifyRequest<{ Body: SignUpBody }>,
	reply: FastifyReply,
) {
	const result = await signUpEmailService(request.body);
	return reply.status(201).send(result);
}
