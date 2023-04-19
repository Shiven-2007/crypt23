"use client";
import { signIn } from "next-auth/react";



const SignInButton = () => {
  return (
    <button
      onClick={async () => await signIn()}
      className="rounded-lg border-4 border-white bg-transparent px-10 py-2 text-xl text-white transition-all"
      type="button"
    >
      Sign In
    </button>
  );
};

export default SignInButton;
