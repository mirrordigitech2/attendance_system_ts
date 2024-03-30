import { UserForm } from "@/lib/types";
import { ZodType, z } from "zod";

export const UserSchema: ZodType<UserForm> = z.object({
  //id: z.string(),
  name: z.string().min(1, { message: "Name is required!" }),
  email: z.string().email({
    message: "please enter a value email address",
  }),
  school: z.string().min(3, { message: "School is required!" }),
  courses: z.string().min(1, { message: "Course is required!" }),
  // phone: z.string().min(10, { message: "Course is required!" }),
  // idNum: z.number().min(9, { message: "Course is required!" }),
  phone: z.coerce
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

  idNum: z.coerce
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
