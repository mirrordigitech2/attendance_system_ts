"use client";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./user.module.scss";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

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
import { useEffect, useState } from "react";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "idNum",
    header: "Identity",
  },
  {
    accessorKey: "school",
    header: "Schools",
  },
  {
    accessorKey: "courses",
    header: "Courses",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },

  {
    accessorKey: "action",
    header: "Action",
  },
];

interface User {
  name: string;
  email: string;
  school: string;
  courses: string;
  phone: number;
  idNum: number;
  role: string;
}

type Props = {};

export default function Userpage({}: Props) {
  //state
  const [users, setUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  //defining zod schema for form input validation
  const schema: ZodType<User> = z.object({
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

  //submit data to firebase after passing the zod validation successfully
  const submitData = async (data: User) => {
    try {
      await addDoc(collection(db, "usersTest"), { ...data }); //TODO: change 'usersTest' to users collection
      console.log("Document added successfully");
      getUsers();
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  //get all user data (table data)
  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usersTest")); //TODO: change 'usersTest' to users collection
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        const userInfo: User = {
          name: doc.data().name,
          email: doc.data().email,
          school: doc.data().school,
          courses: doc.data().courses,
          phone: doc.data().phone,
          idNum: doc.data().idNum,
          role: doc.data().role,
        };
        users.push(userInfo);
      });
      setUsers(users);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <PageTitle title="User Page" />
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
          <div className={`${styles.formContainer} m-3`}>
            <form onSubmit={handleSubmit(submitData)}>
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

      <div className="container mx-auto py-10 m-3 w-full">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}
