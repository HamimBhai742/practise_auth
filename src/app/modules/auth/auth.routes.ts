import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/zod.valodation";
import { authZodSchema } from "./auth.zod.schema";

const router = Router();

router.post("/login", validateRequest(authZodSchema), authController.login);

export const authRoutes = router;
