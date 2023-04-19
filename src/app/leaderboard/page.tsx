import { prisma } from "@/server/db";


const getData = async () => {
    const users = await prisma.user.findMany();
  
    return users;
  };

export default async function Page(){
    <div className="flex w-full flex-col">
        {(await getData()).map((user) => (
          <div className="flex align-middle justify-evenly">
            <div>{user.name}</div>
            <div>{user.level}</div>
          </div>
        ))}
    </div>
    }