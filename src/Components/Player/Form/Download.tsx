"use client";

import { IoClose } from "react-icons/io5";
import { YTVideo } from "../Video/Video";
import { Select } from "@/Components/Shared/Select/Select";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { Button } from "@/Components/Shared/Button/Button";
import { YTPlayer } from "@/Lib/Player/Youtube/Youtube";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { Quality } from "@/@Types/Video/Video";
import { VideoService } from "@/Lib/API/Video/Video.service";
import { Formats } from "@/Constants/Formats";

export function DownloadForm({
  Close,
  VideoURL,
  Qualities,
  SetLoading,
  SetErr,
}: {
  Close: () => void;
  VideoURL: RefObject<string>;
  Qualities: RefObject<{ MP4: Quality; Webm: Quality }>;
  SetLoading: Dispatch<SetStateAction<boolean>>;
  SetErr: Dispatch<SetStateAction<string>>;
}) {
  const [Format, SetFormat] = useState<"MP4" | "Webm">(
    Formats[0] as "MP4" | "Webm",
  );
  const Video = Qualities.current[Format].Video;
  const Audio = Qualities.current[Format].Audio;
  return (
    <div className="bg-bg shadow-2xl shadow-dark-primary flex flex-row rounded-2xl w-400 h-157.5 ">
      <div className="max-w-265 h-full w-full flex flex-col justify-between items-center">
        <div className="w-full h-full">
          <YTVideo Close={Close} URL={YTPlayer.Incorporate(VideoURL.current)} />
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          SetLoading(true);
          const [Format, Video, Audio] = new FormData(e.currentTarget)
            .values()
            .map((Value) => String(Value));
          const Response = await VideoService.Download({
            Video,
            Audio,
            Format: Format.toLowerCase(),
            VideoURL: VideoURL.current,
          });

          if (!Response.Download) {
            SetErr("Download err");
            SetLoading(false);
            return;
          }
          if (Response.Download) {
            const a = document.createElement("a");
            a.href = Response.Download;
            a.download = `${Response.Tittle}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(Response.Download);
            SetLoading(false);
          }
        }}
        className="bg-bg border-l-0 border-5 rounded-r-2xl border-dark-primary max-w-135 w-full h-full relative"
      >
        <IoClose
          className="absolute text-err text-4xl right-2 top-2 cursor-pointer border-3 border-err border-solid rounded-full bg-transparent hover:bg-err hover:border-transparent hover:text-err-hover transition-colors ease-in"
          onClick={() => Close()}
        />
        <span className="text-4xl text-text font-semibold text-center h-1/3 flex justify-center items-center">
          Choose Quality
        </span>
        <div className=" flex flex-row justify-around items-start w-full h-1/3">
          <Select
            ID="Format"
            className="w-30"
            onChange={(e) => {
              SetFormat(e.currentTarget.value as "MP4" | "Webm");
            }}
            Options={Formats}
          />
          {Video.length > 0 && Audio.length > 0 ? (
            <>
              <Select
                ID="Video"
                className="w-30"
                Options={Video.map(
                  (Quality) => `${Quality.Quality}p + ${Quality.FPS}FPS`,
                )}
                Values={Video.map((Quality) => Quality.FormatID)}
              />
              <Select
                ID="Audio"
                className="w-30"
                Options={Audio.map((Quality) => `${Quality.Bitrate}kbps`)}
                Values={Audio.map((Quality) => Quality.FormatID)}
              />
            </>
          ) : (
            <span className="text-xl text-text w-60 h-18 font-semibold text-center flex justify-center items-center">
              This format is not available
            </span>
          )}
        </div>
        <Link
          href={"https://youtube.com"}
          className="text-9xl absolute text-red-600 text-center left-[calc(50%-60.7px)] top-1/2 hover:text-primary transition-colors ease-in cursor-pointer"
        >
          <FaYoutube />
        </Link>

        <div className="flex justify-center items-center w-full h-1/3">
          <Button
            disabled={Video.length < 1 || Audio.length < 1}
            className=" w-4/5 h-15"
            type="submit"
            Label={
              Video.length > 0 && Audio.length > 0
                ? "Download"
                : "Not available"
            }
          />
        </div>
      </form>
    </div>
  );
}
