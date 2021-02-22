import { PrismaClient } from "@prisma/client";
import { intArg } from "nexus";

const prisma = new PrismaClient();

export const portfolio = {
  type: "Portfolio",
  args: { id: intArg() },
  resolve: async (_: any, args: any, __: any) => {
    return await prisma.portfolio.findFirst({
      where: {
        id: args.id,
      },
    });
  },
};

export const allPortfolio = {
  type: "Portfolio",
  resolve: async () => {
    return await prisma.portfolio.findMany();
  },
};
