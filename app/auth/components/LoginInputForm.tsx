"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
});

type Props = {};

const LoginInputForm = ({}: Props) => {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const router = useRouter();
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoggingIn(true);
    await signIn("credentials", {
      redirect: true,
      redirectTo: "/",
      ...values,
    });

    setLoggingIn(false);
  }
  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" hidden laptop:block">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Type your email"
                  {...field}
                  className=" focus-visible:ring-0 border-0 border-b border-slate-300 rounded-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" space-y-1">
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" hidden laptop:block">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                    className=" focus-visible:ring-0 border-0 border-b border-slate-300 rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" text-right">
            <p className=" text-xs">Forgot password?</p>
          </div>
        </div>
        <Button
          className="rounded-3xl w-full uppercase bg-gradient-to-r from-[#93C5FD] to-[#D8B4FE] font-semibold"
          type="submit"
        >
          <Loader2
            className={`mr-2 h-4 w-4 animate-spin ${
              loggingIn ? "block" : "hidden"
            } `}
          />
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginInputForm;
