"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "~/server/lib/authActions";
import { userAtom } from "~/server/lib/stores";

export default async function Logout() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [user, setUser] = useAtom(userAtom);
	const router = useRouter();

	useEffect(() => {
		async function handleLogout() {
			setUser(null);
			await signOut();
			router.push("/");
		}

		handleLogout();
	}, [setUser, router]);

	return null;
}
