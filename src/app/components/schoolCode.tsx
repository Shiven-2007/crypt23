"use client";
import { useState } from "react";

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

const schoolCode = (props: any) => {
  console.log(props);
  if (!props.schoolId) {
    const [code, setCode] = useState("");
    const change = (e: any) => {
      const text = e.target.value.toLowerCase();
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
        <input onChange={change} value={code}></input>
        <button onClick={() => sendData(props.uid ?? "L", code)}>submit</button>
      </>
    );
  } else {
    const code = props.schoolId;
    return <input value={code} disabled></input>;
  }
};

export default schoolCode;
