"use client";

import { Card, Flex } from "@radix-ui/themes";
import React from "react";

export default function DashboardHome() {
	return (
		<>
			<Flex direction={"column"} gap={"4"} className="h-full">
				<Card className="flex-grow">
					<p>Top</p>
				</Card>
				<Flex direction={"row"}>
					<Card className="flex-grow">
						<p>Left</p>
					</Card>
					<Card className=" flex-grow">
						<p>Right</p>
					</Card>
				</Flex>
			</Flex>
		</>
	);
}
