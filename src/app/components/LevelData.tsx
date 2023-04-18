"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import NextButton from "@/app/components/navButtons";

interface propType {
  mainHint: string;
  commentHint: string;
  ldata: leveldatatype;
}

const Level = ({ mainHint, commentHint, ldata }: propType) => {
  const [val, setVal] = useState("");
  const [statusNext, setStatusNext] = useState(false);
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
      setVal(text);
    }
  };
  const keyDown = (e: any) => {
    if (e.key === "Enter") {
      sendAnswer(val);
    }
  };
  async function sendAnswer(answer: string) {
    if (!!answer) {
      const data = await fetch("/valanswer", {
        method: "POST",
        body: JSON.stringify({ answer: answer, path: ldata }),
      });
      const val = await data.json();
      console.log(val);
      if (val) {
        setStatusNext(true);
      } else {
        setStatusNext(false);
        setVal("");
      }
    }
  }
  return (
    <div className="flex h-80 w-72 flex-col items-center justify-center gap-1 rounded-lg bg-slate-800">
      <div className="flex h-32 w-40 items-center justify-center rounded-2xl bg-slate-500">
        {mainHint}
      </div>
      <div className="flex h-28 w-52 items-center justify-center rounded-2xl bg-slate-500">
        <input onChange={change} value={val} onKeyDown={keyDown} />
      </div>
      <button onClick={() => sendAnswer(val)}>Submit</button>
      <NextButton
        levelData={ldata}
        status={statusNext}
        fn={setVal}
        fn2={setStatusNext}
      />
    </div>
  );
};

export default Level;
