"use client";

// import { useAuthContext } from "../../app/context/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
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
import { z } from "zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";

type FormData = {
  email: string;
  password: string;
};
const LoginForm = () => {
  // const { validateUser } = useAuthContext();
  const [error, setError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  // const { pending } = useFormStatus();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // get the form data
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log({ email, password });
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
      redirect: false,
    });
    console.log("res", res);

    if (res?.status === 200 && res?.ok) {
      router.replace("/dashboard");
    }
    if (res?.status === 401) {
      if (res?.error === "Credentials Sign in") {
        setErrorMessage("invalid credentials");
      } else {
        setErrorMessage(res?.error || "");
      }
    }

    console.log(res?.status);
  };

  return (
    <CardWrapper label="Login to your account" title="Login">
      {errorMessage && (
        <div className="w-full max-w-sm mb-4 p-2">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
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
