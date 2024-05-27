"use client";

import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';

import { clsx } from 'clsx';
import { Button, Card, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import AccountButton from '../AccountButton';
import { validateRequest } from '~/server/lib/auth';
import { useAtom } from 'jotai';
import { userAtom } from '~/server/lib/stores';

const paths = [
	{ label: 'Dashboard', path: '/dashboard' },
	{ label: 'Map', path: '/map' },
	{ label: 'Settings', path: '/settings' },
	{ label: 'Logout', path: '/logout' }
]

export default function SideNav() {
	const [user] = useAtom(userAtom);

	return (
		<>
			<Card className='w-[300px] mr-4'>
				<Flex direction={"column"} gap={"2"} style={{ height: "100%", justifyContent: "space-between" }}>
					<div className='flex flex-col gap-2'>
						<Card>
							<Flex>
								<Text>{user ? JSON.stringify(user) : 'NO USER'}</Text>
							</Flex>
							{ user ? <AccountButton user={user} /> : <></>}
						</Card>
						{paths.map((path, i) => (
							<Button variant="ghost">
								{path.label}
							</Button>
						))}
					</div>

					<Button variant="outline">
						Settings
					</Button>
				</Flex>
			</Card>
		</>
	);
};