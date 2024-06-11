"use server";

import { SchoolForm, StudentForm, UserForm, CourseForm } from "./types";
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

//
export async function deleteSchool(id: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);
  if (user?.role == "user") {
    return NextResponse.json({ msg: "msg", code: 403 });
  }
  console.log("id", id);

  try {
    await adminDb.collection("schools").doc(id).delete();

    return true;
  } catch (error) {
    console.error("Error updating school:", error);
    // You can throw an error here or handle it based on your preference
    throw new Error("Failed to update school");
  }
}

export async function editSchool(id: string, formData: SchoolForm) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "admin") {
    // If user is not logged in or not an admin, return msg response
    return NextResponse.json({ msg: "msg", code: 403 });
  }
  console.log("id", id);
  console.log("formData", formData);
  try {
    await adminDb.collection("schools").doc(id).update(formData);

    return true;
  } catch (error) {
    console.error("Error updating school:", error);
    throw new Error("Failed to update school");
  }
}
export async function createSchool(formData: SchoolForm) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ msg: "msg", code: 403 });
  }

  console.log("formData", formData);
  try {
    await adminDb.collection("schools").add(formData);

    return true;
  } catch (error) {
    console.error("Error creating school:", error);

    throw new Error("Failed to create school");
  }
}
//
export async function deleteStudent(id: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);
  if (user?.role == "user") {
    return NextResponse.json({ msg: "msg", code: 403 });
  }
  console.log("id", id);

  try {
    await adminDb.collection("students").doc(id).delete();

    return true;
  } catch (error) {
    console.error("Error updating student:", error);
    // You can throw an error here or handle it based on your preference
    throw new Error("Failed to update student");
  }
}

export async function editStudent(id: string, formData: StudentForm) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "admin") {
    // If user is not logged in or not an admin, return msg response
    return NextResponse.json({ msg: "msg", code: 403 });
  }

  try {
    await adminDb.collection("students").doc(id).update(formData);

    return true;
  } catch (error) {
    console.error("Error updating Student:", error);
    throw new Error("Failed to update Student");
  }
}
export async function createStudent(formData: StudentForm) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ msg: "msg", code: 403 });
  }

  console.log("formData", formData);
  try {
    await adminDb.collection("students").add(formData);

    return true;
  } catch (error) {
    console.error("Error creating Student:", error);

    throw new Error("Failed to create Student");
  }
}
///
export async function deleteCourse(id: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);
  if (user?.role == "user") {
    return NextResponse.json({ msg: "msg", code: 403 });
  }
  console.log("id", id);

  try {
    await adminDb.collection("courses").doc(id).delete();

    return true;
  } catch (error) {
    console.error("Error updating courses:", error);
    // You can throw an error here or handle it based on your preference
    throw new Error("Failed to update courses");
  }
}

export async function editCourse(id: string, formData: CourseForm) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user?.role !== "admin") {
    // If user is not logged in or not an admin, return msg response
    return NextResponse.json({ msg: "msg", code: 403 });
  }

  try {
    await adminDb.collection("courses").doc(id).update(formData);

    return true;
  } catch (error) {
    console.error("Error updating courses:", error);
    throw new Error("Failed to update courses");
  }
}
export async function createCourse(formData: CourseForm) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ msg: "msg", code: 403 });
  }

  console.log("formData", formData);
  try {
    await adminDb.collection("courses").add(formData);

    return true;
  } catch (error) {
    console.error("Error creating courses:", error);

    throw new Error("Failed to create courses");
  }
}
