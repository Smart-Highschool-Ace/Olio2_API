import { stringArg, nonNull } from "nexus";
import { ProjectService, SkillService, UserService } from "service";

export const skillSearch = {
  type: "Skill",
  args: {
    search_word: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any) => {
    const data = await SkillService.findSkillByName(args.search_word);
    return data;
  },
};

export const nameSearch = {
  type: "NameSearchResult",
  args: {
    search_word: nonNull(stringArg()),
  },
  resolve: async () => {
    // TODO : Name Search 구현
    return;
  },
};

export const emailSearch = {
  type: "User",
  args: {
    email: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any) => {
    return await UserService.findUserByEmail(args.email);
  },
};

export const portfolioSearch = {
  type: "PortfolioSearchResult",
  args: {
    name: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any) => {
    return await UserService.findUserByName(args.name);
  },
};

export const projectSearch = {
  type: "ProjectSearchResult",
  args: {
    name: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any) => {
    return await ProjectService.findProjectByName(args.name);
  },
};
export const explore = {
  type: "ExploreResult",
  resolve: async () => {
    // TODO : explore(메인화면에 표시될 객체들) 구현
    return;
  },
};
