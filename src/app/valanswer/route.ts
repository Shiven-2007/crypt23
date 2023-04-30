import { prisma } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import answerData from "./validans.json";
import { getCurrentUser } from "@/server/auth";

export async function POST(req: Request) {
  const ans = await req.json();
  async function checkAnswer(levelData: leveldatatype, userAnswer: string) {
    console.log("sheeeeeeeeee", levelData);
    let levelpath: number = parseInt(levelData.level);
    let suspectpath: number = parseInt(levelData.suspect);
    const answer = answerData.answers.find(
      (a) =>
        a.suspectNumber == levelData.suspect && a.levelNumber == levelData.level
    );
    if (answer == undefined) {
      return NextResponse.json({ status: "400" });
    }
    const user = await getCurrentUser();
    const branches = [1, 2, 3];
    console.log("yoyo", answer?.answer, userAnswer);
    console.log("shee", user?.school_id);
    const addAttempt = await prisma.attempt.create({
      data: {
        user: {
          connect: { id: user!.id },
        },
        school: {
          connect: { code: user!.school_id },
        },
        level: user!.level,
        suspect: user!.suspect,
        userAttempt: userAnswer,
      },
    });
    addAttempt;
    if (answer!.answer.indexOf(userAnswer) != -1) {
      if (levelData.level != "5") {
        levelpath = parseInt(levelData.level) + 1;
      } else if (levelData.level == "5") {
        if (levelData.suspect != "4") {
          levelpath = 1;
          suspectpath = Math.ceil(parseInt(levelData.suspect) / 4) * 4;
        } else if (levelData.suspect == "4") {
          levelpath = 1;
          suspectpath =
            answer!.answer.indexOf(userAnswer) +
            1 +
            parseInt(levelData.suspect);
        }
      }
      const updateUser = await prisma.user.update({
        where: {
          id: user!.id,
        },
        data: {
          level: levelpath,
          suspect: suspectpath,
          score: user!.score + 50,
        },
      });
      updateUser;
      return NextResponse.json({
        status: "200",
        redUrl: `/play/${suspectpath}/${levelpath}`,
      });
    } else {
      return NextResponse.json({ status: "400" });
    }
  }

  return checkAnswer(ans.path, ans.answer);
}
