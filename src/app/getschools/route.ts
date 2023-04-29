import { prisma } from "@/server/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
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
  const data = await getData();
  return NextResponse.json({ status: 200, data: data });
}
