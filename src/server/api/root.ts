import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { deviceRouter } from "~/server/api/routers/device";
import { userRouter } from "~/server/api/routers/user";
import { groupRouter } from "./routers/group";
import { placeRouter } from "./routers/place";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    device: deviceRouter,
    user: userRouter,
    group: groupRouter,
    place: placeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
