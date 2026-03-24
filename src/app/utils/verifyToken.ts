import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { AppError } from "../error/AppError";
import httpStatus from "http-status-codes";

export const verifyToken = (token: string, secret: Secret) => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Token has expired!", httpStatus.UNAUTHORIZED);
    }
    throw new AppError("Invalid token!", httpStatus.UNAUTHORIZED);
  }
};
