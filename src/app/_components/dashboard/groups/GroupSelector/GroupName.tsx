import React from "react";
import { Select } from "@radix-ui/themes";

import { Group } from "@prisma/client";
interface GroupNameProps {
    group: Group;
}

export default function GroupName({ group }: GroupNameProps) {
    return <Select.Item value={group.id}>{group.name}</Select.Item>;
}
