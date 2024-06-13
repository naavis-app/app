import { Text } from "@radix-ui/themes";
import Link from "next/link";

import { motion } from "framer-motion";
import { sidenavOpenAtom } from "~/server/lib/stores";
import { useAtom } from "jotai";

interface SideNavItemProps {
    label: string;
    icon: React.ReactNode;
    url: string;
}

export default function SideNavItem({ label, icon, url }: SideNavItemProps) {
    const [open] = useAtom(sidenavOpenAtom);

    const inner = (
        <div className="flex w-full flex-row items-center gap-2 rounded-md p-2 pl-8 text-[--accent-11] transition-all ease-in-out hover:cursor-pointer hover:bg-[--accent-3]">
            {icon}
            <motion.div
                animate={{
                    opacity: open ? 1 : 0,
                    x: open ? 0 : -20,
                }}
            >
            <Text>{label}</Text>
            </motion.div>
        </div>
    );

    return url ? <Link href={url}>{inner}</Link> : inner;
}
