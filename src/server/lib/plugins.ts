import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../api/trpc";
import { validateSession } from "./auth";

export const validateSessionPlugin = publicProcedure.use(async (opts) => {
    const { session, user } = await validateSession(opts.ctx.headers.get('cookie') ?? '');

    if (!session || !user) {
        throw new TRPCError({
            code: "UNAUTHORIZED"
        });
    }

    return opts.next();
});