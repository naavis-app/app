/* index file for next.js */

"use client";

import {
	Box,
	Button,
	Container,
	Flex,
	Grid,
	Link,
	Strong,
	Text,
} from "@radix-ui/themes";
import clsx from "clsx";
import { useAtom } from "jotai";
import Image from "next/image";
// import { ThemeProvider } from "next-themes";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { themeAtom } from "~/server/lib/stores";

import {
	type MotionValue,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";
import FeatureCard from "./_components/landing/FeatureCard";

const features = [
	{
		name: "Real-time Location",
		description: "Find your friends, family, and loved ones in real-time.",
		icon: "tabler:location",
	},
	{
		name: "Device Tracking",
		description:
			"Track your phone, tablet, tile, or any other device with GPS.",
		icon: "mdi:cellphone",
	},
	{
		name: "Dashboard",
		description: "View and manage all your devices and locations in one place.",
		icon: "mdi:monitor-dashboard",
	},
];

function useParallax(value: MotionValue<number>, distance: number) {
	return useTransform(value, [0, 1], [-distance, distance]);
}

interface SectionProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
}

function Section({ children, className, id }: SectionProps) {
	return (
		<section
			className={clsx(
				"relative flex h-fit min-h-[100vh] snap-center items-center justify-center",
				className,
			)}
			style={{ perspective: 500 }}
			id={id}
		>
			{children}
		</section>
	);
}

function SnapImage({ id }: { id: number }) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({ target: ref });
	const y = useParallax(scrollYProgress, 300);

	return (
		<Section>
			<div ref={ref}>
				<img
					src={
						"https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Burj_Khalifa.jpg/1200px-Burj_Khalifa.jpg"
					}
					width="200"
					alt="A London skyscraper"
				/>
			</div>
			<motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
		</Section>
	);
}

export default function Home() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [theme, setTheme] = useAtom(themeAtom);

	const [p, setP] = useState(0);
	const { scrollYProgress } = useScroll();

	useEffect(() => {
		scrollYProgress.on("change", (v) => {
			setP(v);
		});

		return () => {
			scrollYProgress.clearListeners();
		};
	});

	return (
		<>
			<Section className="vignette relative flex flex-col overflow-clip font-sans">
				<Container size="2" className="mt-[30vh] h-full w-full p-8 text-center">
					<Flex direction="column" className="">
						<Text size="9">
							Always{" "}
							<Strong className="relative">
								Connected,
								<div className="absolute right-0 top-0 h-5 w-5 animate-ping rounded-full bg-blue-500" />
							</Strong>
						</Text>
						<Text size="9">No Matter the Distance</Text>
					</Flex>

					<Box className="my-4">
						<Text color="gray">
							The places you frequent are special. With our platform, you can
							take control of your locations and devices like never before, for
							absolutely zero cost.
						</Text>
					</Box>

					<Box className="">
						<Flex direction={"row"} gap={"2"} justify={"center"}>
							<Link href="/sign-up">
								<Button color="green">Get Started</Button>
							</Link>
							<Link href="#about">
								<Button variant="outline">Learn More</Button>
							</Link>
						</Flex>
					</Box>
				</Container>

				<motion.div
					animate={{ rotate: 360 }}
					style={{
						scale: 10,
						rotate: Math.round(p * 360),
						opacity: 0.05,
					}}
					transition={{
						duration: 500,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
					className={clsx(`absolute -z-10 !rotate-[${Math.round(p * 360)}deg]`)}
				>
					{theme === "dark" ? (
						<Image src="/lmapdark.svg" alt="map" width={1000} height={1000} />
					) : (
						<Image src="/lmap.svg" alt="map" width={1000} height={1000} />
					)}
				</motion.div>
			</Section>

			<Section
				className="relative flex w-full flex-col items-center justify-center bg-[--accent-3] p-8 sm:p-0"
				id="about"
			>
				<Flex
					className="flex h-fit w-full p-4 text-center"
					direction={"column"}
				>
					<Text size="7">
						<Strong>What We Offer</Strong>
					</Text>
					<Text size="3">
						Our platform offers a wide range of features to help you stay
						connected.
					</Text>
				</Flex>

				<Flex
					className="h-fit w-full max-w-2xl flex-col justify-center overflow-visible px-4 sm:flex-row md:flex-wrap"
					gap={"4"}
				>
					{features.map((feature) => (
						<FeatureCard
							key={feature.name}
							title={feature.name}
							description={feature.description}
							icon={feature.icon}
						/>
					))}
				</Flex>
			</Section>

			<footer className="flex w-full px-6 py-6 bg-[--accent-2] flex-col sm:flex-row items-center gap-2 justify-between">
				<p className="text-xs">@2024 Naavis. All rights reserved.</p>
				<a
					href="https://github.com/naavis-app"
					target="_blank"
					rel="noreferrer"
				>
					<BsGithub width={30} height={30} className="mr-6" />
				</a>
			</footer>
			{/* 
			<SnapImage id={2} />
			<SnapImage id={3} />
			<SnapImage id={4} /> */}
		</>
	);
}
