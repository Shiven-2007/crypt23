"use client";
import { useRouter } from "next/navigation";

interface Props {
  status: boolean;
  setStatus: any;
  redUrl: string;
}

const NextButton = ({ redUrl, status, setStatus }: Props) => {
  const router = useRouter();
  if (status == true) {
    return (
      <button
        onClick={(e) => {
          router.push(redUrl);
          setStatus("");
        }}
      >
        NEXT LEVEL
      </button>
    );
  }
  return <></>;
};

export default NextButton;
