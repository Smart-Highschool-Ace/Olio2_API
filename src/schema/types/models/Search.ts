import { unionType, objectType } from "nexus";
import { PortfolioService, ProjectService } from "service";
export const NameSearchResult = unionType({
  name: "NameSearchResult",
  resolveType(data) {
    const __typename = "profile_image" in data ? "User" : "Portfolio";
    if (!__typename) {
      throw new Error(
        `Could not resolve the type of data passed to union type "NameSearchResult"`
      );
    }
    return __typename;
  },
  definition(t) {
    t.members("Portfolio", "User");
  },
});

export const ExploreResult = unionType({
  name: "ExploreResult",
  resolveType(data) {
    const __typename = "email" in data ? "Portfolio" : "Project";
    if (!__typename) {
      throw new Error(
        `Could not resolve the type of data passed to union type "NameSearchResult"`
      );
    }
    return __typename;
  },
  definition(t) {
    t.members("Portfolio", "Project");
  },
});

export const PortfolioSearchResult = objectType({
  name: "PortfolioSearchResult",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("profile_image");
    t.string("introduction");
    t.int("view_portfolio", {
      resolve: async (root, _, __) => {
        const portfolio_id = (
          await PortfolioService.getPortfolioByUser(root.id)
        ).id;
        return await PortfolioService.getViewAboutPortfolio(portfolio_id);
      },
    });
    t.int("like_portfolio", {
      resolve: async (root, _, __) => {
        return (await PortfolioService.getLikedPortfoliosOfUser(root.id))
          .length;
      },
    });
  },
});

export const ProjectSearchResult = objectType({
  name: "ProjectSearchResult",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("introduction");
    t.string("logo");
    t.int("view_project", {
      resolve: async (root, _, __) => {
        return await ProjectService.getViewAboutProject(root.id);
      },
    });
    t.int("like_project", {
      resolve: async (root, _, __) => {
        return (await ProjectService.getLikedProjectsOfUser(root.id)).length;
      },
    });
  },
});
