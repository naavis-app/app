"use client";

import Tagline from "./_components/Tagline";
import { useAtom } from "jotai";
import { themeAtom } from "~/server/lib/stores";
import { ThemeProvider } from "next-themes";

export default function Home() {
    const [theme, setTheme] = useAtom(themeAtom);

    return (
        <>
            <div className="absolute h-full w-full overflow-scroll">
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
