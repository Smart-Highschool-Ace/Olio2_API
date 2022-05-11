import { PrismaClient, User } from "@prisma/client";
import { intArg } from "nexus";

const prisma = new PrismaClient();

export const allUser = {
  type: "User",
  resolve: async (): Promise<User[]> => {
    return await prisma.user.findMany();
  },
};

export const user = {
  type: "User",
  args: { id: intArg() },
  resolve: (_: any, args: any, __: any): Promise<User> => {
    return prisma.user.findFirst({
      where: {
        id: args.id,
      },
    });
  },
};
