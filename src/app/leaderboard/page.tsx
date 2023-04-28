import { prisma } from "@/server/db";
import schoolData from "../schoolData.json";
import { Lexend as Fooont, Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const foont = Fooont({ subsets: ["latin"], weight: ["500"] });
const getData = async () => {
  const users = await prisma.user.groupBy({
    by: ["school_id"],
    _avg: {
      score: true,
    },
    orderBy: [
      {
        _avg: {
          score: "desc",
        },
      },
    ],
  });

  return users;
};

export default async function Page() {
  const dat = (await getData()).filter((a) => a.school_id != null);
  return (
    <>
      <div className={"leaderboard " + poppins.className}>
        <span className={"mb-12 text-7xl " + foont.className}>Leaderboard</span>
        {dat.map((school, index) => (
          <div
            className="leaderboard-work mx-36 flex justify-between border-l-2 border-r-2 border-t-2 py-4 align-middle"
            key={index}
          >
            <div className="border-r-2 px-5 ">{index + 1}</div>
            <div>
              {
                schoolData.schools.find((a) => a.schoolCode == school.school_id)
                  ?.schoolName
              }
            </div>
            <div className="px-5">{school._avg.score}</div>
          </div>
        ))}
      </div>
    </>
  );
}
