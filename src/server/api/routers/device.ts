import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const deviceRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                type: z.enum(["phone", "tablet", "laptop", "smartwatch"]),
                userId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { id: input.userId },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            try {
                return await ctx.db.device.create({
                    data: {
                        name: input.name,
                        type: input.type,
                        userId: input.userId,
                    },
                });
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to create device",
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
            const user = await ctx.db.user.findUnique({
                where: { id: input.userId },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            return ctx.db.device.findMany({ where: { userId: input.userId } });
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
                const device = await ctx.db.device.findUnique({
                    where: {
                        id: input.id,
                        userId: input.userId,
                    },
                });

                if (!device) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Device was not found!",
                    });
                }

                if (device.userId !== input.userId) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Device does not belong to the user!",
                    });
                }

                return device;
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to find device",
                });
            }
        }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string().optional(),
                type: z
                    .enum(["phone", "tablet", "laptop", "smartwatch"])
                    .optional(),
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
                return await ctx.db.device.updateMany({
                    where: {
                        id: input.id,
                        userId: input.userId,
                    },
                    data: {
                        name: input.name,
                        type: input.type,
                        lastLocationUpdate: new Date(),
                    },
                });
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to update device",
                });
            }
        }),

    delete: publicProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: { id: input.userId },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            try {
                return await ctx.db.device.delete({
                    where: {
                        id: input.id,
                        userId: input.userId,
                    },
                });
            } catch (e) {
                console.error(e);
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Failed to delete device",
                });
            }
        }),
});
