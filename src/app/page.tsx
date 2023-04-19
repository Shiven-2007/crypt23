import { User } from "next-auth";
import Navbar from "./components/Navbar";
import SchoolCode from "./components/schoolCode";
import { getCurrentUser } from "@/server/auth";


export default async function Page() {
  const user: User = await getCurrentUser()
  console.log(user)
  return (
    <div className="h-screen flex justify-center flex-col">
      {/* @ts-expect-error Async Server Component */}
      <Navbar />
      <SchoolCode user={user}/>
    </div>
  );
}
