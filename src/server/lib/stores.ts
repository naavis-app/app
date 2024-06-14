/* this file exports themeAtom, a constant that
manages the state of the theme (light/dark mode). it can either
be "light", "dark", or "inherit" (inherit doesn't work though).
this is done using global state management from jotai.
check https://jotai.org/docs/introduction for more information. */

import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

import { DatabaseUser, User } from "lucia";
import { DatabaseUserAttributes } from "./auth";
import { Device, Group } from "@prisma/client";

export const themeAtom = atomWithStorage<"light" | "dark" | "inherit">('naavis-darkmode', "inherit");
export const userAtom = atomWithStorage<null | DatabaseUserAttributes>('naavis-usersession', null);

export const sidenavOpenAtom = atom<boolean>(true);
export const deviceListAtom = atom<Device[]>([]);
export const groupListAtom = atom<Group[]>([]);
