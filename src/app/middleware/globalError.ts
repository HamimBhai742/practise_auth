import e, { NextFunction, Request, Response } from "express";

export const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";
  const errorDetails: any = [];

  if (err.name === "ZodError") {
    message = "Zod Validation Error";
    console.log(err.issues);
    err.issues.forEach((issue: any) => {
      errorDetails.push({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      });
    });
  }
  res.status(statusCode).json({ success: false, message, errorDetails });
};
