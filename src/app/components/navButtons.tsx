"use client";
import { useRouter } from "next/navigation";

interface Props {
  levelData: leveldatatype;
  status: boolean;
  fn: any;
  fn2: any;
}

const NextButton = ({
  levelData: { section, level, branch },
  status,
  fn,
  fn2,
}: Props) => {
  const router = useRouter();
  if (status == true) {
    let redUrl = `play/${section}/${parseInt(level) + 1}`;
    if (branch == "d") {
      if (level == "5") {
        redUrl = `play/${parseInt(section) + 1}/1`;
      } else {
        redUrl = `play/${section}/${parseInt(level) + 1}`;
      }
    }
    if (branch != "d") {
      redUrl = `play/${section}/${level}`;
    }
    return (
      <button
        onClick={(e) => {
          router.push(redUrl);
          fn("");
          fn2("false");
        }}
      >
        NEXT LEVEL
      </button>
    );
  }
  return <></>;
};

export default NextButton;
