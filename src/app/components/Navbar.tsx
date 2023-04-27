import { getServerAuthSession, getCurrentUser } from "@/server/auth";
import SignInButton from "./SignInButton";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { Poppins as f1 } from "next/font/google";

const poppins = f1({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function Navbar() {
  const session = await getServerAuthSession();

  const user = await getCurrentUser();
  if (!!session) {
    return (
      <div className={"navbar " + poppins.className}>
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
