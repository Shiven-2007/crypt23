"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { VT323 } from "next/font/google";
import schoolData from "@/app/schoolData.json";

const VT323Font = VT323({
  subsets: ["latin"],
  weight: "400",
});

async function sendData(uid: string, schoolcode: string) {
  const res = await fetch("/schoolCheck", {
    method: "POST",
    body: JSON.stringify({ uid: uid, code: schoolcode }),
  });
  const jsondata = await res.json();
  if (jsondata) {
    console.log("yoo");
  }
}

const schoolCode = (props: {
  uid: string | undefined;
  schoolId: string | undefined;
}) => {
  const schoolsdata = schoolData;
  console.log(
    schoolsdata.schools.find((a) => a.schoolCode == props.schoolId),
    props.schoolId,
    "yoooooo"
  );

  if (!props.uid) return <></>;
  if (!props.schoolId) {
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
        <motion.div className="flex flex-col rounded-xl bg-zinc-800 p-3">
          School Code
          <input
            onChange={change}
            value={code}
            className="rounded-sm bg-zinc-600 p-3"
          ></input>
          <button onClick={() => sendData(props.uid!, code)}>submit</button>
        </motion.div>
      </>
    );
  } else {
    const code = props.schoolId;
    return (
      <motion.div
        className={`flex flex-col justify-around rounded bg-zinc-900 p-5 ${VT323Font.className} h-1/6`}
      >
        <p className="text-3xl">School Code</p>
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
