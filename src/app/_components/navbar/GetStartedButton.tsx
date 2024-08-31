import { Link, Text } from "@radix-ui/themes";
import React from "react";

export default function GetStartedButton() {
	return (
		<Link href="/sign-up" className="hover:no-underline">
			<Text
				className="rounded-md border-2 
                border-blue-500 
                bg-blue-500 px-4 py-2
                    font-bold text-white 
                    transition-colors 
                    hover:border-blue-700
                    hover:bg-blue-700"
			>
				Get Started
			</Text>
		</Link>
	);
}
