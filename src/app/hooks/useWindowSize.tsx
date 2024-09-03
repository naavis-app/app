import { useCallback, useEffect, useState } from "react";

export default function useWindowSize() {
	const isClient = typeof window === "object";

    const getSize = useCallback(() => {
        if (isClient) {
            return {
                width: window.innerWidth || 0,
                height: window.innerHeight || 0,
            };
        }
        return {
            width: 0,
            height: 0,
        };
    }, [isClient]);

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) {
			return;
		}

		function handleResize() {
			setWindowSize(getSize());
		}

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, [isClient, getSize]);

	return windowSize;
}
