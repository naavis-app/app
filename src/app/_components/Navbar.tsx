import { Text, Link } from "@radix-ui/themes";

export default function Navbar() {
    return (
        <>
            <div
                className="flex flex-row items-center justify-between 
                        bg-bg-col p-4"
            >
                <Link href="/">
                    <Text className="text-2xl font-bold text-blue-500
                    hover:no-underline"
                    >
                        Location App
                    </Text>
                </Link>
                <div className="flex flex-row items-center justify-center 
                text-white gap-2"
                >
                    Account
                </div>
            </div>
        </>
    );
}
