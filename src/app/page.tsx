/* index file for next.js */

"use client";

import Tagline from "./_components/Tagline";
import { useAtom } from "jotai";
import { themeAtom } from "~/server/lib/stores";
import { useEffect } from "react";
// import { ThemeProvider } from "next-themes";
import React from "react";

export default function Home() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [theme, setTheme] = useAtom(themeAtom);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (theme === "inherit") {
                const themeCheck = window.matchMedia("(prefers-color-scheme: dark)");
        
                if (themeCheck.matches) {
                    setTheme("dark");
                } else {
                    setTheme("light");
                }
            }
        }
    }, []);

    if (theme === "inherit") {
        const themeCheck = window.matchMedia("(prefers-color-scheme: dark)");

        if (themeCheck.matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    return (
        <>
            <div className="absolute h-full w-full overflow-scroll" data-testid="home">
                <div
                    className="h-[100vh]"
                    style={{
                        backgroundImage: `url(./bg${theme}.svg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Tagline />
                </div>
            </div>
        </>
    );
}
