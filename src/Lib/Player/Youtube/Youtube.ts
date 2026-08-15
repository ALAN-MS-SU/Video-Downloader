export class YTPlayer {
  static Incorporate(Video: string): string {
    console.log(Video);
    const ID = Video.split("//")[1].split("/")[1];
    
    return `https://www.youtube.com/embed/${ID}`;
  }
}
