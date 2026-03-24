import { env } from "../../config/env";
import { createToken } from "./token";

export const generateToken = async (user: any) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const token = await createToken(payload, env.jwt_secret, env.jwt_expires_in);
  return token;
};
