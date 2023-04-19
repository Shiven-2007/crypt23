import { getServerAuthSession, getCurrentUser } from "@/server/auth";
import Link from "next/link";
import SignInButton from "./SignInButton";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await getServerAuthSession();

  const user = await getCurrentUser();

  if (!!session) {
    return (
      <>
        <LogoutButton />
      </>
    );
  } else {
    return (
      <>
        <SignInButton />
      </>
    );
  }
}
