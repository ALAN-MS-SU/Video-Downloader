"use client";
import { Video } from "@/@Types/Video/Video";
import { IoClose } from "react-icons/io5";
export function YTVideo({
  Close,
  URL,
}: Pick<Video, "URL"> & { Close: () => void }) {
  return (
    <div className="relative w-full h-full">
      <IoClose
        className="absolute text-err text-4xl right-2 top-2 cursor-pointer border-3 border-err border-solid rounded-full bg-transparent hover:bg-err hover:border-transparent hover:text-err-hover transition-colors ease-in"
        onClick={() => Close()}
      />
      <iframe
        className="w-full h-full"
        src={URL}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
