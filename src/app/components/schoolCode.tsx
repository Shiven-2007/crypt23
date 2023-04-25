"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import schoolData from "@/app/schoolData.json";

const VT323Font = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const schoolCode = (props: {
  uid: string | undefined;
  schoolId: string | undefined;
}) => {
  const schoolsdata = schoolData;
  let mySchool = schoolsdata.schools
    .find((a) => a.schoolCode == props.schoolId)
    ?.schoolName.split(", ");

  const [isSchoolCode, setIsSchoolCode] = useState(
    props.schoolId ? true : false
  );
  const [isError, setIsError] = useState(false);
  var nschool: string[];
  const [code, setCode] = useState("");
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
      nschool = schoolsdata.schools
        .find((a) => a.schoolCode == schoolcode)
        ?.schoolName.split(", ")!;
      setIsError(false);
      setIsSchoolCode(true);
    } else {
      setIsError(true);
    }
  }
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
      <div
        className={`flex flex-col justify-around rounded-sm p-5 ${VT323Font.className} school`}
      >
        <div className="school-inp">
          <input
            onChange={change}
            value={code}
          />
          <label>School</label>
        </div>
        {isError && <div>School not found</div>}
        <button
          onClick={() =>
            sendData(props.uid!, code, setIsSchoolCode, setIsError)
          }
          className="school-button"
        >
          SUBMIT
        </button>
      </div>
    );
  } else {
    const code = props.schoolId;
    function displaySchool() {
      return (
        mySchool?.map((name, index) => <div key={index}>{name}</div>) ??
        nschool?.map((name, index) => <div key={index}>{name}</div>)
      );
    }
    return (
      <div
        className={`flex flex-col justify-around rounded bg-zinc-900 p-5 ${VT323Font.className} school`}
      >
        <p className="text-3xl">School Code</p>
        <input
          value={code}
          disabled
          className="bg-neutral-600 p-2 text-lg tracking-widest"
        ></input>
        <div className="w-fit">{displaySchool()}</div>
      </div>
    );
  }
};

export default schoolCode;
