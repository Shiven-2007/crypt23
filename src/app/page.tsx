import { User } from "next-auth";
import Navbar from "./components/Navbar";
import SchoolCode from "./components/schoolCode";
import { getCurrentUser } from "@/server/auth";
import Text from "./components/text";
import Countdown from "./components/countdown";
import Bg from "./components/bg";

export default async function Page() {
  const user = await getCurrentUser();
  if user.banned {
    return (
      <div className="hpage  h-full w-full bg-transparent text-white">
      <Text str="CRYPT@TRIX" />
      <h1 className="text-3xl text-center">You have been banned</h1>
      <Bg />
    </div>
    )
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
