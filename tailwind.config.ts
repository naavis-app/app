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
            },
        },
    },
    plugins: [],
} satisfies Config;
