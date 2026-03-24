import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/zod.valodation";
import { userZodSchema } from "./user.zod.schema";

const router = Router();

router.post(
  "/create-user",
  validateRequest(userZodSchema),
  userController.createUser,
);

export const userRoutes = router;
