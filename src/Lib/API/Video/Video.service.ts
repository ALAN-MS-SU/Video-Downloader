import { Quality, Video } from "@/@Types/Video/Video";
import { API } from "../API";

export class VideoService {
  public static async GetQuality({
    URL,
  }: Pick<Video, "URL">): Promise<Quality> {
    const Qualities: Quality = (await API.get("/Video", { params: { URL } }))
      .data;
    return Qualities;
  }
  public static async Download({
    Video,
    Audio,
    Format,
    VideoURL,
  }: Pick<Video, "Video" | "Audio" | "Format"> & { VideoURL: string }) {
    const Response = await API.post(
      "/Video",
      { Video, Audio, Format, URL:VideoURL },
      { responseType: "blob" },
    );
    const Disposition = Response.headers["content-disposition"];
    let Tittle = "Video";
    if (Disposition) {
      const Match = Disposition.match(/filename="(.+)"/);
      if (Match) {
        Tittle = Match[1];
      }
    }
    const File = new Blob([Response.data], {
      type: String(Response.headers["content-type"]),
    });
    const Download = URL.createObjectURL(File);
    return { Download, Tittle };
  }
}
