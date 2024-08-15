import { env } from "~/env";
import Redis from "ioredis";

const createRedisClient = () =>
    new Redis({
        password: process.env.REDIS_PASSWORD!,
        host: process.env.REDIS_HOST!,
        port: Number(process.env.REDIS_PORT)!,
    });

const globalRedis = globalThis as unknown as {
    redis: ReturnType<typeof createRedisClient> | undefined;
};

export const redis = globalRedis.redis ?? createRedisClient();

if (env.NODE_ENV !== "production") globalRedis.redis = redis;
