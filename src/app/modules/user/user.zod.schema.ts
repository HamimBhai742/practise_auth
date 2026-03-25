import z from "zod";

export const userZodSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.email({ message: "Email is required" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["user", "admin"]).optional(),
});

export const userOtpZodSchema = z.object({
  otp: z
    .string({ message: "OTP is required" })
    .length(6, { message: "OTP must be 6 digits" }),
  email: z.string({ message: "Email is required" }),
});

export const resendOtpZodSchema = z.object({ email: z.string({ message: "Email is required" }) });
