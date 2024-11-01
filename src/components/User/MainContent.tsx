"use client";

import { LinkIcon } from "@heroicons/react/20/solid";
// import { useEffect, useRef } from "react";
// import Player from "xgplayer";
// import "xgplayer/dist/xgplayer.css";

interface IMainContent {
  site: string;
}

export default function MainContent({ site }: IMainContent) {
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
  return (
    <>
      <div className="flex justify-center items-start min-h-screen pt-16">
        <div className="w-1/2 m-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center mb-4">
            {site === "online" &&
              <>
                <h1 className="text-lg font-semibold text-blue-500">
                  <a href="https://chula.zoom.us/j/98602876220?pwd=H2XMmg1qnT2x00UayarfKkUdz1mpqT.1"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    กดเพื่อเข้าร่วมงานเสวนา
                    <LinkIcon className="h-5 w-5 inline" />
                  </a>
                </h1>
                <p>Meeting ID: 986 0287 6220</p>
                <p>Password: 626147</p>
              </>
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
