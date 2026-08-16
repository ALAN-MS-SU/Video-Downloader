"use client";

import { Quality } from "@/@Types/Video/Video";
import { Button } from "@/Components/Shared/Button/Button";
import { Input } from "@/Components/Shared/Input/Input";
import { ErrMessage } from "@/Components/Shared/Promise/Err/Err";
import { Loading } from "@/Components/Shared/Promise/Loading/Loading";
import { VideoService } from "@/Lib/API/Video/Video.service";
import { Regex } from "@/Lib/Regex/Regex";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

export function SearchForm({
  URL,
  Qualities,
  SetPlayer,
}: {
  URL: RefObject<string>;
  Qualities: RefObject<{ MP4: Quality; Webm: Quality }>;
  SetPlayer: Dispatch<SetStateAction<boolean>>;
}) {
  const InputRef = useRef<HTMLInputElement>(null);
  const [IsLoading, SetLoading] = useState<boolean>(false);
  const [Err, SetErr] = useState<string>("");
  return (
    <>
      {" "}
      {IsLoading && <Loading />}
      {Err !== "" && <ErrMessage Message={Err} Close={SetErr} />}
      <div className="bg-bg shadow-2xl shadow-dark-primary rounded-2xl max-w-150 w-full h-75 flex flex-col justify-around items-center">
        <Input
          ref={InputRef}
          defaultValue={URL.current}
          ID="URL"
          placeholder="Enter your URL"
          className="text-center md:text-xl sm:text-lg text-sm w-full sm:h-full h-4/5  sm:px-5 px-1"
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
    </>
  );
}
