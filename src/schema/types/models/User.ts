import { PrismaClient } from "@prisma/client";
import { objectType } from "nexus";

import { PortfolioService, ProjectService, UserService } from "service";

const prisma = new PrismaClient();

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("email");
    t.string("school");
    t.string("profile_image");
    t.string("introduction");
    t.int("entrance_year");
    t.int("grade", {
      resolve: (root) => {
        return new Date().getFullYear() - root.entrance_year;
      },
    });
    t.field("portfolio", {
      type: "Portfolio",
      resolve: async (root, _, __) => {
        return await PortfolioService.getPortfolio(root.id);
      },
    });
    t.list.field("projects", {
      type: "Project",
      resolve: async (root, _, __) => {
        return await ProjectService.getOwnProjectsOfUser(root.id);
      },
    });
    t.list.field("participated_projects", {
      type: "Project",
      resolve: async (root, _, __) => {
        return await ProjectService.getParticipatedProjectsOfUser(root.id);
      },
    });
    t.list.field("liked_projects", {
      type: "Project",
      resolve: async (root, _, __) => {
        return await ProjectService.getLikedProjectsOfUser(root.id);
      },
    });
    t.list.field("liked_portfolios", {
      type: "Portfolio",
      resolve: async (root, _, __) => {
        return await PortfolioService.getLikedPortfoliosOfUser(root.id);
      },
    });
  },
});
