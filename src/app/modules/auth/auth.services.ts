import { AppError } from "../../error/AppError";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import { generateToken } from "../../utils/generateToken";
import { loginSuccessEmail } from "../../utils/email/loginSuccess";
import { verifyToken } from "../../utils/verifyToken";
import { env } from "../../../config/env";
import { twoFactorOtpTemplate } from "../../utils/email/twoFactorOtpTemplate";
import { generateOtp } from "../../utils/generateOtp";

const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  if (!user.isVerified) {
    throw new AppError("User is not verified", httpStatus.UNAUTHORIZED);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Incorrect password", httpStatus.UNAUTHORIZED);
  }

  const otp = generateOtp(6);
  const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
  await prisma.user.update({
    where: { id: user.id },
    data: { otp, otpExpiry },
  });
  await twoFactorOtpTemplate(
    user.name,
    "Login Verification Code",
    user.email,
    otp,
  );
};

const resendOtp = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  if(!user.isVerified) {
    throw new AppError("User is not verified", httpStatus.UNAUTHORIZED);
  }
  const otp = generateOtp(6);
  const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
  await prisma.user.update({
    where: { id: user.id },
    data: { otp, otpExpiry },
  });
  await twoFactorOtpTemplate(
    user.name,
    "Login Verification Code",
    user.email,
    otp,
  );
  return null;
};

const verifyOtp = async (email: string, otp: string, data: any) => {
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
    data: { otp: null, otpExpiry: null },
  });

  const token = await generateToken(user);

  await loginSuccessEmail({
    name: user.name,
    email: user.email,
    time: data.time,
    device: data.device,
    ip: data.ip,
    location: data.location,
  });
  return {
    accessToken: token,
  };
};

const resetPassword = async (token: string, newPass: string) => {
  const decodedToken = verifyToken(token, env.jwt_secret);
  console.log(decodedT

  );
  const user = await prisma.user.findUnique({ where: { id: decodedToken.id } });
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }
  const hashedPass = await bcrypt.hash(newPass, env.pass_salt);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPass },
  });
};

export const authService = { login, resetPassword, verifyOtp, resendOtp };
