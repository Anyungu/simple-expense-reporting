"use client";

import React from "react";
import LoginInputForm from "./components/LoginInputForm";
import { GoogleIcon } from "./components/GoogleIcon";
import { signIn } from "next-auth/react";

type Props = {};

const LoginRegisterForm = ({}: Props) => {
  return (
    <div className=" bg-white rounded-lg py-12 px-10 shadow-lg space-y-10">
      {/* Login HeADER/LOGO + login symbols */}
      <div className=" text-center">
        <p className=" text-3xl font-bold">Login</p>
      </div>

      {/* Login Inputs + forgot password*/}
      {/* Login button */}
      <div className="w-72">
        <LoginInputForm />
      </div>

      {/* or sign up using */}
      <div className=" space-y-32">
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
        <div className=" space-y-2">
          <div className=" text-center">
            <p className=" text-xs">New here? Sign Up Using</p>
          </div>
          <div className=" flex flex-row justify-center gap-4">
            <div className=" hover:cursor-pointer">
              <p className=" text-xs uppercase"> Password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
