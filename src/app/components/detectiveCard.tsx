"use client";
import schoolData from "@/app/schoolData.json";
import Image from "next/image";

const DetectiveCard = (props: any) => {
  const name = schoolData.schools.find(
    (a) => a.schoolCode == props.school_id
  )?.schoolName;
  return (
    <div className="detective-card">
      <div className="detective-image">
        {/* <Image src="/detectivepfp" alt="picture of detective" /> */}
      </div>
      <div className="detective-details">
        <ul>
          <li>Name: {props.name}</li>
          <li>Experience: {props.id[props.id.length - 1]}</li>
          <li>Organisation: {name}</li>
          <li>Contract: ACTIVE</li>
          <li>Investigating: NONE</li>
        </ul>
      </div>
    </div>
  );
};

export default DetectiveCard;
