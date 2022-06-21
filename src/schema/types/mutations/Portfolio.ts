import { arg, nonNull, intArg } from "nexus";

import { Context } from "../../../interface";
import { PortfolioService } from "../../../service";

export const updatePortfolio = {
  args: {
    portfolio: arg({ type: "PortfolioUpdateInput" }),
  },
  resolve: async (_: any, args: any, ctx: Context) => {
    await PortfolioService.modifyPortfolio(ctx.userId, args.portfolio);
    return { status: true };
  },
  type: "statusResult",
};

export const likePortfolio = {
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_: any, args: any, ctx: Context) => {
    const result = await PortfolioService.getLikePortfolio(ctx.userId, args.id);
    await PortfolioService[
      result ? "deleteLikePortfolio" : "createLikePortfolio"
    ](ctx.userId, args.id);
    return { status: !result };
  },
  type: "statusResult",
};
