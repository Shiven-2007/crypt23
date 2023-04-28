"use client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import NextButton from "@/app/components/navButtons";
import Image from "next/image";
interface propType {
  mainHint: string;
  commentHint: string | null;
  ldata: leveldatatype;
  img: string | null;
}
const HtmlComment = ({ text }: { text: string }) => {
  return <span dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }} />;
};
const Level = ({ mainHint, commentHint, ldata, img }: propType) => {
  const [inputVal, setInputVal] = useState("");
  const allowedChars = "abcdefghijklmnopqrstuvwxyz1234567890";
  const change = (e: any) => {
    const text = e.target.value.toLowerCase();
    let status = true;
    for (let i = 0; i < text.length; i++) {
      if (!allowedChars.includes(text[i])) {
        status = false;
      }
    }
    if (status) {
      setInputVal(text);
    }
  };
  const keyDown = (e: any) => {
    if (e.key === "Enter") {
      sendAnswer(inputVal);
    }
  };
  async function sendAnswer(answer: string) {
    if (!!answer) {
      const data = await fetch("/valanswer", {
        method: "POST",
        body: JSON.stringify({ answer: answer, path: ldata }),
      });
      const val = await data.json();
    }
  }
  return (
    <div className="flex h-80 w-72 flex-col items-center justify-center gap-1 rounded-lg bg-slate-800">
      <div className="flex h-32 w-40 items-center justify-center rounded-2xl bg-slate-500">
        {commentHint !== null && <HtmlComment text={commentHint} />}
        {mainHint}
        {img !== null && (
          <Image src={img} alt="image" width={100} height={100} />
        )}
      </div>
      <div className="flex h-28 w-52 items-center justify-center rounded-2xl bg-slate-500">
        <input onChange={change} value={inputVal} onKeyDown={keyDown} />
      </div>
      <button onClick={() => sendAnswer(inputVal)}>Submit</button>
    </div>
  );
};

export default Level;
