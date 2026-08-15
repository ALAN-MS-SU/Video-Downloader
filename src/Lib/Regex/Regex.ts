export class Regex {
  private static Youtube: RegExp =
    /^https:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[\w-]+|youtu\.be\/[\w-]+)(?:[?&].*)?$/;
  static YTRegex(Link: string): boolean {
    return this.Youtube.test(Link);
  }
}
