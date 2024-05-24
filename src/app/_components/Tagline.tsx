// tagline for our website. you can see it on the homepage!

import { Link, Text } from "@radix-ui/themes";

export default function Tagline() {
    return (
        <div
            className="flex h-full w-full flex-col 
        items-center justify-center"
        >
            <div
                className="flex select-none flex-col items-center justify-center
            p-0 pb-5 text-center"
            >
                <Text className="text-6xl font-bold text-white">
                    Location sharing,{" "}
                    <span className="text-blue-500">reimagined.</span>
                </Text>
            </div>
            <Link href="/sign-up">
                <button
                    className="rounded-md bg-blue-500
                px-4 py-3 font-bold text-white
                transition-colors hover:bg-blue-700"
                >
                    Get Started
                </button>
            </Link>
        </div>
    ); // planning to have it dynamically switch between text. inspired by https://www.prisma.io/ if you wanna see what im talking about
}

// also planning for the "Get started" button to change to "Dashboard" when
// logged in. not working bc of "use client"/"use server" issues
