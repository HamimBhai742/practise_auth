import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/zod.valodation";
import { userZodSchema } from "./user.zod.schema";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/create-user",
  validateRequest(userZodSchema),
  userController.createUser,
);

router.get(
  "/profile",
  checkAuth(...Object.values(Role)),
  userController.getProfile,
);

router.post("/forgot-password", userController.forgotPassword);

export const userRoutes = router;
