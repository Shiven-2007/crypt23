"use client";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const playButton = (props: any) => {
  const user = props.user;
  return (
    <div className="playbtn-container">
      <Link
        href={`/play/${user?.suspect}/${user?.level}`}
        className={"playbtn " + poppins.className}
      >
        PLAY
      </Link>
    </div>
  );
};

export default playButton;
