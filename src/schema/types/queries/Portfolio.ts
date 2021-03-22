import { intArg } from "nexus";
import { PortfolioService } from "service";

export const portfolio = {
  type: "Portfolio",
  args: { id: intArg() },
  resolve: async (_: any, args: any, __: any) => {
    return await PortfolioService.getPortfolio(args.id);
  },
};
