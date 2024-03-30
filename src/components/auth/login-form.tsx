"use client";

import { useAuthContext } from "../../context/auth";

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { LoginSchema } from "@/app/(auth)/login/utils/valedation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const { validateUser } = useAuthContext();
  const [error, setError] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
  });

  //   const onSubmit = (data: z.infer<typeof LoginSchema>) => {
  //     console.log(data);
  //   };
  const submitData = (data: FormData) => {
    // console.log("IT worked", data);
    // router.push("/dashboard");
    const { email, password } = data;
    console.log(data.email);

    validateUser(email, password)
      .then((res: any) => {
        if (res == true) {
          console.log("User logged in successfully");
          setError("");
          router.push("/dashboard");
        } else {
          console.log("Incorrect Email or Password!");
          setError("Incorrect Email or Password!");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const router = useRouter();

  return (
    <CardWrapper label="Login to your account" title="Login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitData)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="****" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
