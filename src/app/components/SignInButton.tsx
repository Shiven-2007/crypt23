"use client";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <button
      onClick={async () => await signIn("discord")}
      className="signin"
      type="button"
    >
      SIGN IN
    </button>
  );
};

export default SignInButton;
