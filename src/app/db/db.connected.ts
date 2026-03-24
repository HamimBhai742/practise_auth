import { prisma } from "../lib/prisma";

export const dbConnected = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfull");
  } catch (error) {
    await prisma.$disconnect();
    console.log("Database connection failed");
  }
};
