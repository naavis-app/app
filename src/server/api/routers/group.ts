import { TRPCError } from "@trpc/server";
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
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to create group",
                });
            }
        }),

    read: publicProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: {
                    id: input.userId,
                },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            try {
                const group = await ctx.db.group.findUnique({
                    where: {
                        id: input.id,
                        ownerId: input.userId,
                    },
                });

                if (!group) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Group was not found!"
                    });
                }

                if (group.ownerId !== input.userId) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "User is not in this group!"
                    });
                }

                return group;
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to find group",
                });
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
                        description: input.description
                    },
                });
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to update group",
                });
            }
        }),
    getOrCreateInviteCode: publicProcedure
        .input(z.object({ groupId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            try {
                const group = await ctx.db.group.findUnique({
                    where: {
                        id: input.groupId,
                    },
                });

                if (!group) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Group not found",
                    });
                }

                if (group?.inviteCode) {
                    return group.inviteCode;
                } else {
                    // TODO: This is not a good way to generate invite codes
                    const inviteCode = Math.random().toString(36).substring(2, 8);
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
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to get or create invite code",
                });
            }
        }),
    list: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            try {
                // Find groups that the user is a member of
                return ctx.db.group.findMany({
                    where: {
                        members: {
                            some: { id: input.userId },
                        },
                    },
                });
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to list groups",
                });
            }
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
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to delete group",
                });
            }
        }),
});
