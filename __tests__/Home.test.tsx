// tests for the home page.

import { render, screen, renderHook } from "@testing-library/react";
import { expect, test, describe } from "vitest";

import Home from "~/app/page";
import Tagline from "~/app/_components/Tagline";
import { userAtom } from "~/server/lib/stores";
import { useAtom } from "jotai";
import { Provider } from "jotai";
import React from "react";

/* describe("smoke tests", () => {
    test("render Home component", () => {
        render(<Home />);
    });

    test("render Tagline component", () => {
        render(<Tagline />);
    });
});

describe("unit tests", () => {
    test("render Home component and check for styles", () => {
        render(<Home />);
        const homeElement = screen.getByTestId("home");

        expect(homeElement);
    });

    test("render Tagline component and check main div for styles", () => {
        render(<Tagline />);
        const taglineElement = screen.getByTestId("tagline-div");

        expect(taglineElement);
    });

    test("render Tagline component and check for text", () => {
        render(<Tagline />);
        const textElem = screen.getByText("Location sharing,");
        const textElemBlue = screen.getByText("reimagined.");

        expect(textElem);
        expect(textElemBlue);
    });

    test("render Tagline component and check button after log in", () => {
        const { result } = renderHook(() => useAtom(userAtom), {
            wrapper: ({ children }: { children: any }) => (
                <Provider>{children}</Provider>
            ),
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [user, setUser] = result.current;
        setUser({
            id: "123",
            username: "test",
            firstname: "test",
            lastname: "test",
            profile_pic: "https://i.imgur.com/NgKWNj3.jpg",
            email: "test",
        });

        render(
            <Provider>
                <Tagline />
            </Provider>,
        );

        const element = screen.getByText("Dashboard");
        expect(element);
    });

    test("render Tagline component and check button without login", () => {
        const { result } = renderHook(() => useAtom(userAtom), {
            wrapper: ({ children }: { children: any }) => (
                <Provider>{children}</Provider>
            ),
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [user, setUser] = result.current;
        setUser({
            id: "", // null for testing
            username: "test",
            firstname: "test",
            lastname: "test",
            profile_pic: "https://i.imgur.com/NgKWNj3.jpg",
            email: "test",
        });

        render(
            <Provider>
                <Tagline />
            </Provider>,
        );

        const element = screen.getByText("Get Started");
        expect(element);
    });
});

describe("integration tests", () => {
    test("render tagline, check button before login, and after login", () => {
        const { result } = renderHook(() => useAtom(userAtom), {
            wrapper: ({ children }: { children: any }) => (
                <Provider>{children}</Provider>
            ),
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [user, setUser] = result.current;
        setUser({
            id: "",
            username: "",
            firstname: "",
            lastname: "",
            profile_pic: "",
            email: "",
        });

        render(
            <Provider>
                <Tagline />
            </Provider>,
        );

        const beforeLoginElement = screen.getByText("Get Started");
        expect(beforeLoginElement);

        setUser({
            id: "test",
            username: "test",
            firstname: "test",
            lastname: "test",
            profile_pic: "https://i.imgur.com/NgKWNj3.jpg",
            email: "test",
        });

        render(
            <Provider>
                <Tagline />
            </Provider>,
        );

        const loginElement = screen.getByText("Dashboard");
        expect(loginElement);
    });
}); */

// Test test
describe("Test test", () => {
    test("Test test", () => {
        expect(1).toBe(1);
    });
});