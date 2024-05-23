"use client";

import { Theme } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { themeAtom } from "../server/lib/stores";
import { useLayoutEffect } from "react";
import { ThemeProvider } from 'next-themes';

interface children {
    children: React.ReactNode;
}

export function Providers({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useAtom(themeAtom);

    return (
<<<<<<< HEAD
        <ThemeProvider attribute="class">
            <Theme
                hasBackground={true}
                appearance={theme}
                className="relative flex flex-col"
            >
                {children}
            </Theme>
        </ThemeProvider>
=======
        <Theme
            hasBackground={true}
            appearance={theme}
            className="relative flex flex-col"
        >
            {children}
        </Theme>
>>>>>>> cc35ef367682163394d6e3d6afd0c6a1d8b7e9eb
    );
}
