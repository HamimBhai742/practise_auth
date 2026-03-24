import jwt, { SignOptions } from "jsonwebtoken";


export const createToken = (
  payload: any,
  secretKey: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secretKey, { expiresIn } as SignOptions);
};


