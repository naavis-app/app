import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(window, "dispatchEvent", {
    value: vi.fn(),
});

// using window.Matchmedia in app/page.tsx was causing problems with testing.
// that functionality is needed so the website can have the 
// correct theme on load, when the theme is set to "inherit"
// this is how i fixed it:
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
// (https://github.com/vitest-dev/vitest/issues/821)
