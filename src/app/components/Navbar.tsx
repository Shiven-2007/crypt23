import { getServerAuthSession, getCurrentUser } from "@/server/auth";
import SignInButton from "./SignInButton";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerAuthSession();

  const user = await getCurrentUser();

  if (!!session) {
    return (
      <div className="navbar">
        <Link href={"/leaderboard"} className="nav-item">
          Leaderboard
        </Link>
        <LogoutButton />
      </div>
    );
  } else {
    return (
      <div className="midsignin">
        <SignInButton />
      </div>
    );
  }
}
