"use server";

import { UserForm } from "./types";
import { adminDb } from "./firebase_admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { STATUS_CODES } from "http";

export async function deleteUser(id: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);
  if (user?.role == "user") {
    return NextResponse.json({ msg: "msg", code: 403 });
  }
  console.log("id", id);

  try {
    await adminDb.collection("users").doc(id).delete();

    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    // You can throw an error here or handle it based on your preference
    throw new Error("Failed to update user");
  }
}

export async function editUser(id: string, formData: UserForm) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "admin") {
    // If user is not logged in or not an admin, return msg response
    return NextResponse.json({ msg: "msg", code: 403 });
  }

  console.log("id", id);
  console.log("formData", formData);
  try {
    await adminDb.collection("users").doc(id).update(formData);

    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}
export async function createUser(formData: UserForm) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ msg: "msg", code: 403 });
  }

  console.log("formData", formData);
  try {
    await adminDb.collection("users").add(formData);

    return true;
  } catch (error) {
    console.error("Error creating user:", error);

    throw new Error("Failed to create user");
  }
}
