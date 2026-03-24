import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: user,
    });
  },
);

const getProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const user = await userService.getProfile(req.user.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully",
      data: user,
    });
  },
);

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.forgotPassword(req.body.email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password reset link sent successfully",
    data: user,
  });
});

export const userController = { createUser, getProfile ,forgotPassword};
