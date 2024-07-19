import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)", ...fontFamily.sans],
            },
            colors: {
                "span-col": "#0588f0",
                "bg-col": "#080e4b",
                "auth-color": "#222224",
                "dark-dialog-bg": "#141B30",
                "dark-dialog-border": "#293040",
                "dialog-text-border": "#4a5065",
                "dialog-text-bg": "#111525",
                "txt-only-button": "#98abf6",
                "txt-button-hover": "#1A2B60",
                "reg-button-bg": "#3e63de",
                "disabled-text": "#B4BCCC",
                "light-dialog-bg": "#d0d0d1",
                "light-dialog-border": "#757880",
            },
        },
    },
    plugins: [],
} satisfies Config;
