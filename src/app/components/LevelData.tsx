"use client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import NextButton from "@/app/components/navButtons";
import Image from "next/image";
import { send } from "process";
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
  const myUrl = useRef("");
  const [inputVal, setInputVal] = useState("");
  const [status, setStatus] = useState(false);
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
      const res = await data.json();
      if (res.status === "200") {
        myUrl.current = res.redUrl;
        setStatus(true);
      }
    }
  }
  return (
    <div className="flex h-4/5 w-3/5 flex-col justify-center gap-6 bg-white/10 p-4 text-white">
      <div className="flex flex-row justify-center gap-8">
        <div className="h-48 w-48 rounded-sm bg-black">
          <Image
            src="https://cdn.discordapp.com/attachments/868016961425145856/1101551770724999238/resourceperson.png"
            className="h-full w-full"
            alt="crazy"
            width={300}
            height={300}
          />
        </div>
        <div className="flex w-3/5 flex-col overflow-scroll overflow-x-hidden rounded-2xl bg-black p-4">
          {commentHint !== null && <HtmlComment text={commentHint} />}
          {mainHint}
          {img !== null && img !== "" && (
            <Image src={img} alt="image" width={300} height={300} />
          )}
        </div>
      </div>
      <div className="flex flex-row justify-center gap-8">
        <div className="h-48 w-48 rounded-sm bg-black">
          <Image
            src="https://cdn.discordapp.com/attachments/868016961425145856/1101551788844396734/detective.png"
            className="h-full w-full"
            alt="crazy"
            width={300}
            height={300}
          />
        </div>
        <div className="flex w-3/5 flex-col justify-start gap-6">
          <div className="h-24 w-full rounded-2xl bg-black">
            <input
              className="h-full w-full bg-transparent text-center outline-none"
              value={inputVal}
              onChange={change}
            />
          </div>
          <button
            className="rounded-full bg-red-800 p-3 px-20 transition ease-in-out hover:bg-red-700"
            onClick={() => sendAnswer(inputVal)}
          >
            Submit
          </button>
          <NextButton
            redUrl={myUrl.current}
            status={status}
            setStatus={setStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default Level;
