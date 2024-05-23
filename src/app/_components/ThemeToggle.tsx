"use client";

import { Button } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { themeAtom } from "../../server/lib/stores";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ThemeToggle() {
    const [theme, setTheme] = useAtom(themeAtom);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        console.log("Theme toggled");
    };

    return (
        <Button size="2" variant="outline" onClick={toggleTheme}>
            {theme == "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
    );
}
