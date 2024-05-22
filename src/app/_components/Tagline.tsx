import { Text, Link } from "@radix-ui/themes";

export default function Tagline() {
    return (
        <div className="flex h-[80vh] w-full flex-col 
        items-center justify-center"
        >
            <div className="flex flex-col items-center p-0 pb-5
            justify-center text-center">
                <Text className="text-6xl font-bold text-white">
                    Location sharing,{" "}
                    <span className="text-blue-500">reimagined.</span> 
                </Text>

            </div>
            <Link href="/sign-up">
                <button className="rounded-md bg-blue-500
                py-3 px-4 text-white hover:bg-blue-700
                font-bold"
                >
                    Get Started
                    </button>
            </Link>
        </div>
    ); // planning to have it dynamically switch between text. inspired by https://www.prisma.io/ if you wanna see what im talking about
}
