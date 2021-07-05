import { PrismaClient } from "@prisma/client";

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}
