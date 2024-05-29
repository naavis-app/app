import { Link, Text } from "@radix-ui/themes";

export default function SignInButton({ xPaddingClass }: { xPaddingClass: string }) {
    return (
        <Link href="/sign-in" className="hover:no-underline">
            <Text
                className={`rounded-md border-2 
                border-blue-500 
                bg-transparent ${xPaddingClass} py-2 
                font-bold text-blue-500 
                transition-all 
                hover:border-blue-600
                hover:bg-blue-600 hover:bg-opacity-50 
                hover:text-white`}
            >
                Sign in
            </Text>
        </Link>
    );
}
