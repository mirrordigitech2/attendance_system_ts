"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Student, StudentForm } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { StudentSchema } from "../utils/validation";
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
  item?: Student | null;
};

export const FormStudents = (props: Props) => {
  const itemId = props.item?.id;
  // console.log(props.item);

  //using react hook form and passing the zod schema to it
  //register function used to link the input data to the schema object

  const form = useForm<StudentForm>({
    resolver: zodResolver(StudentSchema),
    ...(props.item && { values: { ...props.item } }),
  });

  const submitData = async (data: StudentForm) => {
    try {
      if (itemId) {
        //editDoc
        await setDoc(doc(db, "students", itemId), { ...data }).then(() => {
          console.log("Document updated successfully");
        });
      } else {
        await addDoc(collection(db, "students"), { ...data }).then(() => {
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
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schools</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="class1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneParent"
              render={({ field }) => {
                // console.log(field);
                return (
                  <FormItem>
                    <FormLabel>Phone Parents</FormLabel>
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
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
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
