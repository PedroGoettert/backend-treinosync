import { auth } from "../../lib/auth.js";

type SignUpBody = {
	email: string;
	name: string;
	password: string;
};

export async function signUpEmailService(input: SignUpBody) {
	const email = input.email.trim().toLowerCase();
	const name = input.name.trim();
	const password = input.password;

	try {
		const result = await auth.api.signUpEmail({
			body: { email, name, password },
		});

		return result;
	} catch (err: unknown) {
		const message =
			err instanceof Error ? err.message : "Failed to sign up user";

		throw new Error(message);
	}
}
