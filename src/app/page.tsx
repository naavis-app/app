/* index file for next.js */

"use client";

import { useAtom } from "jotai";
import { themeAtom } from "~/server/lib/stores";
// import { ThemeProvider } from "next-themes";
import React, { useRef } from "react";
import { Container, Flex, Strong, Text } from "@radix-ui/themes";
import Image from "next/image";
import clsx from "clsx";

import {
    motion,
    useScroll,
    useTransform,
    MotionValue
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

interface SectionProps {
    children: React.ReactNode;
    className?: string;
}

function Section({ children, className }: SectionProps) {
    return (
        <section className={clsx("h-[100vh] snap-center flex justify-center items-center relative", className)} style={{ perspective: 500 }}>
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
                <img src={"https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Burj_Khalifa.jpg/1200px-Burj_Khalifa.jpg"} width="200" alt="A London skyscraper" />
            </div>
            <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
        </Section>
    );
}

export default function Home() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [theme, setTheme] = useAtom(themeAtom);





    return (
        <>
            <Section className="relative bg-slate-100 flex flex-col overflow-clip">
                <Container size="3" className="w-full h-full mt-[30vh] p-8">
                    <Flex direction={"column"} align={"center"} justify={"center"} className="h-full py-8">
                        <Flex direction="row" justify="center" align="center" className="w-full border-2">
                            <Flex direction="column" className="">
                                <Text size="9">
                                    Always <Strong className="relative">Connected,<div className="absolute right-0 top-0 rounded-full w-5 h-5 bg-blue-500 animate-ping"></div></Strong>
                                </Text>
                                <Text size="9">
                                    No Matter the Distance
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Container>

                <motion.div
                    animate={{ rotate: 360 }}
                    style={{ scale: 10, rotate: 0, opacity: 0.1 }}
                    transition={{ duration: 500, repeat: Infinity, ease: "linear" }}
                    className="absolute -z-10"
                >
                    <Image src="/lmap.svg" alt="map" width={1000} height={1000} />
                </motion.div>
            </Section>

            <SnapImage id={1} />
            <SnapImage id={2} />
            <SnapImage id={3} />
            <SnapImage id={4} />
        </>
    );
}
