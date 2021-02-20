import { PrismaClient } from "@prisma/client";
import { intArg } from "nexus";

const prisma = new PrismaClient();

export const allUser = {
  type: "User",
  resolve: async () => {
    return await prisma.user.findMany();
  },
};

export const user = {
  type: "User",
  args: { id: intArg() },
  resolve: async (_: any, args: any, __: any) => {
    return await prisma.user.findFirst({
      where: {
        id: args.id,
      },
    });
  },
};
