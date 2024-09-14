"use client";

import { useEffect, useRef } from "react";
import Player from "xgplayer";
import "xgplayer/dist/xgplayer.css";

export default function Video() {
  const playerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (playerRef.current) {
      const player = new Player({
        el: playerRef.current,
        url: "/videos/sample-video.mp4",
      });
      // Remove player when unmount
      return () => {
        player.destroy();
      };
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-16">
        <div className="w-1/2 m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center mb-4">
            <h1 className="text-lg font-semibold text-gray-800">
              วีดีโอย้อนหลังและเกียรติบัตรการเข้าร่วม
              จะสามารถใช้ได้หลังสิ้นสุดงานเสวนา
            </h1>
          </div>
          {/* <div className="flex justify-center mt-8">
            <div ref={playerRef} className="w-60 h-60 bg-slate-300 rounded-md"></div>
          </div> */}
        </div>
      </div>
    </>
  );
}
