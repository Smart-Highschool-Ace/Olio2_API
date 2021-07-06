import { Portfolio } from "@prisma/client";
import { intArg } from "nexus";
import { PortfolioService } from "../../../service";
import { Context } from "../../../interface/Context";
export const portfolio = {
  type: "Portfolio",
  args: { id: intArg() },
  resolve: async (_: any, args: any, ctx: Context) => {
    // PortfolioService.createPortfolioView(ctx.userId, args.id);
    return await PortfolioService.getPortfolio(ctx.prisma, args.id);
  },
};

export const allPortfolio = {
  type: "Portfolio",
  resolve: async (_: any, __: any, ctx: Context): Promise<Portfolio[]> => {
    return await PortfolioService.getPortfolios(ctx.prisma);
  },
};
