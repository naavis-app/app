import { Select } from "@radix-ui/themes";
import React from "react";

import type { Group } from "@prisma/client";
interface GroupNameProps {
	group: Group;
}

export default function GroupName({ group }: GroupNameProps) {
	return <Select.Item value={group.id}>{group.name}</Select.Item>;
}
