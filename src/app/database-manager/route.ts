import { prisma } from "@/server/db";
import correctAttempts from "../valanswer/validans.json";

async function seedCorrectAttempts() {
  try {
    for (const attempt of correctAttempts.answers) {
      await prisma.correctAttempt.create({
        data: {
          suspect: parseInt(attempt.suspectNumber),
          level: parseInt(attempt.levelNumber),
          attempt: attempt.answer[0] ?? "",
        },
      });
    }
    console.log("Successfully seeded CorrectAttempt table");
  } catch (error) {
    console.error("Error seeding CorrectAttempt table:", error);
  }
}

seedCorrectAttempts();
