import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/AppError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/verifyToken";
import { env } from "../../config/env";
import { IJwtPayload } from "../interface/Ijwt";
import { prisma } from "../lib/prisma";

export const checkAuth =
  (...roles: string[]) =>
  async (
    req: Request & { user?: IJwtPayload },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError("You are not logged in", httpStatus.UNAUTHORIZED);
      }

      const decodedToken = verifyToken(token, env.jwt_secret) as IJwtPayload;

      const user = await prisma.user.findUnique({
        where: { id: decodedToken.id },
      });

      if (!user) {
        throw new AppError("User not found", httpStatus.NOT_FOUND);
      }

      if (user.status === "inactive" || user.status === "blocked") {
        throw new AppError(
          `Your account is ${user.status}. Please contact admin`,
          httpStatus.UNAUTHORIZED,
        );
      }

      if (!roles.includes(decodedToken.role)) {
        throw new AppError("You are not authorized", httpStatus.UNAUTHORIZED);
      }
      req.user = decodedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
