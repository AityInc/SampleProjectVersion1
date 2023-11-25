"use client";
import { signOut } from "next-auth/react";

const SignoutButton = () => <a onClick={() => signOut()}>Sign out</a>;
export default SignoutButton;
