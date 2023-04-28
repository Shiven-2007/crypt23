import Level from "../../../components/LevelData";
import { getServerAuthSession, getCurrentUser } from "@/server/auth";
import Link from "next/link";
import levels from "@/app/leveldat.json";

export default async function Page({ params }: { params: leveldatatype }) {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <main>
        Not logged in
        <Link href="/">Home</Link>
      </main>
    );
  }
  const user = await getCurrentUser();
  const level = params.level;
  const suspect = params.suspect;
  const levelData: leveldatatype = {
    level: level,
    suspect: suspect,
  };

  interface questionResult {
    question: string;
    comm: string;
    image: string | null;
  }

  function getQuestion(ldat: leveldatatype): questionResult {
    const quiz = levels;
    const suspect = quiz.suspects.find((s) => s.suspectNumber === ldat.suspect);
    if (suspect) {
      const level = suspect.levels.find(
        (l) => l.levelNumber === levelData.level
      );
      if (level) {
        return {
          question: level.question,
          comm: level.hint,
          image: level.image,
        };
      }
    }
    return {
      question: "could not fetch question",
      comm: "could not fetch comment hint",
      image: null,
    };
  }
  const { question: q, comm: h, image: i } = getQuestion(levelData);
  return (
    <div className="flex h-full items-center justify-center">
      <Level mainHint={q} commentHint={h} ldata={levelData} img={i} />
    </div>
  );
}
