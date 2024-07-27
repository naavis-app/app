import React from "react";
import { Link, Text } from "@radix-ui/themes";

export default function NotFoundPage() {
    return (<div className="w-full fixed h-[100vh] flex justify-center items-center">
        <div className="flex justify-center items-center flex-col">
            <Text className="text-white text-4xl font-bold">404</Text>
            <Text className="text-white text-2xl">Page not found</Text>

            <Link href="/" className="text-blue-500">Head back to shore!</Link>
        </div>
    </div>);
}