"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { VT323 } from "next/font/google";
import schoolData from "@/app/schoolData.json";



const VT323Font = VT323({
  subsets: ["latin"],
  weight: "400",
});

async function sendData(uid: string, schoolcode: string, setIsSchool: any) {
  const res = await fetch("/schoolCheck", {
    method: "POST",
    body: JSON.stringify({ uid: uid, code: schoolcode }),
  });
  const jsondata = await res.json();
  if (jsondata.ok) {
    setIsSchool(true)
  }
}

const schoolCode = (props: {
  uid: string | undefined;
  schoolId: string | undefined;
}) => {
  const schoolsdata = schoolData;
  const [isSchool, setIsSchool] = useState( props.schoolId ? true: false)
  if (!props.uid) return <></>;
  else if (!isSchool) {
    const [code, setCode] = useState("");
    const change = (e: any) => {
      const text = e.target.value;
      const allowedChars = "0123456789";
      let status = true;
      for (let i = 0; i < text.length; i++) {
        if (!allowedChars.includes(text[i])) {
          status = false;
        }
      }
      if (status) {
        setCode(text);
      }
    };

    return (
      <>
        <motion.div className={`flex flex-col rounded-xl bg-zinc-800 p-3 ${VT323Font.className} h-1/6`}>
        <p className="text-3xl justify-self-center self-center">School Code</p>
          <input
            value={code}
            className="rounded-sm bg-zinc-600 p-3"
            onChange={change}
          ></input>
          <button onClick={() => sendData(props.uid!, code, setIsSchool)}>submit</button>
        </motion.div>
      </>
    );
  } else {
    const code = props.schoolId;
    return (
      <motion.div
        className={`flex flex-col justify-around rounded bg-zinc-900 p-5 ${VT323Font.className} h-1/6`}
      >
        <p className="text-3xl justify-self-center self-center">School Code</p>
        <input
          value={code}
          disabled
          className="bg-neutral-600 p-2 text-lg tracking-widest"
        ></input>
        <div className="w-fit">
          {schoolsdata.schools
            .find((a) => a.schoolCode == props.schoolId)
            ?.schoolName.split(", ")
            .map((name) => (
              <div>{name}</div>
            ))}
        </div>
      </motion.div>
    );
  }
};

export default schoolCode;
