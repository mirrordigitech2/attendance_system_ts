import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "please enter a value email address",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters long",
  }),
});
