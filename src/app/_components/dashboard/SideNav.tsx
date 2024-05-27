import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';

import { clsx } from 'clsx';
import { Button, Card, DropdownMenu, Flex } from '@radix-ui/themes';

const paths = [
	{ label: 'Dashboard', path: '/dashboard' },
	{ label: 'Map', path: '/map' },
	{ label: 'Settings', path: '/settings' },
	{ label: 'Logout', path: '/logout' }
]

export default function SideNav() {
	const [open, setOpen] = useState(true);

	return (
		<>
			<Card className='w-[300px] mr-4'>
				<Flex direction={"column"} gap={"2"}>
					{paths.map((path, i) => (
						<Button variant="ghost">
							{path.label}
						</Button>
					))}
					<div className='grow'>

					</div>
					<Button variant="outline">
						Settings
					</Button>
				</Flex>	
			</Card>
		</>
	);
};