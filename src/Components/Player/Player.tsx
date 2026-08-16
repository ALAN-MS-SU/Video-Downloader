"use client";
import { useRef, useState } from "react";
import { SearchForm } from "./Form/Search";
import { Quality } from "@/@Types/Video/Video";
import { DownloadForm } from "./Form/Download";
export function Player() {
  const URL = useRef<string>("");
  const [Player, SetPlayer] = useState<boolean>(false);
  const Qualities = useRef<{ MP4: Quality; Webm: Quality }>({
    MP4: { Video: [], Audio: [] },
    Webm: { Video: [], Audio: [] },
  });
  function Close() {
    if (URL.current) {
      URL.current = "";
    }
    SetPlayer(false);
  }
  return (
    <>
      <div className="min-h-screen min-w-screen w-full h-full flex flex-col justify-center items-center overflow-x-hidden sm:py-10 py-5 sm:px-5 px-2">
        {Player && URL.current != "" ? (
          <DownloadForm VideoURL={URL} Close={Close} Qualities={Qualities} />
        ) : (
          <SearchForm
            URL={URL}
            Qualities={Qualities}
            SetPlayer={SetPlayer}
          />
        )}
      </div>
    </>
  );
}
