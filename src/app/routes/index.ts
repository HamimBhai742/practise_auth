import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { testRoutes } from "../modules/test/test.routes";

export const router = Router();

const routes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/test",
    route: testRoutes,
  },
  {
    path: "/",
    route: testRoutes,
  }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});
