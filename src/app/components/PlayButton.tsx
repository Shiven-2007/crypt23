"use client";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});
const playButton = () => {
  return (
    <div className="playbtn-container">
      <Link href="/play" className={"playbtn " + poppins.className}>
        PLAY
      </Link>
    </div>
  );
};

export default playButton;
