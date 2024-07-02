import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                ownerId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                return await ctx.db.group.create({
                    data: {
                        name: input.name,
                        description: input.description,
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
                description: z.string(),
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
    getOrCreateInviteCode: publicProcedure.input(z
        .object({ groupId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            try {
                let group = await ctx.db.group.findUnique({
                    where: {
                        id: input.groupId,
                    },
                });

                if (group?.inviteCode) {
                    return group.inviteCode;
                } else {
                    // TODO: This is not a good way to generate invite codes
                    let inviteCode = Math.random().toString(36).substring(2, 8);
                    await ctx.db.group.update({
                        where: {
                            id: input.groupId,
                        },
                        data: {
                            inviteCode: inviteCode,
                        },
                    });

                    return inviteCode;
                }
            } catch (e) {
                console.error(e);
                throw new Error("Failed to get or create invite code");
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
