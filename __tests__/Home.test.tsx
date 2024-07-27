// tests for the home page.

import { render, screen, renderHook } from "@testing-library/react";
import { expect, test, describe } from "vitest";

import Home from "~/app/page";
import Tagline from "~/app/_components/Tagline";
import { userAtom } from "~/server/lib/stores";
import { useAtom } from "jotai";
import { Provider } from "jotai";
import React from "react";

describe("smoke tests", () => {
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

        expect(homeElement).toHaveClass("absolute h-full w-full");
    });

    test("render Tagline component and check main div for styles", () => {
        render(<Tagline />);
        const taglineElement = screen.getByTestId("tagline-div");

        expect(taglineElement);

        expect(taglineElement).toHaveClass("flex h-full w-full flex-col items-center justify-center");
    });

    test("render Tagline component and check for text", () => {
        render(<Tagline />);
        const textElem = screen.getByText("Location sharing,");
        const textElemBlue = screen.getByText("reimagined.");

        expect(textElem);
        expect(textElemBlue);

        expect(textElem).toHaveClass("text-4xl font-bold leading-tight text-white sm:text-6xl sm:leading-none");
        expect(textElemBlue).toHaveClass("text-blue-500");
    });

    test("render Tagline component and check button after log in", () => {
        const { result } = renderHook(() => useAtom(userAtom), {
            wrapper: ({ children } : { children: any }) => <Provider>{children}</Provider>
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [user, setUser] = result.current;
        setUser({ 
            id: "123",
            username: "test",
            firstname: "test",
            lastname: "test",
            email: "test"
        });

        render(
            <Provider>
                <Tagline />
            </Provider>
        );
        
        const element = screen.getByText("Dashboard");
        expect(element);
        expect(element).toHaveClass("rounded-md bg-blue-500 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-700");
    }); 

    test("render Tagline component and check button without login", () => {
        const { result } = renderHook(() => useAtom(userAtom), {
            wrapper: ({ children } : { children: any }) => <Provider>{children}</Provider>
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [user, setUser] = result.current;
        setUser({ 
            id: "", // null for testing
            username: "test",
            firstname: "test",
            lastname: "test",
            email: "test"
        });

        render(
            <Provider>
                <Tagline />
            </Provider>
        );
        
        const element = screen.getByText("Get Started");
        expect(element);
        expect(element).toHaveClass("rounded-md bg-blue-500 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-700");
    });
});

describe("integration tests", () => {
    test("render tagline, check button before login, and after login", () => {
        const { result } = renderHook(() => useAtom(userAtom), {
            wrapper: ({ children } : { children: any }) => <Provider>{children}</Provider>
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [user, setUser] = result.current;
        setUser({
            id: "",
            username: "",
            firstname: "",
            lastname: "",
            email: ""
        });

        render(
            <Provider>
                <Tagline />
            </Provider>
        );

        const beforeLoginElement = screen.getByText("Get Started");
        expect(beforeLoginElement);
        expect(beforeLoginElement).toHaveClass("rounded-md bg-blue-500 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-700");

        setUser({
            id: "test",
            username: "test",
            firstname: "test",
            lastname: "test",
            email: "test"
        });

        render(
            <Provider>
                <Tagline />
            </Provider>
        );

        const loginElement = screen.getByText("Dashboard");
        expect(loginElement);
        expect(loginElement).toHaveClass("rounded-md bg-blue-500 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-700");
    });
});