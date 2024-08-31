import Redis from "ioredis";
import { env } from "~/env";

if (!process.env.REDIS_PASSWORD) {
	throw new Error("REDIS_PASSWORD is not defined");
}

if (!process.env.REDIS_HOST) {
	throw new Error("REDIS_HOST is not defined");
}

if (!process.env.REDIS_PORT) {
	throw new Error("REDIS_PORT is not defined");
}

const createRedisClient = () =>
	new Redis({
		password: process.env.REDIS_PASSWORD,
		host: process.env.REDIS_HOST,
		port: Number(process.env.REDIS_PORT),
	});

const globalRedis = globalThis as unknown as {
	redis: ReturnType<typeof createRedisClient> | undefined;
};

export const redis = globalRedis.redis ?? createRedisClient();

if (env.NODE_ENV !== "production") globalRedis.redis = redis;
