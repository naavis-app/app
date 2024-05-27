import { Text } from "@radix-ui/themes";
import Link from "next/link";

interface SideNavItemProps {
    label: string;
    icon: React.ReactNode;
    url: string;
}

export default function SideNavItem({ label, icon, url }: SideNavItemProps) {
    const inner = (
        <div className="flex w-full flex-row items-center gap-2 rounded-md p-2 pl-8 text-[--accent-11] transition-all ease-in-out hover:cursor-pointer hover:bg-[--accent-3]">
            {icon}
            <Text>{label}</Text>
        </div>
    );

    return url ? <Link href={url}>{inner}</Link> : inner;
}
