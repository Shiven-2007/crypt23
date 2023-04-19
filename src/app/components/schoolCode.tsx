"use client";
import { prisma } from "@/server/db";
import { User } from "next-auth";
import { useState } from "react";



async function sendData(usid: string, schoolcode: string){
  const res= await fetch("/schoolCheck",{
    method:"POST",
    body: JSON.stringify(usid)
  })
  const jsondata = await res.json()
  if (jsondata){
    console.log("yoo")
  }
}

const schoolCode = (user: User``) => {
  if (!!! user.school_id) {
    const [code, setCode] = useState("");
    const change = (e: any) => {
      const text = e.target.value.toLowerCase();
      const allowedChars="0123456789"
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
    
    return (<>
    <input onChange={change} value={code}></input>
    <button onClick={()=>sendData(user!.id, code)}>submit</button>
    </>
    );
  }
  else {
    const code= user.school_id
    return <input value={code} disabled></input>;
  }
};

export default schoolCode;
