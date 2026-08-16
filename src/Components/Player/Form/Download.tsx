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
import { Loading } from "@/Components/Shared/Promise/Loading/Loading";
import { ErrMessage } from "@/Components/Shared/Promise/Err/Err";

export function DownloadForm({
  Close,
  VideoURL,
  Qualities,
}: {
  Close: () => void;
  VideoURL: RefObject<string>;
  Qualities: RefObject<{ MP4: Quality; Webm: Quality }>;
}) {
  const [Format, SetFormat] = useState<"MP4" | "Webm">(
    Formats[0] as "MP4" | "Webm",
  );
  const [IsLoading, SetLoading] = useState<boolean>(false);
  const [Err, SetErr] = useState<string>("");
  const Video = Qualities.current[Format].Video;
  const Audio = Qualities.current[Format].Audio;
  return (
    <>
      {IsLoading && <Loading />}
      {Err !== "" && <ErrMessage Message={Err} Close={SetErr} />}
      <div className="bg-bg shadow-2xl shadow-dark-primary flex 3xl:flex-row flex-col rounded-2xl 3xl:w-400 xl:w-265 w-full 3xl:h-157.5 md:h-325 h-200 overflow-hidden">
        <div className="max-w-full hidden 3xl:max-w-265 max-h-157.5 h-full w-full md:flex flex-col justify-between items-center">
          <IoClose
            className="w-full h-15 hidden md:flex justify-center items-center bg-transparent cursor-pointer border-4 border-err 3xl:hidden rounded-t-2xl border-b-0 hover:bg-err transition-colors ease-in text-err hover:text-text-light"
            onClick={() => Close()}
          />
          <div className="w-full h-full">
            <YTVideo
              Close={Close}
              URL={YTPlayer.Incorporate(VideoURL.current)}
            />
          </div>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            SetLoading(true);
            const [Format, Video, Audio] = new FormData(e.currentTarget)
              .values()
              .map((Value) => String(Value));

            if (Formats.every((format) => format !== Format)) {
              SetErr("Invalid format");
              SetLoading(false);
              return;
            }
            try {
              const Response = await VideoService.Download({
                Video,
                Audio,
                Format: Format.toLowerCase(),
                VideoURL: VideoURL.current,
              });

              const a = document.createElement("a");
              a.href = Response.Download;
              a.download = `${Response.Tittle}`;
              document.body.appendChild(a);
              a.click();
              a.remove();
              URL.revokeObjectURL(Response.Download);
              SetLoading(false);
            } catch (err) {
              SetErr("Download err");
              SetLoading(false);
            }
          }}
          className="bg-bg 3xl:border-l-0 3xl:border-t-5 md:border-t-0 border-5 border-dark-primary 3xl:max-w-135 w-full h-full relative rounded-2xl 3xl:rounded-l-none 3xl:rounded-t-2xl md:rounded-t-none"
        >
          <IoClose
            className="absolute text-err text-4xl right-2 top-2 cursor-pointer border-3 border-err border-solid rounded-full bg-transparent block md:hidden 3xl:block hover:bg-err hover:border-transparent hover:text-err-hover transition-colors ease-in"
            onClick={() => Close()}
          />
          <span className="sm:text-4xl text-2xl text-text font-semibold text-center sm:h-1/3 h-1/4 flex justify-center items-center">
            Choose Quality
          </span>
          <div className=" flex flex-col sm:flex-row justify-around sm:items-start items-center w-full sm:h-1/3 h-2/4">
            <Select
              ID="Format"
              className="3xl:w-30 sm:w-40 w-50 text-center"
              onChange={(e) => {
                SetFormat(e.currentTarget.value as "MP4" | "Webm");
              }}
              Options={Formats}
            />
            {Video.length > 0 && Audio.length > 0 ? (
              <>
                <Select
                  ID="Video"
                  className="3xl:w-30 sm:w-40 w-50 text-center"
                  Options={Video.map(
                    (Quality) => `${Quality.Quality}p + ${Quality.FPS}FPS`,
                  )}
                  Values={Video.map((Quality) => Quality.FormatID)}
                />
                <Select
                  ID="Audio"
                  className="3xl:w-30 sm:w-40 w-50 text-center"
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
            className="text-9xl absolute text-red-600 text-center left-[calc(50%-60.7px)] top-1/2 hover:text-primary transition-colors ease-in cursor-pointer hidden sm:block"
          >
            <FaYoutube />
          </Link>

          <div className="flex justify-center items-center w-full sm:h-1/3 h-1/4">
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
    </>
  );
}
