"use client";
import { useRef, useState } from "react";
import { Loading } from "../Shared/Promise/Loading/Loading";
import { ErrMessage } from "../Shared/Promise/Err/Err";
import { SearchForm } from "./Form/Search";
import { Quality } from "@/@Types/Video/Video";
import { DownloadForm } from "./Form/Download";
export function Player() {
  const [IsLoading, SetLoading] = useState<boolean>(false);
  const [Err, SetErr] = useState<string>("");
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
      {IsLoading && <Loading Close={SetLoading} />}
      {Err != "" && <ErrMessage Message={Err} Close={SetErr} />}
      <div className="w-screen h-screen flex flex-col justify-center items-center overflow-hidden px-5">
        {Player && URL.current != "" ? (
          <DownloadForm
            VideoURL={URL}
            Close={Close}
            Qualities={Qualities}
            SetLoading={SetLoading}
            SetErr={SetErr}
          />
        ) : (
          <SearchForm
            URL={URL}
            Qualities={Qualities}
            SetLoading={SetLoading}
            SetErr={SetErr}
            SetPlayer={SetPlayer}
          />
        )}
      </div>
    </>
  );
}
