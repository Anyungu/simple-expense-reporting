"use client";

import React, { useState } from "react";
import LoginInputForm from "./components/LoginInputForm";
import { GoogleIcon } from "./components/GoogleIcon";
import { signIn } from "next-auth/react";
import SignupInputForm from "./components/SignupInputForm";

type Props = {};

const LoginRegisterForm = ({}: Props) => {
  const [authPage, setAuthPage] = useState<"login" | "signup">("login");
  return (
    <div className=" bg-white rounded-lg py-14 laptop:py-12 px-10 shadow-lg space-y-14 laptop:space-y-10">
      {/* Login HeADER/LOGO + login symbols */}
      <div className=" text-center">
        <p className=" text-3xl font-bold">
          {authPage === "login" ? "Login" : "Sign Up"}
        </p>
      </div>

      {/* Login Inputs + forgot password*/}
      {/* Login button */}
      <div className="w-72">
        {authPage === "login" ? <LoginInputForm /> : <SignupInputForm />}
      </div>

      {/* or sign up using */}
      <div className=" space-y-16 laptop:space-y-32">
        <div className=" space-y-4">
          <div className=" text-center">
            <p className=" text-xs">Or use</p>
          </div>
          <div
            onClick={() => {
              signIn("google", { redirectTo: "/" });
            }}
            className=" w-full flex  flex-row justify-center hover:cursor-pointer"
          >
            <GoogleIcon className="w-5 h-5" />
          </div>
        </div>

        {/* or sign up using form */}
        {authPage === "login" && (
          <div className=" space-y-2">
            <div className=" flex flex-row items-center justify-center space-x-2">
              <p className=" text-xs">New here? </p>
              <p
                className=" text-xs underline hover:cursor-pointer"
                onClick={() => setAuthPage("signup")}
              >
                SIGN UP
              </p>
            </div>
          </div>
        )}

        {authPage === "signup" && (
          <div className=" space-y-2">
            <div className=" flex flex-row items-center justify-center space-x-2">
              <p className=" text-xs">Have an account? </p>
              <p
                className=" text-xs underline hover:cursor-pointer"
                onClick={() => setAuthPage("login")}
              >
                LOG IN
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterForm;
