"use client";
import { useState } from "react";
import { Anonymous_Pro } from "next/font/google";

const AnonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: "400",
});

function randtxt(text: string, setTxt: any, ogTxt: string) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@";
  let iters = 0;
  const interval = setInterval(() => {
    setTxt(
      text
        .split("")
        .map((letter, index) => {
          if (index < iters) {
            return ogTxt[index];
          }

          return chars[Math.floor(Math.random() * 27)];
        })
        .join("")
    );
    if (iters >= ogTxt.length) {
      clearInterval(interval);
    }

    iters += 1 / 4;
  }, 30);
}
const text = ({ str }: { str: string }) => {
  const [txt, setTxt] = useState(str);
  const ogTxt = str;
  return (
    <div
      onMouseOver={() => randtxt(txt, setTxt, ogTxt)}
      className={`${AnonymousPro.className} txt layers hero glitch w-fit text-6xl`}
      data-text={txt}
    >
      <span>{txt}</span>
    </div>
  );
};

export default text;
