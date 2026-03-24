import "dotenv/config";
export const env = {
  port: Number(process.env.PORT) || 5000,
  database_url: process.env.DATABASE_URL as string,
  admin_email: process.env.ADMIN_EMAIL as string,
  admin_pass: process.env.ADMIN_PASS as string,
  pass_salt: Number(process.env.PASS_SALT) || 10,
  jwt_secret: process.env.JWT_SECRET as string,
  jwt_expires_in: process.env.JWT_EXPIRES_IN as string,
  email: process.env.SMTP_USER as string,
  password: process.env.SMTP_PASS as string,
};
