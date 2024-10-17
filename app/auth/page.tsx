import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import LoginRegisterForm from "./LoginRegisterForm";

type Props = {};

const page = async (props: Props) => {
  const session = await auth();
  console.log(session)
  if (session) redirect("/");
  return (
    <div className=" flex justify-center items-center h-screen">
      <LoginRegisterForm />
    </div>
  );
};

export default page;
