import { arg, nonNull, intArg } from "nexus";

import { context } from "../../../context";
import {
  getLikePortfolio,
  createLikePortfolio,
  deleteLikePortfolio,
} from "service/portfolio";

export const updatePortfolio = {
  args: {
    portfolio: arg({ type: "PortfolioUpdateInput" }),
  },
  resolve: (_: any, args: any, ctx: context) => {
    // 후에 포트폴리오 수정 구현

    const mock_link = "http://mock-example.com";
    return mock_link;
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
