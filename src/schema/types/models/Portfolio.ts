import { objectType } from "nexus";

import {
  PortfolioService,
  ProjectService,
  SkillService,
  UserService,
} from "../../../service";

export const Portfolio = objectType({
  name: "Portfolio",
  definition(t) {
    t.int("id");
    t.field("owner", {
      type: "User",
    });
    t.string("introduction");
    t.string("email");
    t.string("link");
    t.list.field("PortfolioLike", {
      type: "PortfolioLike",
    });
    t.list.field("PortfolioSkill", {
      type: "PortfolioSkill",
    });
    t.list.field("PortfolioProject", {
      type: "PortfolioProject",
    });
    t.list.field("PortfolioPrize", {
      type: "PortfolioPrize",
    });
    t.list.field("PortfolioCertificate", {
      type: "PortfolioCertificate",
    });
    t.list.field("PortfolioView", {
      type: "PortfolioView",
    });
    t.int("view", {
      resolve: (root, _, __) => {
        return root.PortfolioView?.length || 0;
      },
    });
    t.int("like", {
      resolve: (root, _, __) => {
        return root.PortfolioLike?.length || 0;
      },
    });
    t.boolean("liked", {
      resolve: (root, __, ctx) => {
        return PortfolioService.portfolioHaveLike(root.id, ctx.userId);
      },
    });
  },
});

export const PortfolioView = objectType({
  name: "PortfolioView",
  definition(t) {
    t.int("id");
    t.int("portfolio_id");
    t.int("user_id");
    t.string("source_ip");
  },
});

export const PortfolioSkill = objectType({
  name: "PortfolioSkill",
  definition(t) {
    t.int("portfolio_id");
    t.int("skill_id");
    t.field("skill", {
      type: "Skill",
      resolve: (root, _, __) => {
        return SkillService.getSkillByID(root.skill_id);
      },
    });
    t.int("level");
  },
});

export const PortfolioProject = objectType({
  name: "PortfolioProject",
  definition(t) {
    t.field("project", {
      type: "Project",
      resolve: (root, _, __) => {
        return ProjectService.getProject(root.project_id);
      },
    });
    t.int("project_id");
    t.int("id");
    t.int("portfolio_id");
    t.int("order");
  },
});

export const PortfolioPrize = objectType({
  name: "PortfolioPrize",
  definition(t) {
    t.string("name");
    t.string("institution");
    t.string("prized_at");
  },
});

export const PortfolioCertificate = objectType({
  name: "PortfolioCertificate",
  definition(t) {
    t.string("name");
    t.string("institution");
    t.string("certified_at");
  },
});

export const PortfolioLike = objectType({
  name: "PortfolioLike",
  definition(t) {
    t.int("id");
    t.field("user", {
      type: "User",
      resolve: (root, _, __) => {
        return UserService.getUser(root.user_id);
      },
    });
    t.int("user_id");
  },
});
