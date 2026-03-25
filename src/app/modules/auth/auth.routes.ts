import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/zod.valodation";
import { authZodSchema, otpVerifyZodSchema, resendOtpZodSchema } from "./auth.zod.schema";

const router = Router();

router.post("/login", validateRequest(authZodSchema), authController.login);

router.post("/resend-otp", validateRequest(resendOtpZodSchema), authController.resendOtp);

router.post(
  "/verify-otp",
  validateRequest(otpVerifyZodSchema),
  authController.verifyOtp,
);

router.post("/reset-password/:token", authController.resetPassword);

export const authRoutes = router;
