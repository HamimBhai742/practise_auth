import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  metaData?: IMetaData;
}

interface IMetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export const sendResponse = <T>(res: Response, resData: IResponse<T>) => {
  const { success, statusCode, message, data, metaData } = resData;

  res.status(statusCode).json({ success, message, data, metaData });
};
