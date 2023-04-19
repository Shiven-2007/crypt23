import { NextResponse } from "next/server";
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
  } else {
    console.log("not found");
  }
  return NextResponse.json(true);
}
