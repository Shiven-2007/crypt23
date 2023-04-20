"use client";
import { useState } from "react";
import {motion} from "framer-motion"
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
  if (!props.uid) return <></>;
  if (!props.schoolId) {
    const [code, setCode] = useState("");
    const change = (e: any) => {
      const text = e.target.value
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
      <motion.div className="bg-zinc-800 p-3 flex flex-col rounded-xl">
        School Code
        <input
          onChange={change}
          value={code}
          className="bg-zinc-600 p-3 rounded-sm"
          ></input>
        <button onClick={() => sendData(props.uid!, code)}>submit</button>
      </motion.div>
      </>
    );
  } else {
    const code = props.schoolId;
    return (
      <motion.div className="bg-gray-800 p-3">
        <input value={code} disabled className="p-2"></input>
      </motion.div>

    )
  }
};

export default schoolCode;
