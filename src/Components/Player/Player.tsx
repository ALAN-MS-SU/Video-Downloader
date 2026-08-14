"use client";

import { useState } from "react";
import { YTVideo } from "./Video/Video";
import { Input } from "../Shared/Input/Input";
import { Button } from "../Shared/Button/Button";

export function Player() {
  const [URL, SetURL] = useState<string>();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="bg-secondary w-150 h-75 shadow-2xl shadow-shadow rounded-2xl">
        {URL ? (
          <YTVideo URL={"https://www.youtube.com/embed/tE1A8lgLdRA"} />
        ) : (
          <div className=" w-full h-full flex flex-col justify-around items-center ">
            <Input
              ID="URL"
              placeholder="Enter your URL"
              className="text-center text-xl w-full h-full"
            />
            <Button Label="Search Video" />
          </div>
        )}
      </div>
    </div>
  );
}
