import { Link, Text } from "@radix-ui/themes";

export default function Logo() {
    return (
        <Link href="/" className="hover:no-underline">
            <Text
                className="text-2xl font-bold text-blue-500
                hover:no-underline"
            >
                Location App
            </Text>
        </Link>
    );
}
