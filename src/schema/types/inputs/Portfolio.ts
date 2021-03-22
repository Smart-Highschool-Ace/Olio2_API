import { inputObjectType } from "nexus";

export const PortfolioUpdateInput = inputObjectType({
  name: "PortfolioUpdateInput",
  definition(t) {
    t.string("email");
    t.list.field("skills", {
      type: "PortfolioSkillInput",
    });
    t.list.field("projects", {
      type: "PortfolioProjectInput",
    });
    t.list.field("prizes", {
      type: "PortfolioPrizeInput",
    });
    t.list.field("certificates", {
      type: "PortfolioCertificateInput",
    });
  },
});

export const PortfolioSkillInput = inputObjectType({
  name: "PortfolioSkillInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.int("level");
  },
});

export const PortfolioProjectInput = inputObjectType({
  name: "PortfolioProjectInput",
  definition(t) {
    t.nonNull.int("project_id");
    t.nonNull.int("order");
  },
});

export const PortfolioPrizeInput = inputObjectType({
  name: "PortfolioPrizeInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("institution");
    t.nonNull.string("prized_at");
  },
});

export const PortfolioCertificateInput = inputObjectType({
  name: "PortfolioCertificateInput",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.string("institution");
    t.nonNull.string("certified_at");
  },
});
