import { Portfolio } from "@prisma/client";
import { intArg } from "nexus";
import { PortfolioService } from "../../../service";
import { Context } from "../../../interface/Context";
export const portfolio = {
  type: "Portfolio",
  args: { id: intArg() },
  resolve: (_: any, args: any, ctx: Context) => {
    // PortfolioService.createPortfolioView(ctx.userId, args.id);
    return PortfolioService.getPortfolio(args.id);
  },
};

export const allPortfolio = {
  type: "Portfolio",
  resolve: (_: any, __: any, ___: any): Promise<Portfolio[]> => {
    return PortfolioService.getPortfolios();
  },
};
