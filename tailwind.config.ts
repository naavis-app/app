import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)", ...fontFamily.sans

                ],
            },
            colors: {
                "span-col": "#0588f0",
                "bg-col": "#080e4b",
                "auth-color": "#222224",
                "dark-dialog-bg": "#141B30",
                "dark-dialog-border": "#293040",
                "dark-dialog-text-border": "#4a5065",
                "dark-dialog-text-bg": "#111525",
                "dark-txt-only-button": "#98abf6",
                "dark-txt-button-hover": "#1A2B60",
                "light-txt-only-button": "#2b4ebd",
                "light-txt-button-hover": "#bfc5d3",
                "reg-button-bg": "#3e63de",
                "dark-disabled-text": "#B4BCCC",
                "light-disabled-text": "#51555f",
                "light-disabled-bg": "#d7d8dd",
                "light-dialog-bg": "#d0d0d1",
                "light-dialog-border": "#757880",
                "light-dialog-text-border": "#a6a8b1",
                "light-dialog-text-bg": "#f8f8f8",
                "light-dialog-text": "#1c2024",
            },
        },
    },
    plugins: [],
} satisfies Config;
