import { NextResponse } from "next/server";
import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@/server/db";

const getSchools = async () => {
  const schools = await prisma.school.findMany();

  return schools;
};

export async function POST(req: NextApiRequest, res:NextApiResponse) {
  const { uid, code } = await req.body;
  const schools = await getSchools();
  console.log(uid, code);
  if (schools.some((e) => e.code == code)) {
    const update = await prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        school: {
          connect: {
            code: code,
          },
        },
      },
    });
    update;
  return res.status(200)
  } else {
    console.log("not found");
    return res.status(500);
  }
}
