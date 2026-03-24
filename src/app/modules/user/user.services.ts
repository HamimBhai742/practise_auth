import bcrypt from "bcrypt";
import { env } from "../../../config/env";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status-codes";
import { forgotPasswordEmail } from "../../utils/email/forgetPass";
import { createToken } from "../../utils/token";

const createUser = async (payload: any) => {
  const isExsist = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (isExsist) {
    throw new AppError("User already exists", httpStatus.CONFLICT);
  }
  const hashedPass = await bcrypt.hash(payload.password, env.pass_salt);
  payload.password = hashedPass;
  const user = await prisma.user.create({
    data: payload,
    select: { id: true, email: true, name: true, role: true },
  });
  return user;
};

const getProfile = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true },
  });
  return user;
};

const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }
  const resetLink = `http://localhost:3000/reset-password/${forgotPassword}`;
  await forgotPasswordEmail({ name: user.name, email, resetLink });

  const token = await createToken(user, env.jwt_secret, "10m");
  return {
    forgotPasswordToken: token,
  };
};

export const userService = { createUser, getProfile, forgotPassword };
