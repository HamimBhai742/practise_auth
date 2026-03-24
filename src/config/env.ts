import "dotenv/config";
export const env = {
  port: Number(process.env.PORT) || 5000,
  database_url: process.env.DATABASE_URL as string,
  admin_email: process.env.ADMIN_EMAIL as string,
  admin_pass: process.env.ADMIN_PASS as string,
  pass_salt: Number(process.env.PASS_SALT) || 10,
};
