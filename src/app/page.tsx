import { User } from "next-auth";
import Navbar from "./components/Navbar";
import SchoolCode from "./components/schoolCode";
import { getCurrentUser } from "@/server/auth";
import Text from "./components/text";
import Countdown from "./components/countdown";

export default async function Page() {
  const user = await getCurrentUser();
  return (
    <div className="hpage  h-full w-full bg-black text-white">
      {/* @ts-expect-error Async Server Component */}
      <Navbar />
      <Text str="CRYPT@TRIX" />
      <SchoolCode user={user} />
      <Countdown />
    </div>
  );
}
