"use client";

import { Theme } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { themeAtom } from "./lib/stores";

interface children {
	children: React.ReactNode;
}



export function Providers({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useAtom(themeAtom);

	return (
		<Theme hasBackground={true}  appearance={theme} className="flex flex-col">
			{children}
		</Theme>
	);
}
