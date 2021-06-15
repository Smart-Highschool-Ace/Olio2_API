import { Skill, User, Portfolio, Project } from "@prisma/client";
import { stringArg, nonNull } from "nexus";
import {
  PortfolioService,
  ProjectService,
  SkillService,
  UserService,
} from "../../../service";

export const skillSearch = {
  type: "Skill",
  args: {
    search_word: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any): Promise<Skill[]> => {
    return await SkillService.findSkillByName(args.search_word);
  },
};

export const nameSearch = {
  type: "User",
  args: {
    name: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any): Promise<User[]> => {
    return await UserService.findUserByName(args.name);
  },
};

export const emailSearch = {
  type: "User",
  args: {
    email: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any): Promise<User[]> => {
    return await UserService.findUserByEmail(args.email);
  },
};

export const portfolioSearch = {
  type: "Portfolio",
  args: {
    name: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any): Promise<Portfolio[]> => {
    return await PortfolioService.findPortfolioByName(args.name);
  },
};

export const projectSearch = {
  type: "Project",
  args: {
    name: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any): Promise<Project[]> => {
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
