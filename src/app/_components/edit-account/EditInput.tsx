import { TextField } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { RxPencil1 } from "react-icons/rx";
import { userAtom } from "~/server/lib/stores";

export default function EditableInput({
	name,
	placeholder,
	check,
}: {
	name: string;
	placeholder: string;
	check: boolean;
}) {
	const [user] = useAtom(userAtom);
	const [currField] = useState(name);
	const [val, setVal] = useState<string | undefined>(user?.firstname || "");
	const [toggle, setToggle] = useState<boolean>(false);

	useEffect(() => {
		if (!user) return;
		switch (currField) {
			case "firstname":
				setVal(user.firstname);
				break;
			case "lastname":
				setVal(user.lastname);
				break;
			case "email":
				setVal(user.email || "");
				break;
			case "username":
				setVal(user.username);
				break;
			default:
				setVal("");
		}
	}, [user, currField]);

	useEffect(() => {
		if (!check) {
			setToggle(true);
		}
	}, [check]);

	const handleInputChange = (e: any) => {
		setVal(e.target.value);
	};

	return (
		<div
			className="relative flex
        w-full flex-row items-center
        justify-end"
		>
			<TextField.Root
				size={"2"}
				variant="surface"
				name={name}
				placeholder={`Enter your ${placeholder}`}
				className="w-full pr-10"
				value={val}
				type="text"
				required
				disabled={!toggle}
				onChange={handleInputChange}
			/>
			<input type="hidden" name={name} value={val} />
			<button
				type="submit"
				className="absolute right-4"
				onClick={(e) => {
					e.preventDefault();
					setToggle(!toggle);
				}}
			>
				{!toggle && <RxPencil1 />}
				{toggle && <FaCheck />}
			</button>
		</div>
	);
}
