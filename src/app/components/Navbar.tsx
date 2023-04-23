import { getServerAuthSession, getCurrentUser } from "@/server/auth";
import SignInButton from "./SignInButton";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await getServerAuthSession();

  const user = await getCurrentUser();

  if (!!session) {
    return (
      <div className="navbar">
        <LogoutButton />
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <SignInButton />
      </div>
    );
  }
}
