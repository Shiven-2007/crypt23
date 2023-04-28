import Level from "../../../components/LevelData";
import { getServerAuthSession, getCurrentUser } from "@/server/auth";
import Link from "next/link";
import levels from "@/app/leveldat.json";

export default async function Page({ params }: { params: leveldatatype }) {
  const session = await getServerAuthSession();

  if (!session || !session.user.school_id) {
    return (
      <main>
        Not logged in
        <Link href="/">Home</Link>
      </main>
    );
  } else if (!session.user.school_id) {
    return (
      <main>
        School code not set
        <Link href="/">Home</Link>
      </main>
    );
  } else if (
    session.user.level != parseInt(params.level) ||
    session.user.suspect != parseInt(params.suspect)
  ) {
    return (
      <main>
        You are not on this level
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
    comm: string | null;
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
    <div className="flex h-full items-center justify-center bg-black">
      <Level mainHint={q} commentHint={h} ldata={levelData} img={i} />
    </div>
  );
}
