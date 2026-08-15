"use client";

import { Button } from "@/Components/Shared/Button/Button";
import { Input } from "@/Components/Shared/Input/Input";
import { Regex } from "@/Lib/Regex/Regex";
import { Dispatch, RefObject, SetStateAction, useRef } from "react";

export function LinkForm({
  URL,
  SetErr,
  SetPlayer,
}: {
  URL: RefObject<string>;
  SetErr: Dispatch<SetStateAction<string>>;
  SetPlayer: Dispatch<SetStateAction<boolean>>;
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
          console.log(URL.current);
          if (URL.current == "") {
            SetErr("Empaty link");
            return;
          }
          if (!Regex.YTRegex(URL.current)) {
            SetErr("Invalid Link");
            return;
          }
          SetPlayer(true);
        }}
      />
    </div>
  );
}
