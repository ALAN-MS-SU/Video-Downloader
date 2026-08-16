"use client";

import { Quality } from "@/@Types/Video/Video";
import { Button } from "@/Components/Shared/Button/Button";
import { Input } from "@/Components/Shared/Input/Input";
import { VideoService } from "@/Lib/API/Video/Video.service";
import { Regex } from "@/Lib/Regex/Regex";
import { Dispatch, RefObject, SetStateAction, useRef } from "react";

export function SearchForm({
  URL,
  Qualities,
  SetErr,
  SetPlayer,
  SetLoading,
}: {
  URL: RefObject<string>;
  Qualities: RefObject<{MP4:Quality,Webm:Quality}>;
  SetErr: Dispatch<SetStateAction<string>>;
  SetPlayer: Dispatch<SetStateAction<boolean>>;
  SetLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const InputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-bg shadow-2xl shadow-dark-primary rounded-2xl w-150 h-75 flex flex-col justify-around items-center ">
      <Input
        ref={InputRef}
        defaultValue={URL.current}
        ID="URL"
        placeholder="Enter your URL"
        className="text-center text-xl w-full h-full px-5"
      />
      <Button
        Label="Search Video"
        onClick={async () => {
          URL.current = InputRef.current?.value || "";

          if (URL.current == "") {
            SetErr("Empaty link");
            return;
          }
          if (!Regex.YTRegex(URL.current)) {
            SetErr("Invalid Link");
            return;
          }
          SetLoading(true);
          Qualities.current = await VideoService.GetQuality({
            URL: URL.current,
          });
          SetLoading(false);
          SetPlayer(true);
        }}
      />
    </div>
  );
}
