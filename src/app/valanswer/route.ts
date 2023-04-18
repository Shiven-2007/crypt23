import { prisma } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import answerData from "./validans.json";
import { getCurrentUser } from "@/server/auth";

export async function POST(req: Request) {
  const ans = await req.json();
  async function checkAnswer(
    levelData: leveldatatype,
    userAnswer: string
  ): Promise<boolean> {
    const answer = answerData.answers.find(
      (a) =>
        a.sectionNumber == levelData.section &&
        a.levelNumber == levelData.level &&
        a.branchName == levelData.branch
    );

    const user = await getCurrentUser();
    const branches = ["a", "b", "c"];
    console.log("yoyo", answer?.answer, userAnswer);
    console.log("shee", user?.school_id);
    const addAttempt = await prisma.attempt.create({
      data: {
        user: {
          connect: { id: user!.id },
        },
        school: {
          connect: { id: user!.school_id },
        },
        branch: user!.branch,
        level: user!.level,
        section: user!.section,
        userAttempt: userAnswer,
      },
    });
    addAttempt;
    if (answer!.answer.indexOf(userAnswer) != -1) {
      if (levelData.branch != "d") {
        const updateUser = await prisma.user.update({
          where: {
            id: user!.id,
          },
          data: {
            branch: "d",
          },
        });
        updateUser;
      } else if (levelData.branch == "d") {
        if (levelData.level == "5") {
          const updateUser = await prisma.user.update({
            where: {
              id: user!.id,
            },
            data: {
              level: 1,
              section: parseInt(levelData.section) + 1,
              branch: branches[answer!.answer.indexOf(userAnswer)],
            },
          });
          updateUser;
        } else {
          const updateUser = await prisma.user.update({
            where: {
              id: user!.id,
            },
            data: {
              level: parseInt(levelData.level) + 1,
              branch: branches[answer!.answer.indexOf(userAnswer)],
            },
          });
          updateUser;
        }
      }
      return true;
    } else {
      return false;
    }
  }
  return NextResponse.json(await checkAnswer(ans.path, ans.answer));
}
