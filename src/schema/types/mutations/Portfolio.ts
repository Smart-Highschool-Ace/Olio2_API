import { arg, nonNull, intArg } from "nexus";

import { context } from "context";
import { PortfolioService } from "service";
import {
  PortfolioCertificate,
  PortfolioPrize,
  PortfolioProject,
  PortfolioSkill,
} from "@prisma/client";

export interface PortfolioUpdateArgs {
  portfolio_id: number;
  email: string;
  certificates: PortfolioCertificate;
  prizes: PortfolioPrize;
  projects: PortfolioProject;
  skils: PortfolioSkill;
}
export const updatePortfolio = {
  args: {
    id: nonNull(intArg()),
    portfolio: arg({ type: "PortfolioUpdateInput" }),
  },
  resolve: async (_: any, args: any, ctx: context) => {
    const portfolio_id = (await PortfolioService.getPortfolioByUser(ctx.userId))
      .id;
    const updateArgs: PortfolioUpdateArgs = args.portfolio;
    await PortfolioService.modifyPortfolio(portfolio_id, updateArgs);
    return String(portfolio_id);
  },
  type: "String",
};

export const likePortfolio = {
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_: any, args: any, ctx: context) => {
    const result = await PortfolioService.getLikePortfolio(ctx.userId, args.id);
    if (result) {
      await PortfolioService.deleteLikePortfolio(ctx.userId, args.id);
      return false;
    } else {
      await PortfolioService.createLikePortfolio(ctx.userId, args.id);
      return true;
    }
  },
  type: "Boolean",
};
