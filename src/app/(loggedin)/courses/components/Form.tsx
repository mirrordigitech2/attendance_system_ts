"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course, CourseForm } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CourseSchema } from "../utils/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useUsers } from "../../users/hooks/useUsers";
import { useSchools } from "../../schools/hooks/useSchools";
import { createCourse, editCourse } from "@/lib/action";
import { useState } from "react";

type Props = {
  onClose: () => void;
  item?: Course | null;
};

export const FormCourses = (props: Props) => {
  const { users } = useUsers();
  const { schools } = useSchools();
  const itemId = props.item?.id;

  const [loading, setLoading] = useState(false);

  const form = useForm<CourseForm>({
    resolver: zodResolver(CourseSchema),
    ...(props.item?.id && { defaultValues: { ...props.item } }),
  });
  console.log("item :  ", props.item?.id);

  // const submitData = async (data: CourseForm) => {
  //   console.log("data", data);
  //   try {
  //     if (itemId) {
  //       await setDoc(doc(db, "courses", itemId), { ...data });
  //     } else {
  //       await addDoc(collection(db, "courses"), { ...data });
  //     }
  //     props.onClose();
  //   } catch (error) {
  //     console.error("Error adding document: ", error);
  //   }
  // };
  const submitData = async (data: CourseForm) => {
    try {
      if (itemId) {
        const res = await editCourse(itemId, data);
        console.log(res);
      } else {
        const res = await createCourse(data);
        console.log(res);
      }
      props.onClose();
    } catch (error) {
      setLoading(false);
      console.log("Error adding document: ", error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitData)} className="">
          <div className="grid grid-cols-3 pb-2 mt-1 space-x-2 w-90">
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
              name="lecturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecturer</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ? field.value.name : ""}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {field.value ? field.value.name : ""}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <FormLabel>School</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ? field.value.name : ""}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          {field.value ? field.value.name : ""}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {schools.map((school) => (
                          <SelectItem key={school.id} value={school.id}>
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Input {...field} type="text" placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalStudent"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Total Student</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" disabled />
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
