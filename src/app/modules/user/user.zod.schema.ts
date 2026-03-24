import z from "zod";

export const userZodSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.email({ message: "Email is required" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["user", "admin"]).optional(),
});
