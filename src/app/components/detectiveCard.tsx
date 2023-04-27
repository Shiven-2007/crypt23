"use client";
import schoolData from "@/app/schoolData.json";
import Image from "next/image";
import { Poppins as myfont } from "next/font/google";

const inconsolata = myfont({ subsets: ["latin"], weight: ["400"] });

const DetectiveCard = (props: any) => {
  console.log(props);
  const name = schoolData.schools.find(
    (a) => a.schoolCode == props.school_id
  )?.schoolName;
  return (
    <div className={"detective-card " + inconsolata.className}>
      <div className="detective-image">
        <Image
          src="https://cdn.discordapp.com/attachments/853945044188135425/1100828195604934827/detective.png"
          alt="picture of detective"
          width={300}
          height={300}
        />
      </div>
      <div className="detective-details">
        <ul>
          <li>Name: {props.name}</li>
          <li>Experience: {props.id[props.id.length - 1]}</li>
          <li className="org">
            <div className="org-container">
              Organisation: <div className="ml-3">{name}</div>
            </div>
          </li>
          <li>Contract: ACTIVE</li>
          <li>Investigating: {`Suspect #1`}</li>
        </ul>
      </div>
    </div>
  );
};

export default DetectiveCard;
