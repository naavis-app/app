import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				firstname: z.string(),
				lastname: z.string(),
				type: z.enum(["phone", "tablet", "laptop", "smartwatch"]),
				userId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				return await ctx.db.user.update({
					where: {
						id: input.id,
					},
					data: {
						firstname: input.firstname,
						lastname: input.lastname,
					},
				});
			} catch (e) {
				console.error(e);
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Failed to update user",
				});
			}
		}),
});
