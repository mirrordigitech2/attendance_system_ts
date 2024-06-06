"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { School, SchoolForm } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SchoolSchema } from "../utils/validation";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsers } from "../../users/hooks/useUsers";

type Props = {
  onClose: () => void;
  item?: School | null;
};

export const FormSchools = ({ onClose, item }: Props) => {
  const { users } = useUsers();

  const form = useForm<SchoolForm>({
    resolver: zodResolver(SchoolSchema),
    defaultValues: item ? { ...item, lecturer: item.lecturer || "" } : {},
  });

  const submitData = async (data: SchoolForm) => {
    try {
      if (item?.id) {
        // Edit existing school document
        await setDoc(doc(db, "schools", item.id), { ...data });
      } else {
        // Add new school document
        await addDoc(collection(db, "schools"), { ...data });
      }
      onClose();
    } catch (error) {
      console.error("Error adding or updating document: ", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitData)}
          className="grid grid-cols-3 pb-2 mt-1 space-x-2 w-90"
        >
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
                  <Select
                    // onValueChange={(value) => field.onChange(value)}
                    onValueChange={field.onChange}
                    defaultValue={field.value.name}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {field.value.name}
                        {/* {item && item !== null
                          ? item.lecturer.name
                          : "Select a lecturer"} */}
                        {/* {users.find((user) => user.id === field.value)?.name ||
                          "Select Lecturer"} */}
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
          <Button type="submit" className="w-full col-span-3">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
