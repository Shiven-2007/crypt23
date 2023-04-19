import { User } from "next-auth";
import Navbar from "./components/Navbar";
import SchoolCode from "./components/schoolCode";
import { getCurrentUser } from "@/server/auth";

export default async function Page() {
  const user = await getCurrentUser();
  console.log(user);
  const obj = {
    uid: user?.id,
    schoolId: user?.school_id,
  };
  return (
    <div className="flex h-screen flex-col justify-center">
      {/* @ts-expect-error Async Server Component */}
      <Navbar />
      <SchoolCode {...obj} />
    </div>
  );
}
