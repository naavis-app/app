import { Pencil1Icon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { Button, Table } from "@radix-ui/themes"

interface Device {
	name: string,
	id: string,
	type: string,
	lastUpdated: Date,
	latitude: number,
	longitude: number
}

interface DeviceRowProps {
	device: Device
}

export default function deviceRow({ device }: DeviceRowProps) {
	return (<>
		<Table.Row>
			<Table.RowHeaderCell>
				{device.name}
			</Table.RowHeaderCell>
			<Table.Cell className="flex flex-row gap-2 items-center">
				{device.longitude}, {device.latitude}

				<Button variant={"ghost"}>
					<ReloadIcon />
				</Button>
			</Table.Cell>

			<Table.Cell>
				{device.lastUpdated.toLocaleDateString()}
			</Table.Cell>

			<Table.Cell>
				TEST
			</Table.Cell>
			<Table.Cell className="flex flex-row gap-4">
				<Button variant={"ghost"}>
					<Pencil1Icon />
				</Button>
				<Button variant={"ghost"}>
					<TrashIcon />
				</Button>
			</Table.Cell>
		</Table.Row>
	</>)
}