import { CourseForm } from "@/lib/types";
import { ZodType, z } from "zod";

export const CourseSchema: ZodType<CourseForm> = z.object({
  //id: z.string(),
  name: z.string().min(1, { message: "Name is required!" }),

  lecturer: z.string().min(1, { message: "Lecturer is required!" }),

  school: z.string().min(1, { message: "School is required!" }),

  location: z.string().min(1, { message: "location is required!" }),
  // totalStudent: z.coerce
  //   .number()
  //   .min(1, { message: "totalStudent is required!" }),
});
