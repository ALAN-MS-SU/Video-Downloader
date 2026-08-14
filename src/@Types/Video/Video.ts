export interface Video {
  URL: string;
  Tittle: string;
  Video: string;
  Audio: string;
  Format: string;
}
export interface Qualities {
  Video: {
    FormatID: string;
    Quality: number | null | undefined;
    FPS: number | null | undefined;
  }[];
  Audio: {
    FormatID: string;
    Bitrate: number | null;
  }[];
}
