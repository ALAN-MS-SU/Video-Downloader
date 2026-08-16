#  Video Downloader

A modern web interface for downloading videos with customizable quality and format options.

The project provides a frontend built with **Next.js and TypeScript**, communicating with a backend API responsible for extracting and processing the requested video.

## Features

-  YouTube video URL input
-  Video quality selection
-  Audio quality selection
-  MP4 and WebM format support
-  Automatic download after processing
-  Responsive and modern interface
-  Loading and error states
-  Modular and reusable React components
-  API communication using Axios

## 🛠️ Technologies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

The project currently uses Next.js 16, React 19 and TypeScript 5. :contentReference[oaicite:1]{index=1}

##  Project Structure

```text
src/
├── @Types/
│   └── Video/
├── Assets/
├── Components/
│   ├── Player/
│   └── Shared/
├── Constants/
├── Lib/
│   ├── API/
│   ├── Player/
│   │   └── Youtube/
│   └── Regex/
└── app/
