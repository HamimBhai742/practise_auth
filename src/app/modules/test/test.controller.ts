import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { testService } from "./test.service";

const m = catchAsync(async (req: Request, res: Response) => {
  const user = await testService.m();

  res.status(200).json({ success: true, data: user });
});


export const testController = { m };