"use client";
import { useRef, useState } from "react";

import { Raleway } from "next/font/google";
import schoolData from "@/app/schoolData.json";

import DetectiveCard from "./detectiveCard";

const VT323Font = Raleway({
  subsets: ["latin"],
  weight: "400",
});

const schoolCode = ({ user }: any) => {
  const school = useRef(user.school_id);
  const schoolsdata = schoolData;
  let mySchool = schoolsdata.schools
    .find((a) => a.schoolCode == school.current)
    ?.schoolName.split(", ");
  const [glowColor, setGlowColor] = useState("#1bc7fb");
  const [isSchoolCode, setIsSchoolCode] = useState(
    user.school_id ? true : false
  );
  const [isError, setIsError] = useState(false);
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
      setIsError(false);
      setIsSchoolCode(true);
      school.current = schoolcode;
    } else {
      document.documentElement.style.setProperty("--glowcolor", "#e32020");
      setIsError(true);
      setCode("");
    }
  }
  if (!user.id) return <></>;
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
      if (text.length == 6) {
        document.documentElement.style.setProperty("--glowcolor", "#24ed4c");
      } else {
        document.documentElement.style.setProperty("--glowcolor", "#1bc7fb");
      }
      if (status) {
        setCode(text);
        setIsError(false);
      }
    };
    return (
      <div className={`${VT323Font.className} school`}>
        <div className="school-inp">
          <input
            onChange={change}
            value={code}
            placeholder="School Code"
            maxLength={6}
          />
          <button
            onClick={() =>
              sendData(user.id!, code, setIsSchoolCode, setIsError)
            }
            className="school-button"
          >
            SUBMIT
          </button>
        </div>
        {isError && <div className="school-error">School not found</div>}
      </div>
    );
  } else {
    return <DetectiveCard {...user} />;
  }
};

export default schoolCode;
