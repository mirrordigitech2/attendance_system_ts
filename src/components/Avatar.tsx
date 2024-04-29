"use client";
import { useSession } from "next-auth/react";

type Props = {};

export default function Avatar({}: Props) {
  const session = useSession();
  console.log(session);
  if (session?.status == "unauthenticated") {
    return null;
  }

  const user = session?.data?.user;
  console.log("user", user);
  return <div>Avatar</div>;
}
