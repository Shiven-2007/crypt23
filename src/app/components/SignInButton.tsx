"use client";
import { signIn } from "next-auth/react";

const SignInButton = () => {
  return <button onClick={async () => await signIn()}>Sign In</button>;
};

export default SignInButton;
