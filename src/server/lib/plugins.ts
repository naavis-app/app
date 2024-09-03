import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../api/trpc";
import { lucia } from "./lucia";

export const validateSessionPlugin = publicProcedure.use(async (opts) => {
	const { session, user } = await lucia.validateSession(
		lucia.readSessionCookie(opts.ctx.headers.get("cookie") ?? "") ?? "",
	);

	if (!session || !user) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
		});
	}

	return opts.next();
});
