import { arg, nonNull, intArg } from "nexus";

import { context } from "context";
import { PortfolioService, UserService } from "service";
import { PortfolioUpdateArgs } from "interface/Portfolio";
export const updatePortfolio = {
  args: {
    portfolio: arg({ type: "PortfolioUpdateInput" }),
  },
  resolve: async (_: any, args: any, ctx: context) => {
    const updateArgs: PortfolioUpdateArgs = args.portfolio;

    await UserService.modifyEmail(ctx.userId, updateArgs.email);
    await PortfolioService.modifyPortfolio(ctx.userId, updateArgs);
    return { status: true };
  },
  type: "statusResult",
};

export const likePortfolio = {
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_: any, args: any, ctx: context) => {
    const result = await PortfolioService.getLikePortfolio(ctx.userId, args.id);
    if (result) {
      await PortfolioService.deleteLikePortfolio(ctx.userId, args.id);
      return { status: false };
    } else {
      await PortfolioService.createLikePortfolio(ctx.userId, args.id);
      return { status: true };
    }
  },
  type: "statusResult",
};
