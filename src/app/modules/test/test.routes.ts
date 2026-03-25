import { Router } from "express";
import { testController } from "./test.controller";

const router = Router();

router.get("/m", testController.m);

export const testRoutes = router;
