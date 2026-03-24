import { env } from "../../config/env";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export const seedAdmin = async () => {
  const email = env.admin_email;
  const isExsis = await prisma.user.findUnique({ where: { email } });
  const hashedPassword = await bcrypt.hash(env.admin_pass, env.pass_salt);
  if (!isExsis) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email,
        password: hashedPassword,
        role: "admin",
      },
    });
  } else {
    console.log("Admin already exists");
  }
};
