import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";

const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Incorrect password", httpStatus.UNAUTHORIZED);
  }
  return user;
};


export const authService = { login };
