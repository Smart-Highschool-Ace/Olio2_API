import { objectType } from "nexus";

import { PortfolioService, ProjectService } from "../../../service";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("email");
    t.string("school");
    t.string("profile_image");
    t.int("generation");
    t.int("grade", {
      resolve: (root, _, __) => {
        return new Date().getFullYear() - 2015 - root.generation;
      },
    });
    t.field("portfolio", {
      type: "Portfolio",
      resolve: (root, _, __) => {
        return PortfolioService.getPortfolio(root.id);
      },
    });
    t.list.field("projects", {
      type: "Project",
      resolve: (root, _, __) => {
        return ProjectService.getOwnProjectsOfUser(root.id);
      },
    });
    t.list.field("participated_projects", {
      type: "Project",
      resolve: (root, _, __) => {
        return ProjectService.getParticipatedProjectsOfUser(root.id);
      },
    });
    t.list.field("liked_projects", {
      type: "Project",
      resolve: (root, _, __) => {
        return ProjectService.getLikedProjectsOfUser(root.id);
      },
    });
    t.list.field("liked_portfolios", {
      type: "Portfolio",
      resolve: (root, _, __) => {
        return PortfolioService.getLikedPortfoliosOfUser(root.id);
      },
    });
  },
});

export const loginResult = objectType({
  name: "loginResult",
  definition(t) {
    t.string("token");
    t.string("error");
    t.boolean("joined");
  },
});

export const statusResult = objectType({
  name: "statusResult",
  definition(t) {
    t.boolean("status");
    t.string("error");
  },
});
