"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { any, z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { Button } from "./ui/button";
import { db } from "@/app/firebase";

type Props = {};
interface User {
  id: string;
  name: string;
  email: string;
  school: string;
  courses: string;
  phone: number;
  idNum: number;
  role: string;
}

export const FormDrawer = (props: Props) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const submitData = async (data: User) => {
    try {
      await addDoc(collection(db, "usersTest"), { ...data }); //TODO: change 'usersTest' to users collection
      console.log("Document added successfully");
      //   getUsers();
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const schema: ZodType<User> = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Name is required!" }),
    email: z.string().email(),
    school: z.string().min(1, { message: "School is required!" }),
    courses: z.string().min(1, { message: "Course is required!" }),
    phone: z
      .number({ invalid_type_error: "Phone Number is required" })
      .positive()
      .refine(
        (value) => {
          const stringValue = String(value);
          return stringValue.length === 10 && /^\d+$/.test(stringValue);
        },
        {
          message: "Phone Number must be a 10-digit number",
        }
      ),
    idNum: z
      .number({ invalid_type_error: "ID Number is required" })
      .positive()
      .refine(
        (value) => {
          const stringValue = String(value);
          return stringValue.length === 9 && /^\d+$/.test(stringValue);
        },
        {
          message: "ID Number must be a 9-digit number",
        }
      ),
    role: z.string(),
  });

  //using react hook form and passing the zod schema to it
  //register function used to link the input data to the schema object
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });

  //this function returns the first error only and show it in one place instead of showing multiple errors together
  const getError = (): string | undefined => {
    if (errors.name) return errors.name.message;
    else if (errors.email) return errors.email.message;
    else if (errors.school) return errors.school.message;
    else if (errors.courses) return errors.courses.message;
    else if (errors.phone) return errors.phone.message;
    else if (errors.idNum) return errors.idNum.message;
    else if (errors.role) return errors.role.message;
    else return "";
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger
        onClick={() => setIsDrawerOpen(true)}
        className="m-3 p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 border border-input bg-background"
      >
        Add User
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New User</DrawerTitle>
        </DrawerHeader>
        <div className={` m-3`}>
          <form onSubmit={handleSubmit(submitData)}>
            <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1 mt-2">
              ID
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("id")}
            />
            <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1 mt-2">
              Name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("name")}
            />
            <label className="text-sm font-medium text-gray-900 dark:text-white p-1 mr-1 mt-2">
              Email
            </label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email@domain.com"
              {...register("email")}
            />
            <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1">
              School
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("school")}
            />
            <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1">
              Courses
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("courses")}
            />
            <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1">
              Phone Number
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("phone", { valueAsNumber: true })}
            />
            <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1">
              ID
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("idNum", { valueAsNumber: true })}
            />
            <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1">
              Admin/User
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("role")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            \00 \{" "}
            {getError() !== "" && (
              <p className="text-orange-800 text-center mt-3 mb-2">
                {getError()}
              </p>
            )}
          </form>
        </div>

        <DrawerFooter>
          <Button onClick={handleSubmit(submitData)}>Submit</Button>
          <DrawerClose onClick={() => setIsDrawerOpen(false)}>
            Cancel
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
