import { UserForm } from "@/lib/types";
import { ZodType, z } from "zod";

export const schema: ZodType<UserForm> = z.object({
    //id: z.string(),
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