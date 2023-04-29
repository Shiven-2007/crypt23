import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET(req: Request) {
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

  return NextResponse.json({ status: 200, data: users });
}
