import { useState, useEffect } from 'react';

export default function useWindowSize() {
    function getSize() {
        return {
            width: window.innerWidth || undefined,
            height: window.innerHeight || undefined,
        }
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}