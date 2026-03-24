import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.login(req.body.email, req.body.password);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: user,
    });
  },
);


export const authController = { login };
