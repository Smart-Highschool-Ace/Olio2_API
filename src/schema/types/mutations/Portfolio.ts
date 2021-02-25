import { arg, nonNull, intArg } from "nexus";

import { context } from "context";
import {
  getPortfolioByUser,
  modifyPortfolio,
  getLikePortfolio,
  createLikePortfolio,
  deleteLikePortfolio,
} from "service/portfolio";

export const updatePortfolio = {
  args: {
    id: nonNull(intArg()),
    portfolio: arg({ type: "PortfolioUpdateInput" }),
  },
  resolve: async (_: any, args: any, ctx: context) => {
    const portfolio_id = (await getPortfolioByUser(ctx.userId)).id;
    const { email, skils, projects, prizes, certificates } = args.portfolio;
    await modifyPortfolio(
      portfolio_id,
      email,
      skils,
      projects,
      prizes,
      certificates
    );
    return String(portfolio_id);
  },
  type: "String",
};

export const likePortfolio = {
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_: any, args: any, ctx: context) => {
    const result = await getLikePortfolio(ctx.userId, args.id);
    if (result) {
      await deleteLikePortfolio(ctx.userId, args.id);
      return false;
    } else {
      await createLikePortfolio(ctx.userId, args.id);
      return true;
    }
  },
  type: "Boolean",
};
