"use client";

import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { AvatarIcon, ButtonIcon, CardStackIcon, CaretDownIcon, CubeIcon, ExitIcon, GearIcon, GlobeIcon, HomeIcon, SewingPinIcon } from '@radix-ui/react-icons';

import { clsx } from 'clsx';
import { Avatar, Box, Button, Card, DropdownMenu, Flex, IconButton, Text } from '@radix-ui/themes';
import AccountButton from '../auth/AccountButton';
import { validateRequest } from '~/server/lib/auth';
import { useAtom } from 'jotai';
import { userAtom } from '~/server/lib/stores';
import Link from 'next/link';
import SideNavItem from './SideNavItem';

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
			<Box className='max-w-[300px] w-full box-border'>
				<Flex direction={"column"} gap={"2"} style={{ height: "100%", justifyContent: "space-between", padding: "2" }}>
					<div className='flex flex-col gap-2'>
						<Card>
							<Flex direction={"row"} align={"center"} gap={"2"}>
								{user ? <Avatar size="3"
									src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
									radius="full"
									fallback={"A"}
									className="shadow-md" />
									: <></>}
								<Flex direction={"column"}>
									<Text weight={"bold"}>{user ? user.username : 'NO USER'}</Text>
									<Text>{user ? user.id : 'NO USER'}</Text>
								</Flex>
							</Flex>
						</Card>

						<SideNavItem icon={<HomeIcon />} url={'/dashboard'} label={'Dashboard'} />
						<SideNavItem icon={<GlobeIcon />} url={'/map'} label={'Map'} />
						<SideNavItem icon={<CubeIcon />} url={'/devices'} label={'Devices'} />
						<SideNavItem icon={<GearIcon />} url={'/settings'} label={'Settings'} />
						<SideNavItem icon={<ExitIcon />} url={'/logout'} label={'Logout'} />
					</div>
				</Flex>
			</Box>
		</>
	);
};