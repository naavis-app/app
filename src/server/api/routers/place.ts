import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { redis } from "~/server/redis";

// TODO: Clear redis cache on update and delete

export const placeRouter = createTRPCRouter({
	create: publicProcedure
		.input(
			z.object({
				name: z.string(),
				latitude: z.number().default(0),
				longitude: z.number().default(0),
				address: z.string().optional(),
				alertRadius: z.number().default(5),
				onEntry: z.boolean().default(false),
				onExit: z.boolean().default(false),
				groupId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const createdPlace = await ctx.db.place.create({
					data: {
						name: input.name,
						latitude: input.latitude,
						longitude: input.longitude,
						address: input.address,
						alertRadius: input.alertRadius,
						onEntry: input.onEntry,
						onExit: input.onExit,
						groupId: input.groupId,
					},
				});

				const cacheKey = `place:${createdPlace.id}`;
				await redis.setex(cacheKey, 3600, JSON.stringify(createdPlace));

				return createdPlace;
			} catch (e) {
				console.error(e);
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Failed to create place",
				});
			}
		}),

	list: publicProcedure
		.input(
			z.object({
				groupId: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const cacheKey = `group:${input.groupId}:places`;
			const cachedPlaces = await redis.get(cacheKey);

			if (cachedPlaces) {
				return JSON.parse(cachedPlaces);
			}

			const places = await ctx.db.place.findMany({
				where: { groupId: input.groupId },
			});

			await redis.setex(cacheKey, 3600, JSON.stringify(places));
			return places;
		}),

	read: publicProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const cacheKey = `place:${input.id}`;
			const cachedPlace = await redis.get(cacheKey);

			if (cachedPlace) {
				return JSON.parse(cachedPlace);
			}

			const place = await ctx.db.place.findUnique({
				where: { id: input.id },
			});

			if (!place) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Place not found",
				});
			}

			await redis.setex(cacheKey, 3600, JSON.stringify(place));
			return place;
		}),

	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().optional(),
				latitude: z.number().optional(),
				longitude: z.number().optional(),
				address: z.string().optional(),
				alertRadius: z.number().optional(),
				onEntry: z.boolean().optional(),
				onExit: z.boolean().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			try {
				const updatedPlace = await ctx.db.place.update({
					where: { id: input.id },
					data: {
						name: input.name,
						latitude: input.latitude,
						longitude: input.longitude,
						address: input.address,
						alertRadius: input.alertRadius,
						onEntry: input.onEntry,
						onExit: input.onExit,
					},
				});

				await redis.del(`place:${input.id}`);
				const cacheKey = `place:${updatedPlace.id}`;
				await redis.setex(cacheKey, 3600, JSON.stringify(updatedPlace));

				return updatedPlace;
			} catch (e) {
				console.error(e);
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Failed to update place",
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
			try {
				await redis.del(`place:${input.id}`);

				return await ctx.db.place.delete({
					where: { id: input.id },
				});
			} catch (e) {
				console.error(e);
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Failed to delete place",
				});
			}
		}),
});
