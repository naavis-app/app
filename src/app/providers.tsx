/* this file allows for easy switching between light/dark mode */

"use client";

import { Theme } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { themeAtom } from "../server/lib/stores";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import React from "react";

// interface children {
//     children: React.ReactNode;
// }

export function Providers({ children }: { children: React.ReactNode }) {
    const [theme] = useAtom(themeAtom);

    // useEffect(() => {
    //     setTheme(theme);
    // }, []);

    // useEffect(() => {
    //     if (theme === 'inherit') {
    //         const inheritedTheme = window.matchMedia("(prefers-color-scheme: dark)");
    //         if (inheritedTheme.matches) {
    //             setTheme('dark');
    //         } else {
    //             setTheme('light');
    //         }
    //     }
    // }, [theme]);

    return (
        <>
            <ThemeProvider attribute="class">
                <Theme
                    hasBackground={true}
                    appearance={theme}
                    className="relative flex flex-col"
                >
                    <Toaster />
                    {children}
                </Theme>
            </ThemeProvider>
        </>
    );
}
