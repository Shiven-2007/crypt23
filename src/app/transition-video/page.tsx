"use client";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TransitionVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  const onVideoEnd = () => {
    router.push("/play/8/2");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <video
        ref={videoRef}
        className="w-full"
        onEnded={onVideoEnd}
        controls={false}
      >
        <source
          src="https://cdn.discordapp.com/attachments/875804016574083113/1102272661024935946/ERROR_ERROR_ERRROERR_ERROR_ERRRORR_ERRORR_ERROERRORERROR.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
