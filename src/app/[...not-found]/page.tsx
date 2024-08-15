"use client";

import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "~/server/lib/stores";
import { Link, Text } from "@radix-ui/themes";

export default function NotFoundPage() {
    const [theme] = useAtom(themeAtom);
    const [textColor, setTextColor] = useState("");

    useEffect(() => {
        if (theme === "light") {
            setTextColor("text-black");
        } else if (theme === "dark") {
            setTextColor("text-white");
        }
    }, [theme]);

    return (
        <div className="fixed flex h-[100vh] w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <Text className={`${textColor} text-4xl font-bold`}>404</Text>
                <Text className={`${textColor} text-2xl`}>Page not found</Text>

                <Link href="/" className="text-blue-500">
                    Head back to shore!
                </Link>
            </div>
        </div>
    );
}
