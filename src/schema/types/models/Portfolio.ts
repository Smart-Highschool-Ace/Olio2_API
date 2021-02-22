import { PrismaClient } from "@prisma/client";
import { objectType } from "nexus";

const prisma = new PrismaClient();

export const Portfolio = objectType({
  name: "Portfolio",
  definition(t) {
    t.int("id");
    t.field("owner", {
      type: "User",
      resolve: async (root, _, __) => {
        return await prisma.portfolio.findFirst({
          where: {
            owner: {
              id: root.id,
            },
          },
        });
      },
    });
    t.string("email");
    t.string("link");
    t.list.field("likes", {
      type: "User",
      resolve: async (root, _, __) => {
        return await prisma.portfolio.findFirst({
          where: {
            id: root.id,
          },
          select: {
            owner: true,
          },
        });
      },
    });
    t.list.field("skills", {
      type: "PortfolioSkill",
      resolve: async (root, _, __) => {
        return await prisma.portfolio.findFirst({
          where: {
            id: root.id,
          },
          select: {
            PortfolioSkill: true,
          },
        });
      },
    });
    t.list.field("projects", {
      type: "Project",
      resolve: async (root, _, __) => {
        return await prisma.portfolio.findFirst({
          where: {
            id: root.id,
          },
          select: {
            PortfolioProject: true,
          },
        });
      },
    });
    t.list.field("prizes", {
      type: PortfolioPrize,
      resolve: async (root, _, __) => {
        return await prisma.portfolio.findFirst({
          where: {
            id: root.id,
          },
          select: {
            PortfolioPrize: true,
          },
        });
      },
    });
    t.list.field("certificates", {
      type: PortfolioCertificate,
      resolve: async (root, _, __) => {
        return await prisma.portfolio.findFirst({
          where: {
            id: root.id,
          },
          select: {
            PortfolioCertificate: true,
          },
        });
      },
    });
    t.int("view", {
      resolve: async (root, _, __) => {
        return await prisma.portfolioView.count({
          where: {
            portfolio_id: root.id,
          },
        });
      },
    });
    t.boolean("liked", {
      resolve: (root, __, ctx) => {
        if (ctx.userId) {
          const liked = prisma.portfolioLike.findFirst({
            where: {
              portfolio_id: root.id,
              user_id: ctx.user_id,
            },
          });
          if (liked) {
            return true;
          }
        }
        return false;
      },
    });
  },
});

export const PortfolioSkill = objectType({
  name: "PortfolioSkill",
  definition(t) {
    t.field("skill", {
      type: "Skill",
      resolve: () => {
        return "Typescript or something";
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
    });
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
