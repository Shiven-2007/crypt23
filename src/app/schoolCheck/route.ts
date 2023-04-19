import { NextResponse } from "next/server";
import { prisma } from "@/server/db"

const getSchools =async () => {
    const schools = await prisma.school.findMany()

    return schools;
}


export async function POST(req: Request){
    const schoolCode= await req.json()
    const schools = await getSchools()
    console.log(schools,schoolCode)
    // if (schools.includes(schoolCode)){
    //     const update = await prisma.user.update({
    //         where:{
    //             id: uid
    //         },
    //         data:{
    //             school:{
    //                 connect:{
    //                     id: (schools.find((e)=>{e.code == schoolCode} ?? "magic"))
    //                 }
    //             }
    //         }
    //     })
    // }
    return NextResponse.json(true)
}