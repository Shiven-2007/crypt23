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
      if (parseInt(levelData.suspect) % 4 != 0) {
        suspectpath = Math.ceil(parseInt(levelData.suspect) / 4) * 4;
      } else if (parseInt(levelData.suspect) % 4 == 0) {
        if (levelData.level == "5") {
          levelpath = 1;
          suspectpath =
            parseInt(levelData.suspect) +
            answer!.answer.indexOf(userAnswer) +
            1;
        } else {
          levelpath = parseInt(levelData.level) + 1;
        }
      }
      const updateUser = await prisma.user.update({
        where: {
          id: user!.id,
        },
        data: {
          level: levelpath,
          suspect: suspectpath,
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
