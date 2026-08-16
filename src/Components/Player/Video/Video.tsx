"use client";
import { Video } from "@/@Types/Video/Video";
export function YTVideo({
  Close,
  URL,
}: Pick<Video, "URL"> & { Close: () => void }) {
  return (
    <div className="relative w-full h-full">
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
