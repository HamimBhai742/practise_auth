import bcrypt from "bcrypt";
import { env } from "../../../config/env";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status-codes";
import { forgotPasswordEmail } from "../../utils/email/forgetPass";
import { createToken } from "../../utils/token";
import { generateOtp } from "../../utils/generateOtp";
import { registrationOtpTemplate } from "../../utils/email/registrationOtpTemplate";

interface UserPayload {
  name: string;
  email: string;
  password: string;
}

const createUser = async (payload: UserPayload) => {
  const isExsist = await prisma.user.findUnique({
    where: { email: payload?.email },
  });

  if (isExsist && !isExsist.isVerified) {
    const otp = generateOtp(6);
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await prisma.user.update({
      where: { id: isExsist.id },
      data: {
        otp,
        otpExpiry,
      },
      select: { id: true, email: true, name: true, role: true },
    });
    await registrationOtpTemplate(
      payload.name,
      "Verify Your Email",
      payload.email,
      otp,
    );
    return isExsist;
  }

  if (isExsist) {
    throw new AppError("User already exists", httpStatus.CONFLICT);
  }

  const hashedPass = await bcrypt.hash(payload.password, env.pass_salt);
  payload.password = hashedPass;
  const otp = generateOtp(6);
  const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
  const user = await prisma.user.create({
    data: {
      ...payload,
      otp,
      otpExpiry,
    },
    select: { id: true, email: true, name: true, role: true },
  });

  await registrationOtpTemplate(
    payload.name,
    "Verify Your Email",
    payload.email,
    otp,
  );
  return user;
};

const resendOtp = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }
  const otp = generateOtp(6);
  const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
  await prisma.user.update({
    where: { id: user.id },
    data: { otp, otpExpiry },
  });
  await registrationOtpTemplate(
    user.name,
    "Verify Your Email",
    user.email,
    otp,
  );
  return user;
};

const verifyOtp = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }
  if (user.otp !== otp) {
    throw new AppError("Invalid OTP", httpStatus.BAD_REQUEST);
  }
  if (user?.otpExpiry && user.otpExpiry < new Date()) {
    throw new AppError("OTP expired", httpStatus.BAD_REQUEST);
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { isVerified: true, otp: null, otpExpiry: null },
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

export const userService = {
  createUser,
  getProfile,
  forgotPassword,
  verifyOtp,
  resendOtp,
};
