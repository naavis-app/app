import '@testing-library/jest-dom';
import { vi } from 'vitest';

Object.defineProperty(window, 'dispatchEvent', {
    value: vi.fn(),
});
