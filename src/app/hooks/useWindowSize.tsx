import { useState, useEffect } from "react";

export default function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
        if (typeof window !== "undefined") {
            return {
                width: window.innerWidth || 0,
                height: window.innerHeight || 0,
            };
        }
        return {
            width: undefined,
            height: undefined,
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if(!isClient) {
            return;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [isClient]);

    return windowSize;
}
