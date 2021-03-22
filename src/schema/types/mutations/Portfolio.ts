import { arg, nonNull, intArg } from "nexus";

import { context } from "context";
import { PortfolioService } from "service";
import { PortfolioUpdateArgs } from "interface/Portfolio";

export const updatePortfolio = {
  args: {
    id: nonNull(intArg()),
    portfolio: arg({ type: "PortfolioUpdateInput" }),
  },
  resolve: (_: any, args: any, ctx: any) => {
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
  resolve: (_: any, args: any, ctx: any) => {
    // 후에 좋아요 로직 구현
    return true;
  },
  type: "Boolean",
};
