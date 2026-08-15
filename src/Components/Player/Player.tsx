"use client";

import { useRef, useState } from "react";
import { YTVideo } from "./Video/Video";
import { Input } from "../Shared/Input/Input";
import { Button } from "../Shared/Button/Button";
import { Loading } from "../Shared/Promise/Loading/Loading";
import { YTPlayer } from "@/Lib/Player/Youtube/Youtube";
import { Regex } from "@/Lib/Regex/Regex";
import { ErrMessage } from "../Shared/Promise/Err/Err";
import { LinkForm } from "./Form/Form";

export function Player() {
  const [IsLoading, SetLoading] = useState<boolean>(false);
  const [Err, SetErr] = useState<string>("");
  const URL = useRef<string>("");
  const [Player, SetPlayer] = useState<boolean>(false);
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
      <div className="w-screen h-screen flex flex-col justify-center items-center overflow-hidden">
        {Player && URL.current != "" ? (
          <div className="bg-bg shadow-2xl shadow-dark-primary rounded-2xl w-265 h-180 flex flex-col justify-between items-center">
            <div className="w-full h-157.5">
              <YTVideo Close={Close} URL={YTPlayer.Incorporate(URL.current)} />
            </div>
            <Button
              className="mb-5 w-4/5 h-15"
              onClick={async () => {
                SetLoading(true);
              }}
              Label="Download"
            />
          </div>
        ) : (
          <LinkForm URL={URL} SetErr={SetErr} SetPlayer={SetPlayer} />
        )}
      </div>
    </>
  );
}
