import { StudentForm } from "@/lib/types";
import { ZodType, z } from "zod";

export const StudentSchema: ZodType<StudentForm> = z.object({
  //id: z.string(),
  name: z.string().min(1, { message: "Name is required!" }),

  school: z.string().min(1, { message: "School is required!" }),
  age: z.coerce.number().min(1, { message: "Age is required!" }),

  class1: z.string().min(1, { message: "Class is required!" }),

  phoneParent: z.coerce
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
  address: z.string().min(1, { message: "address is required!" }),
  courses: z.string().min(1, { message: "Course is required!" }),
});
