import { Text, Button } from "@radix-ui/themes";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <>
            <div
                className="flex flex-row items-center justify-between 
                        bg-bg-col p-4"
            >

                <Link href="/" className="hover:no-underline">
                    <Text
                        className="text-2xl font-bold text-blue-500
                    hover:no-underline"
                    >
                        Location App
                    </Text>
                </Link>
                
                <div
                    className="flex flex-row items-center justify-center 
                gap-2 text-white"
                >
                    <ThemeToggle />

                    <Link href="/sign-in" className="hover:no-underline">
                        <Text
                            className="rounded-md border-2 border-blue-500 
                        bg-transparent px-4 py-2 
                        font-bold text-blue-500 transition-all hover:border-blue-600
                        hover:bg-blue-600 hover:bg-opacity-50 hover:text-white"
                        >
                            Sign in
                        </Text>
                    </Link>
                    <Link href="/sign-up" className="hover:no-underline">
                        <Text
                            className="rounded-md border-2 border-blue-500 
                        bg-blue-500 px-4 py-2
                        font-bold text-white transition-colors hover:border-blue-700
                        hover:bg-blue-700"
                        >
                            Get Started
                        </Text>
                    </Link>
                </div>
            </div>
        </>
    );
}
