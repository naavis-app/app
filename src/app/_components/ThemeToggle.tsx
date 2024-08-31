// this button allows a user to toggle theme between light/dark

"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useAtom } from "jotai";
import React from "react";
import { themeAtom } from "../../server/lib/stores";

export default function ThemeToggle() {
	const [theme, setTheme] = useAtom(themeAtom);

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Button size="2" variant="outline" className="w-fit" onClick={toggleTheme}>
			{theme === "light" ? <MoonIcon /> : <SunIcon />}
		</Button>
	);
}
