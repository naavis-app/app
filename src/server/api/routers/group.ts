import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                ownerId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                return await ctx.db.group.create({
                    data: {
                        name: input.name,
                        owner: {
                            connect: { id: input.ownerId },
                        },
                        members: {
                            connect: { id: input.ownerId },
                        },
                    },
                });
            } catch (e) {
                console.error(e);
                throw new Error("Failed to create group");
            }
        }),
    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                return await ctx.db.group.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        name: input.name,
                    },
                });
            } catch (e) {
                console.error(e);
                throw new Error("Failed to update group");
            }
        }),
    list: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            // Find groups that the user is a member of
            return ctx.db.group.findMany({
                where: {
                    members: {
                        some: { id: input.userId },
                    },
                },
            });
        }),
    delete: publicProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            // TODO: AHHHH REMEMBER WE NEED TO PROTECT ALL THESE ENDPOINTS
            try {
                return await ctx.db.group.delete({
                    where: {
                        id: input.id,
                    },
                });
            } catch (e) {
                console.error(e);
                throw new Error("Failed to delete group");
            }
        }),
});
