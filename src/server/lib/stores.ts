/* this file exports themeAtom, a constant that
manages the state of the theme (light/dark mode). it can either
be "light", "dark", or "inherit" (inherit doesn't work though).
this is done using global state management from jotai.
check https://jotai.org/docs/introduction for more information. */

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import type { Device, Group, Place } from "@prisma/client";
// import { DatabaseUser, User } from "lucia";
import type { DatabaseUserAttributes } from "./lucia";

// i removed inherit. its causing too many problems with the background svg
// and flashing onload
export const themeAtom = atomWithStorage<"light" | "dark">(
	"naavis-darkmode",
	"dark",
);
export const userAtom = atomWithStorage<null | DatabaseUserAttributes>(
	"naavis-usersession",
	null,
);

export const sidenavOpenAtom = atom<boolean>(true);

// TODO: Store loading state

export const selectedGroupId = atomWithStorage<string | null>(
	"naavis-selgroupid",
	null,
);

export const deviceListAtom = atomWithStorage<Device[]>(
	"naavis-devicelist",
	[],
);

export const groupListAtom = atomWithStorage<Group[]>("naavis-grouplist", []);

export const placeListAtom = atomWithStorage<Place[]>("naavis-placelist", []);
