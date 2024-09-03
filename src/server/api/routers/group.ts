import type { Group, User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { validateSessionPlugin } from "~/server/lib/plugins";
import { redis } from "~/server/redis";

// TODO: redis cache optimization and security optimizations

export const groupRouter = createTRPCRouter({
    create: publicProcedure
        .unstable_concat(validateSessionPlugin)
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                ownerId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const newGroup = await ctx.db.group.create({
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

                const cacheKey = `group:${newGroup.id}`;

                await redis.del(`user:${input.ownerId}:groups`);
                await redis.setex(cacheKey, 3600, JSON.stringify(newGroup));

                return newGroup;
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to create group",
                });
            }
        }),

    read: publicProcedure
        .unstable_concat(validateSessionPlugin)
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const cachedUser = await redis.get(`user:${input.userId}`);
            let user: User | null;

            if (cachedUser) {
                user = JSON.parse(cachedUser);
            } else {
                user = await ctx.db.user.findUnique({
                    where: {
                        id: input.userId,
                    },
                });
            }

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            try {
                const cachedGroup = await redis.get(`group:${input.id}`);
                let group: Group | null;

                if (cachedGroup) {
                    group = JSON.parse(cachedGroup);
                } else {
                    group = await ctx.db.group.findUnique({
                        where: {
                            id: input.id,
                            ownerId: input.userId,
                        },
                    });
                }

                if (!group) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Group was not found!",
                    });
                }

                if (group.ownerId !== input.userId) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "User is not in this group!",
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
        .unstable_concat(validateSessionPlugin)
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                description: z.string(),
                userId: z.string(),
                // TODO: add owner validation
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const updatedGroup = await ctx.db.group.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        name: input.name,
                        description: input.description,
                    },
                });

                await redis.del(`group:${input.id}`);
                await redis.del(`user:${input.userId}:groups`);

                const cacheKey = `group:${updatedGroup.id}`;
                await redis.setex(cacheKey, 3600, JSON.stringify(updatedGroup));

                return updatedGroup;
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to update group",
                });
            }
        }),
        
    getOrCreateInviteCode: publicProcedure
        .unstable_concat(validateSessionPlugin)
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
                }

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
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to get or create invite code",
                });
            }
        }),

    list: publicProcedure
        .unstable_concat(validateSessionPlugin)
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            try {
                const cachedUser = await redis.get(`user:${input.userId}`);
                let user: User | null;

                if (cachedUser) {
                    user = JSON.parse(cachedUser);
                } else {
                    user = await ctx.db.user.findUnique({
                        where: { id: input.userId },
                    });
                }

                if (!user) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "User not found",
                    });
                }

                const cacheKey = `user:${input.userId}:groups`;
                const cachedGroups = await redis.get(cacheKey);

                if (cachedGroups) {
                    return JSON.parse(cachedGroups);
                }

                const groups = await ctx.db.group.findMany({
                    where: {
                        members: {
                            some: { id: input.userId },
                        },
                    },
                });

                await redis.setex(cacheKey, 3600, JSON.stringify(groups));
                return groups;
                // Find groups that the user is a member of
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to list groups",
                });
            }
        }),

    delete: publicProcedure
        .unstable_concat(validateSessionPlugin)
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                // TODO: add ownerid security.
            }),
        )
        .mutation(async ({ ctx, input }) => {
            // TODO: AHHHH REMEMBER WE NEED TO PROTECT ALL THESE ENDPOINTS
            try {
                await ctx.db.place.deleteMany({
                    where: {
                        groupId: input.id,
                    },
                });

                await redis.del(`group:${input.id}`);
                await redis.del(`user:${input.userId}:groups`);

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
