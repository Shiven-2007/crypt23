import { NextResponse } from "next/server";
import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@/server/db";

const getSchools = async () => {
  const schools = await prisma.school.findMany();

  return schools;
};

export async function POST(req: Request) {
  const { uid, code } = await req.json();
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
    return NextResponse.json({ status: "200" });
  } else {
    return NextResponse.json({ status: "400", message: "School not found" });
  }
}
