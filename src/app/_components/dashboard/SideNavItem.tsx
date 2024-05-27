import { Text } from "@radix-ui/themes";
import Link from "next/link";

interface SideNavItemProps {
	label: string;
	icon: React.ReactNode;
	url: string;
}

export default function SideNavItem({ label, icon, url }: SideNavItemProps) {
	const inner = <div className='transition-all ease-in-out flex flex-row gap-2 items-center w-full p-2 pl-8 rounded-md text-[--accent-11] hover:cursor-pointer hover:bg-[--accent-3]'>
		{icon}
		<Text>{label}</Text>
	</div>;

	return (url ? <Link href={url}>{inner}</Link> : inner);
}