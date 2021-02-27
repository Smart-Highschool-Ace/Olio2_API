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
  resolve: async () => {
    // TODO : 모든 Portfolio 조회 Service 구현 및 적용
    return await prisma.portfolio.findMany();
  },
};
