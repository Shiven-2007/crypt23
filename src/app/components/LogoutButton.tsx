"use client";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button onClick={async () => await signOut()} className="nav-item">
      Logout
    </button>
  );
};

export default LogoutButton;
