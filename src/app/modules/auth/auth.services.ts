import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import { generateToken } from "../../utils/generateToken";
import { loginSuccessEmail } from "../../utils/email/loginSuccess";
import { verifyToken } from "../../utils/verifyToken";
import { env } from "../../../config/env";
import { UserArgs } from "@prisma/client/runtime/library";

const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Incorrect password", httpStatus.UNAUTHORIZED);
  }
  const token = await generateToken(user);
  await loginSuccessEmail({
    name: user.name,
    email: user.email,
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
    device: "Chrome",
  });
  return {
    accessToken: token,
  };
};

const resetPassword = async (token: string) => {
  const decodedToken = verifyToken(token, env.jwt_secret);
  console.log(decodedToken);
};

export const authService = { login, resetPassword };
