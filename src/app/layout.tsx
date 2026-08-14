import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



export const metadata: Metadata = {
  title: "Video-Downloader",
  description: "Web site for Download YouTube videos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-br"
    >
      <body>{children}</body>
    </html>
  );
}
