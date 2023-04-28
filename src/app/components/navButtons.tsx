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
        className="rounded-full bg-red-800 p-3 px-20 transition ease-in-out hover:bg-red-700"
      >
        NEXT LEVEL
      </button>
    );
  }
  return <></>;
};

export default NextButton;
