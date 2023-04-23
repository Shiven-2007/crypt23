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
  const section = params.section;
  const levelData: leveldatatype = {
    section: section,
    level: level,
    branch: user!.branch,
  };
  if (isNaN(Number(level)) || Number(level) > 5) {
    return <main>Incorrect URL</main>;
  } else if (Number(section) > user!.section) {
    return (
      <main>
        You have not reached this section yet
        <Link href={`/play/${user!.section}/${user!.level}`}>
          Go to current level
        </Link>
      </main>
    );
  } else if (Number(level) > user!.level) {
    return (
      <main>
        You have not reached this section yet
        <Link href={`/play/${user!.section}/${user!.level}`}>
          Go to current level
        </Link>
      </main>
    );
  }
  interface questionResult {
    question: string;
    comm: string;
  }

  function getQuestion(ldat: leveldatatype): questionResult {
    const quiz = levels;
    const section = quiz.sections.find((s) => s.sectionNumber === ldat.section);
    if (section) {
      const level = section.levels.find(
        (l) => l.levelNumber === levelData.level
      );
      if (level) {
        const branch = level.branches.find(
          (b) => b.branchName === levelData.branch
        );
        if (branch) {
          return { question: branch.question, comm: branch.hint };
        }
      }
    }
    return {
      question: "could not fetch question",
      comm: "could not fetch comment hint",
    };
  }
  const { question: q, comm: h } = getQuestion(levelData);
  return (
    <div className="flex h-full items-center justify-center">
      <Level mainHint={q} commentHint={h} ldata={levelData} />
    </div>
  );
}
