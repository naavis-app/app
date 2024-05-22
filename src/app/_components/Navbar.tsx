import { Text, Link } from "@radix-ui/themes";

export default function Navbar() {
    return (
        <>
            <div
                className="flex flex-row items-center justify-between 
                        bg-bg-col p-4"
            >
                <Link href="/" className="hover:no-underline">
                    <Text className="text-2xl font-bold text-blue-500
                    hover:no-underline"
                    >
                        Location App
                    </Text>
                </Link>
                <div className="flex flex-row items-center justify-center 
                text-white gap-2"
                >
                    <Link href="/sign-in" className="hover:no-underline">
                        <Text 
                        className="text-blue-500 font-bold 
                        bg-transparent border-2 border-blue-500 
                        px-4 py-2 rounded-md hover:border-blue-600
                        hover:text-blue-600"
                        >
                            Sign in
                        </Text>
                    </Link>
                    <Link href="/sign-up" className="hover:no-underline">
                        <Text 
                        className="text-white font-bold 
                        bg-blue-500 border-2 border-blue-500
                        px-4 py-2 rounded-md hover:border-blue-700
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
