"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AuthHeader from "./auth-header";

interface CardWrapperProps {
  label: string;
  title: string;
  children: React.ReactNode;
}

const CardWrapper = ({ label, title, children }: CardWrapperProps) => {
  return (
    <Card className=" w-full max-w-sm">
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>{" "}
      <CardContent>{children}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CardWrapper;
