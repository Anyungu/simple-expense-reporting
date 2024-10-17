"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function googleAuthenticate() {
  try {
    await signIn("google", { callbackUrl: "http://localhost:3000" });
  } catch (error) {
    throw error;
  }
}
