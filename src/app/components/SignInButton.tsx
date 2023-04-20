"use client";
import { signIn } from "next-auth/react";
import {motion} from "framer-motion";


const SignInButton = () => {
  return (
    <motion.button
      onClick={async () => await signIn()}
      className="rounded-lg border-4 border-white bg-transparent px-10 py-2 text-xl text-white transition-all"
      type="button"
      whileHover={{scale:1.2}}
      whileTap={{scale:0.9}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      Sign In
    </motion.button>
  );
};

export default SignInButton;
