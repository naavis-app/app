import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Card, Flex, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import React from "react";

interface FeatureCardProps {
	title: string;
	description: string;
	icon: string;
}

export default function FeatureCard({
	title,
	description,
	icon,
}: FeatureCardProps) {
	return (
		<motion.div className="flex flex-1 justify-center">
			<Card className="w-full max-w-[20rem] shadow-lg">
				<Flex justify={"center"} align={"center"} className="p-4">
					<div className="flex items-center justify-center">
						<Icon icon={icon} width={32} height={32} />
					</div>
				</Flex>
				<Flex gapY={"3"} direction={"column"} className="p-2">
					<Text size={"5"}>{title}</Text>
					<Text size={"3"}>{description}</Text>
				</Flex>
			</Card>
		</motion.div>
	);
}
