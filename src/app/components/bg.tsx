"use client";

function bg() {
  return (
    <>
      <video
        className="bgvid1"
        src="/videos/backgroundwebsitefix.mp4"
        autoPlay
        muted
        loop
      />
      <div className="absolute left-0 top-0 h-full w-full bg-black"></div>
    </>
  );
}

export default bg;
