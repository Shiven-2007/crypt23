import { User } from "next-auth";
import Navbar from "./components/Navbar";
import SchoolCode from "./components/schoolCode";
import { getCurrentUser } from "@/server/auth";
import Text from "./components/text";
import Countdown from "./components/countdown";
import Bg from "./components/bg";

export default async function Page() {
  const user = await getCurrentUser();
  if (!!user) {
    if (user.banned) {
      return (
        <div className="hpage  h-full w-full bg-transparent text-white">
          <Text str="CRYPT@TRIX" />
          <h1 className="text-center text-3xl">You have been banned</h1>
          <Bg />
        </div>
      );
    }
  }
  const endDate = new Date("2023-05-01T00:00:00.000Z");
  if (Date.now() > endDate.getTime()) {
    return (
      <div className="flex h-full items-center justify-center bg-black text-white">
        <h1>The hunt has ended</h1>
        <p>Stay tuned for the final leaderboard</p>
        <p>Thank you for playing!</p>
      </div>
    );
  }

  return (
    <div className="hpage  h-full w-full bg-transparent text-white">
      {/* @ts-expect-error Async Server Component */}
      <Navbar />
      <Text str="CRYPT@TRIX" />
      {user ? <SchoolCode user={user} /> : <></>}
      <Countdown user={user} />
      <Bg />
    </div>
  );
}
