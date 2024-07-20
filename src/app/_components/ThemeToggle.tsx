// this button allows a user to toggle theme between light/dark

"use client";

import { Button } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { themeAtom } from "../../server/lib/stores";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import React from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useAtom(themeAtom);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            size="2"
            variant="outline"
            className="w-fit"
            onClick={toggleTheme}
        >
            {theme == "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
    );
}
