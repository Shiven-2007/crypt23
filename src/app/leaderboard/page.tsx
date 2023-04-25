import { prisma } from "@/server/db";

const getData = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export default async function Page() {
  return (
    <div className="flex w-full flex-col">
      leaderboard
      {(await getData()).map((user, index) => (
        <div className="flex justify-evenly align-middle" key={index}>
          <div>{user.name}</div>
          <div>{user.level}</div>
        </div>
      ))}
    </div>
  );
}
