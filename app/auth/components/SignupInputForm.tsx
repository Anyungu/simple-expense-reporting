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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4).max(50),
    confirm: z.string().min(4).max(50),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

type Props = {};

const SignupInputForm = ({}: Props) => {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoggingIn(true);
    const res = await signIn("credentials", {
      redirect: false,
      ...values,
    });

    if (res?.error) {
      setError("This account already exists");
      setLoggingIn(false);

      return;
    }

    router.push("/");
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

        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" hidden laptop:block">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Type your password"
                  {...field}
                  className=" focus-visible:ring-0 border-0 border-b border-slate-300 rounded-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={loginForm.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" hidden laptop:block">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Type your password"
                  {...field}
                  className=" focus-visible:ring-0 border-0 border-b border-slate-300 rounded-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {error && (
            <div className=" text-red-500 text-xs text-center">{error}</div>
          )}
          <Button
            className="rounded-3xl w-full uppercase bg-gradient-to-r from-[#93C5FD] to-[#D8B4FE] font-semibold"
            type="submit"
            disabled={loggingIn}
          >
            <Loader2
              className={`mr-2 h-4 w-4 animate-spin ${
                loggingIn ? "block" : "hidden"
              } `}
            />
            {loggingIn ? "Signing Up..." : "Sign Up"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupInputForm;
