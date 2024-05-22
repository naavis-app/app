"use client";

import { Button } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { themeAtom } from "../../server/lib/stores";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useAtom(themeAtom);

    useEffect(() => {
        const query = window.matchMedia("(prefers-color-scheme: dark)");
        setTheme(query.matches ? "dark" : "light");
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        console.log("Theme toggled");
    };

    return (
        <Button size="2" variant="soft" onClick={toggleTheme}>
            {theme == "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
    );
}
