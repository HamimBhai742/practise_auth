import { NextFunction, Request, Response } from "express";

export const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const errorDetails: any = [];
  res.status(statusCode).json({ success: false, message, errorDetails });
};
