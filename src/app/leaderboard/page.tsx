import { prisma } from "@/server/db";
import schoolData from "../schoolData.json";
import { Lexend as Fooont, Poppins } from "next/font/google";

import RefreshButton from "../components/refresh";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
const foont = Fooont({ subsets: ["latin"], weight: ["500"] });

export const revalidate = 0;

const getData = async () => {
  const users = await prisma.user.groupBy({
    by: ["school_id"],
    where: {
      banned: {
        equals: false,
      },
      school_id: {
        not: null,
      },
    },
    _max: {
      score: true,
    },

    orderBy: [
      {
        _max: {
          score: "desc",
        },
      },
    ],
  });
  return users;
};

export default async function Page() {
  if (process.env.END_HUNT == "true") {
    return (
      <main className="flex items-center justify-center bg-black text-white">
        <h1>Hunt has ended</h1>
      </main>
    );
  }
  const data = await getData();
  const max = 60;
  console.log("");
  data.map((school, index) => {
    const name = schoolData.schools.find(
      (a) => a.schoolCode == school.school_id
    )?.schoolName;
    if (name) {
      console.log(
        index,
        name,
        " ".repeat(max - name.length - index.toString().length),
        school._max.score
      );
    }
  });
  console.log("");
  return (
    <>
      <div className={"leaderboard pb-20 " + poppins.className}>
        <span className={"mb-12 text-7xl " + foont.className}>Leaderboard</span>
        {data.map((school: any, index: any) => (
          <div
            className="leaderboard-work mx-36 flex items-center justify-between border-l-2 border-r-2 border-t-2 py-4"
            key={index}
          >
            <div className="border-r-2 px-5 ">{index - 1}</div>
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
