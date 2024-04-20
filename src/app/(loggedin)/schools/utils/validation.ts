import { SchoolForm } from "@/lib/types";
import { ZodType, z } from "zod";

export const SchoolSchema: ZodType<SchoolForm> = z.object({
  //id: z.string(),
  name: z.string().min(1, { message: "Name is required!" }),

  location: z.string().min(1, { message: "location is required!" }),
  lecturer: z.string().min(1, { message: "lecturer is required!" }),

  manager: z.string().min(1, { message: "manager is required!" }),

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
  totalStudent: z.coerce
    .number()
    .min(1, { message: "totalStudent is required!" }),
});
