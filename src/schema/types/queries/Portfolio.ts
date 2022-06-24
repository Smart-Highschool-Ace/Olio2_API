import { Portfolio } from "@prisma/client";
import { intArg } from "nexus";
import { PortfolioService } from "../../../service";
import { Context } from "../../../interface/Context";
export const portfolio = {
  type: "Portfolio",
  args: { id: intArg() },
  resolve: (_: any, args: any, ctx: Context) =>
    PortfolioService.joinPortfolio(args.id, ctx.userId),
};

export const allPortfolio = {
  type: "Portfolio",
  resolve: (_: any, __: any, ___: any): Promise<Portfolio[]> =>
    PortfolioService.getPortfolios(),
};
