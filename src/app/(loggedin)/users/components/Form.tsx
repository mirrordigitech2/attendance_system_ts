"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserForm } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { UserSchema } from "../utils/validation";
import { useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onClose: () => void;
  item?: User | null;
};

export const FormUsers = (props: Props) => {
  const itemId = props.item?.id;
  // console.log(props.item);

  //using react hook form and passing the zod schema to it
  //register function used to link the input data to the schema object

  const form = useForm<UserForm>({
    resolver: zodResolver(UserSchema),
    ...(props.item && { values: { ...props.item } }),
  });

  // const {

  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<UserForm>({
  //   resolver: zodResolver(UserSchema),
  //   ...(props.item && { values: { ...props.item } }),
  // });
  // const getError = (): string | undefined => {
  //   if (errors.name) return errors.name.message;
  //   else if (errors.email) return errors.email.message;
  //   else if (errors.school) return errors.school.message;
  //   else if (errors.courses) return errors.courses.message;
  //   else if (errors.phone) return errors.phone.message;
  //   else if (errors.idNum) return errors.idNum.message;
  //   else if (errors.role) return errors.role.message;
  //   else return "";
  // };

  const submitData = async (data: UserForm) => {
    try {
      if (itemId) {
        //editDoc
        await setDoc(doc(db, "users", itemId), { ...data }).then(() => {
          console.log("Document updated successfully");
        });
      } else {
        await addDoc(collection(db, "users"), { ...data }).then(() => {
          console.log("Document added successfully");
        });
      }
      props.onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitData)} className="">
          <div className="grid grid-cols-3 pb-2 mt-1  space-x-2 w-90">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      placeholder="email@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schools</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Courses</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => {
                // console.log(field);
                return (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="idNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder=""
                      // {...register("idNum", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder=" Admin/User"></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>

    // <main>
    //   <form onSubmit={handleSubmit(submitData)}>
    //     <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1 mt-2">
    //       Name
    //     </label>
    //     <input
    //       type="text"
    //       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       {...register("name")}
    //     />
    //     <label className="text-sm font-medium text-gray-900 dark:text-white p-1 mr-1 mt-2">
    //       Email
    //     </label>
    //     <input
    //       type="email"
    //       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       placeholder="Email@domain.com"
    //       {...register("email")}
    //     />
    //     <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1">
    //       School
    //     </label>
    //     <input
    //       type="text"
    //       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       {...register("school")}
    //     />
    //     <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1">
    //       Courses
    //     </label>
    //     <input
    //       type="text"
    //       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       {...register("courses")}
    //     />
    //     <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1">
    //       Phone Number
    //     </label>
    //     <input
    //       type="number"
    //       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       {...register("phone", { valueAsNumber: true })}
    //     />
    //     <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1">
    //       ID
    //     </label>
    //     <input
    //       type="number"
    //       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       {...register("idNum", { valueAsNumber: true })}
    //     />
    //     <label className="text-sm font-medium text-gray-900 dark:text-white m-auto p-1 mr-1">
    //       Admin/User
    //     </label>
    //     <select
    //       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //       {...register("role")}
    //     >
    //       <option value="user">User</option>
    //       <option value="admin">Admin</option>
    //     </select>
    //     \00 \{" "}
    //     {getError() !== "" && (
    //       <p className="text-orange-800 text-center mt-3 mb-2">{getError()}</p>
    //     )}
    //     <Button>Submit</Button>
    //   </form>
    // </main>
  );
};
