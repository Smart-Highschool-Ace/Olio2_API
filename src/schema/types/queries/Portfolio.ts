import { PrismaClient } from "@prisma/client";
import { intArg } from "nexus";
import { PortfolioService } from "service";

const prisma = new PrismaClient();

export const portfolio = {
  type: "Portfolio",
  args: { id: intArg() },
  resolve: async (_: any, args: any, __: any) => {
    return await PortfolioService.getPortfolio(args.id);
  },
};

export const allPortfolio = {
  type: "Portfolio",
  resolve: async (_: any, args: any, __: any) => {
    return await PortfolioService.getPortfolios();
  },
};
