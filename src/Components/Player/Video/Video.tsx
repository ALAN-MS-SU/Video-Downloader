"use client";
import { Video } from "@/@Types/Video/Video";
export function YTVideo({ URL }: Pick<Video, "URL">) {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={URL}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
