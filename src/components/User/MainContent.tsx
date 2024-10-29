"use client";

import { conferenceLink } from "@/utils/config";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/20/solid";
import { unstable_noStore as noStore } from "next/cache";
// import { useEffect, useRef } from "react";
// import Player from "xgplayer";
// import "xgplayer/dist/xgplayer.css";

export default function MainContent() {
  noStore();
  // const playerRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (playerRef.current) {
  //     const player = new Player({
  //       el: playerRef.current,
  //       url: "/videos/sample-video.mp4",
  //     });
  //     // Remove player when unmount
  //     return () => {
  //       player.destroy();
  //     };
  //   }
  // }, []);
  console.log(conferenceLink)
  return (
    <>
      <div className="flex justify-center items-start min-h-screen pt-16">
        <div className="w-1/2 m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center mb-4">
            {conferenceLink &&
              <h1 className="text-lg font-semibold text-blue-500">
                <Link href={conferenceLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  prefetch={false}>
                  กดเพื่อเข้าร่วมงานเสวนา
                  <LinkIcon className="h-5 w-5 inline" />
                </Link>
              </h1>
            }
            <h3 className="text-gray-500">
              วีดีโอย้อนหลังและเกียรติบัตรการเข้าร่วม
              จะสามารถใช้ได้หลังสิ้นสุดงานเสวนา
            </h3>
          </div>
          {/* <div className="flex justify-center mt-8">
            <div ref={playerRef} className="w-60 h-60 bg-slate-300 rounded-md"></div>
          </div> */}
        </div>
      </div>
    </>
  );
}
