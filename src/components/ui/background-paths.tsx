import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    const paths = React.useMemo(() => Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    })), [position]);

    // Static fallback for SSR and initial render
    if (!isClient) {
        return (
            <div className="absolute inset-0 pointer-events-none w-full h-full">
                <svg
                    className="w-full h-full text-white"
                    viewBox="0 0 696 316"
                    fill="none"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <title>Background Paths</title>
                    {paths.map((path) => (
                        <path
                            key={path.id}
                            d={path.d}
                            stroke="currentColor"
                            strokeWidth={path.width}
                            strokeOpacity={0.2 + path.id * 0.02}
                            fill="none"
                        />
                    ))}
                </svg>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 pointer-events-none w-full h-full">
            <svg
                className="w-full h-full text-white"
                viewBox="0 0 696 316"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.2 + path.id * 0.02}
                        fill="none"
                        initial={{ 
                            pathLength: 0.3, 
                            opacity: 0.6,
                            pathOffset: 0
                        }}
                        animate={{
                            pathLength: [0.3, 1, 0.3],
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export const BackgroundPaths = React.memo(() => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden">
            {mounted && (
                <>
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </>
            )}
        </div>
    );
});

BackgroundPaths.displayName = 'BackgroundPaths';