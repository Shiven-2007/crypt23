import { prisma } from "@/server/db";
import schoolData from "../schoolData.json";
import { Lexend as Fooont, Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const foont = Fooont({ subsets: ["latin"], weight: ["500"] });

export default async function Page() {
  const getDataa = async () => {
    const call = await fetch("/transformers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return call.json();
  };
  let data1 = (await getDataa()).data;
  console.log(data1);
  return (
    <>
      <div className={"leaderboard pb-20 " + poppins.className}>
        <span className={"mb-12 text-7xl " + foont.className}>Leaderboard</span>
        {data1.map((school: any, index: any) => (
          <div
            className="leaderboard-work mx-36 flex items-center justify-between border-l-2 border-r-2 border-t-2 py-4"
            key={index}
          >
            <div className="border-r-2 px-5 ">{index + 1}</div>
            <div>
              {
                schoolData.schools.find((a) => a.schoolCode == school.school_id)
                  ?.schoolName
              }
            </div>
            <div className="flex w-32 items-center justify-center px-5">
              {school._max.score}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
