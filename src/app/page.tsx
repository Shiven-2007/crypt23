import { prisma } from "@/server/db";
import Navbar from "./components/Navbar";

const getData = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export default async function Page() {
  return (
    <div className="h-screen">
      {/* @ts-expect-error Server Component */}
      <Navbar />
      <div className="flex w-full flex-col">
        {(await getData()).map((user) => (
          <div className="flex">
            <div>{user.name}</div>
            <div>{user.level}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
