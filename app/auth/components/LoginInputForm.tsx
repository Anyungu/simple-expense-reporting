"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
});

type Props = {};

const LoginInputForm = ({}: Props) => {
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
          <div className=" text-right">
            <p className=" text-xs">Forgot password?</p>
          </div>
        </div>
        <Button
          className="rounded-3xl w-full uppercase bg-gradient-to-r from-[#93C5FD] to-[#D8B4FE] font-semibold"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginInputForm;
