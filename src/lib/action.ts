"use server";

import { UserForm } from "./types";
import { adminDb } from "./firebase_admin";

export async function deleteUser(id: string) {
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

export async function editUser(
  id: string,
  formData: UserForm
): Promise<boolean> {
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
export async function createUser(formData: UserForm): Promise<boolean> {
  console.log("formData", formData);
  try {
    await adminDb.collection("users").add(formData);

    return true;
  } catch (error) {
    console.error("Error creating user:", error);

    throw new Error("Failed to create user");
  }
}
