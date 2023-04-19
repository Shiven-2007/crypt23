import { getServerAuthSession, getCurrentUser } from "@/server/auth";
import Link from "next/link";
import SignInButton from "./SignInButton";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await getServerAuthSession();

  // console.log(session)

  const user = await getCurrentUser();

  //console.log(user);
  if (!!session) {
    return (
      <>
      <nav className="flex items-center justify-evenly bg-blue-500 p-6">
        <Link href="/">Home</Link>
        <LogoutButton />
      </nav>
      </>
    );
  }
  else {return (
    <>
    <nav className="flex items-center justify-evenly bg-blue-500 p-6">
      <Link href="/">Home</Link>
      <SignInButton />
    </nav>
    </>
  );}
}


