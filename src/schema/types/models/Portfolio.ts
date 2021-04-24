import { objectType } from "nexus";

import {
  PortfolioService,
  ProjectService,
  SkillService,
  UserService,
} from "service";

export const Portfolio = objectType({
  name: "Portfolio",
  definition(t) {
    t.int("id");
    t.field("owner", {
      type: "User",
      resolve: async (root, _, __) => {
        return (await PortfolioService.getPortfolio(root.id)).owner;
      },
    });
    t.string("introduction");
    t.string("email");
    t.string("link");
    t.list.field("likes", {
      type: PortfolioLike,
      resolve: async (root, _, __) => {
        return await PortfolioService.getLikesAboutPortfolioByPortfolio(
          root.id
        );
      },
    });
    t.list.field("skills", {
      type: PortfolioSkill,
      resolve: async (root, _, __) => {
        return (await PortfolioService.getPortfolio(root.id)).PortfolioSkill;
      },
    });
    t.list.field("projects", {
      type: PortfolioProject,
      resolve: async (root, _, __) => {
        console.log;
        return (await PortfolioService.getPortfolio(root.id)).PortfolioProject;
      },
    });
    t.list.field("prizes", {
      type: "PortfolioPrize",
      resolve: async (root, _, __) => {
        return (await PortfolioService.getPortfolio(root.id)).PortfolioPrize;
      },
    });
    t.list.field("certificates", {
      type: "PortfolioCertificate",
      resolve: async (root, _, __) => {
        return (await PortfolioService.getPortfolio(root.id))
          .PortfolioCertificate;
      },
    });
    t.int("view", {
      resolve: async (root, _, __) => {
        return await PortfolioService.getViewAboutPortfolio(root.id);
      },
    });
    t.boolean("liked", {
      resolve: async (root, __, ctx) => {
        return await PortfolioService.portfolioHaveLike(root.id, ctx.userId);
      },
    });
  },
});

export const PortfolioSkill = objectType({
  name: "PortfolioSkill",
  definition(t) {
    t.int("portfolio_id");
    t.int("skill_id");
    t.field("skill", {
      type: "Skill",
      resolve: async (root, _, __) => {
        return await SkillService.getSkillByID(root.skill_id);
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
      resolve: async (root, _, __) => {
        return await ProjectService.getProject(root.project_id);
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
      resolve: async (root, _, __) => {
        return await UserService.getUser(root.user_id);
      },
    });
    t.int("user_id");
  },
});

export const PortfolioSearchResult = objectType({
  name: "PortfolioSearchResult",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("profile_image");
    t.string("introduction");
    t.int("portfolio_view", {
      resolve: async (root, _, __) => {
        const portfolio_id = (
          await PortfolioService.getPortfolioByUser(root.id)
        ).id;
        return await PortfolioService.getViewAboutPortfolio(portfolio_id);
      },
    });
    t.int("portfolio_like", {
      resolve: async (root, _, __) => {
        return (await PortfolioService.getLikedPortfoliosOfUser(root.id))
          .length;
      },
    });
  },
});
