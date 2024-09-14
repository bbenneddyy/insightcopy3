"use client";

import { useEffect, useRef } from "react";
import Player from "xgplayer";
import "xgplayer/dist/xgplayer.css"

export default function Video() {
    const playerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (playerRef.current) {
            const player = new Player({
                el: playerRef.current,
                url: '/videos/sample-video.mp4'
            });
            // Remove player when unmount
            return () => {
                player.destroy();
            };
        };
    }, []);

    return (
        <div className="flex justify-center m-8">
            <div ref={playerRef} />
        </div>
    );
}
