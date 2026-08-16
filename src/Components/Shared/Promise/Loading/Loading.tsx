"use client";

export function Loading() {
  return (
    <div className="fixed w-screen h-screen z-10 flex flex-col justify-center items-center ">
      <div className="relative flex justify-center items-center rounded-full sm:w-80 w-60 sm:h-80 h-60 shadow-2xl z-20 shadow-dark-primary">
        <div className="absolute rounded-full border-l-8 border-primary w-full h-full animate-loading " />
        <span className="font-bold sm:text-4xl text-3xl text-text-light bg-primary sm:px-6 sm:py-4 px-4 py-2 rounded-full">
          Loading
        </span>
      </div>
      <div className="bg-black opacity-25 absolute w-full h-full" />
    </div>
  );
}
