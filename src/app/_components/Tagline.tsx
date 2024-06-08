"use client";

import { useAtom } from "jotai";
import { userAtom } from "~/server/lib/stores";

// tagline for our website. you can see it on the homepage!

import { Link, Text } from "@radix-ui/themes";

export default function Tagline() {
    const [user, setUser] = useAtom(userAtom);

    return (
        <div
            className="flex h-full w-full flex-col 
        items-center justify-center"
        >
            <div
                className="flex select-none flex-col items-center justify-center
            p-0 pb-5 text-center"
            >
                <Text
                    className="text-4xl font-bold leading-tight 
                text-white sm:text-6xl sm:leading-none"
                >
                    Location sharing,{" "}
                    <span className="text-blue-500">reimagined.</span>
                </Text>
            </div>
            <Link href={user?.id ? "/dashboard" : "/sign-up"}>
                <button
                    className="rounded-md bg-blue-500
                px-4 py-3 font-bold text-white
                transition-colors hover:bg-blue-700"
                >
                    {user?.id ? "Dashboard" : "Get Started"}
                </button>
            </Link>
        </div>
    ); // planning to have it dynamically switch between text. inspired by https://www.prisma.io/ if you wanna see what im talking about
}

// also planning for the "Get started" button to change to "Dashboard" when
// logged in. not working bc of "use client"/"use server" issues
