"use client";
import { signIn } from "next-auth/react";

const SigninButton = () => (
  <a className="btn btn-ghost align-middle" onClick={() => signIn()}>
    Sign In
  </a>
);
export default SigninButton;
