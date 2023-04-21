"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { VT323 } from "next/font/google";
import schoolData from "@/app/schoolData.json";

const VT323Font = VT323({
  subsets: ["latin"],
  weight: "400",
});

async function sendData(
  uid: string,
  schoolcode: string,
  setIsSchoolCode: any,
  setIsError: any
) {
  const res = await fetch("/schoolCheck", {
    method: "POST",
    body: JSON.stringify({ uid: uid, code: schoolcode }),
  });
  const jsondata = await res.json();
  if (jsondata.status == "200") {
    setIsSchoolCode(true);
  } else {
    setIsError(true);
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
  const [isSchoolCode, setIsSchoolCode] = useState(
    props.schoolId ? true : false
  );
  const [isError, setIsError] = useState(false);
  const [code, setCode] = useState("");
  if (!props.uid) return <></>;
  if (!isSchoolCode) {
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
          <button
            onClick={() =>
              sendData(props.uid!, code, setIsSchoolCode, setIsError)
            }
          >
            submit
          </button>
          {isError && <div>School not found</div>}
        </motion.div>
      </>
    );
  } else {
    const code = props.schoolId;
    const mySchool = schoolsdata.schools
      .find((a) => a.schoolCode == props.schoolId)
      ?.schoolName.split(", ");
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
          {mySchool?.map((name, index) => (
            <div key={index}>{name}</div>
          ))}
        </div>
      </motion.div>
    );
  }
};

export default schoolCode;
