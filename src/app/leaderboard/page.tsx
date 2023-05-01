import { prisma } from "@/server/db";
import schoolData from "../schoolData.json";
import { Lexend as Fooont, Poppins } from "next/font/google";

import RefreshButton from "../components/refresh";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const foont = Fooont({ subsets: ["latin"], weight: ["500"] });

export default async function Page() {
  const data = [
    { _max: { score: 1000 }, school_id: "875389" },
    { _max: { score: 1000 }, school_id: "081947" },
    { _max: { score: 950 }, school_id: "879335" },
    { _max: { score: 900 }, school_id: "825265" },
    { _max: { score: 850 }, school_id: "704944" },
    { _max: { score: 850 }, school_id: "726827" },
    { _max: { score: 800 }, school_id: "681316" },
    { _max: { score: 800 }, school_id: "797995" },
    { _max: { score: 750 }, school_id: "150476" },
    { _max: { score: 750 }, school_id: "661879" },
    { _max: { score: 700 }, school_id: "549314" },
    { _max: { score: 700 }, school_id: "561598" },
    { _max: { score: 700 }, school_id: "555163" },
    { _max: { score: 600 }, school_id: "372028" },
    { _max: { score: 500 }, school_id: "949163" },
    { _max: { score: 450 }, school_id: "666688" },
    { _max: { score: 450 }, school_id: "082600" },
    { _max: { score: 350 }, school_id: "800851" },
    { _max: { score: 350 }, school_id: "901234" },
    { _max: { score: 250 }, school_id: "258205" },
    { _max: { score: 250 }, school_id: "567890" },
    { _max: { score: 100 }, school_id: "194655" },
    { _max: { score: 50 }, school_id: "945714" },
    { _max: { score: 50 }, school_id: "456789" },
    { _max: { score: 50 }, school_id: "123456" },
    { _max: { score: 0 }, school_id: "678901" },
    { _max: { score: 0 }, school_id: "500231" },
    { _max: { score: 0 }, school_id: "890123" },
    { _max: { score: 0 }, school_id: "783203" },
  ];
  return (
    <>
      <div className={"leaderboard pb-20 " + poppins.className}>
        <span className={"mb-12 text-7xl " + foont.className}>Leaderboard</span>
        {data.map((school: any, index: any) => (
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
