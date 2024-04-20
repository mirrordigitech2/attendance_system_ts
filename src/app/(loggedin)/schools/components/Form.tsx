"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { School, SchoolForm } from "@/lib/types";
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
import { SchoolSchema } from "../utils/validation";
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

type Props = {
  onClose: () => void;
  item?: School | null;
};

export const FormSchools = (props: Props) => {
  const itemId = props.item?.id;
  // console.log(props.item);

  //using react hook form and passing the zod schema to it
  //register function used to link the input data to the schema object

  const form = useForm<SchoolForm>({
    resolver: zodResolver(SchoolSchema),
    ...(props.item && { values: { ...props.item } }),
  });

  const submitData = async (data: SchoolForm) => {
    try {
      if (itemId) {
        //editDoc
        await setDoc(doc(db, "schools", itemId), { ...data }).then(() => {
          console.log("Document updated successfully");
        });
      } else {
        await addDoc(collection(db, "schools"), { ...data }).then(() => {
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lecturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecturer</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager</FormLabel>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalStudent"
              render={({ field }) => {
                // console.log(field);
                return (
                  <FormItem>
                    <FormLabel>Total Student</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
