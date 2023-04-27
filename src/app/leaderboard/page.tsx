import { prisma } from "@/server/db";
import schoolData from "../schoolData.json";
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
      <div className="leaderboard">
        Leaderboard
        {dat.map((school, index) => (
          <div className="flex justify-evenly align-middle" key={index}>
            <div>
              {
                schoolData.schools.find((a) => a.schoolCode == school.school_id)
                  ?.schoolName
              }
            </div>
            <div>{school._avg.score}</div>
          </div>
        ))}
      </div>
    </>
  );
}
