import { Skill, User, Portfolio, Project } from "@prisma/client";
import { stringArg, nonNull, intArg } from "nexus";
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
  resolve: (_: any, args: any, __: any): Promise<Skill[]> =>
    SkillService.findSkillByName(args.search_word),
};

export const nameSearch = {
  type: "User",
  args: {
    name: nonNull(stringArg()),
  },
  resolve: (_: any, args: any, __: any): Promise<User[]> =>
    UserService.findUserByName(args.name),
};

export const emailSearch = {
  type: "User",
  args: {
    email: nonNull(stringArg()),
  },
  resolve: (_: any, args: any, __: any): Promise<User[]> =>
    UserService.findUserByEmail(args.email),
};

export const portfolioSearch = {
  type: "Portfolio",
  args: {
    name: nonNull(stringArg()),
    orderBy: stringArg(),
    page: intArg(),
  },
  resolve: (_: any, args: any, __: any): Promise<Portfolio[]> =>
    PortfolioService.findPortfolioByName({
      name: args.name,
      orderBy: PortfolioService.orderAboutPortfolioList[args.orderBy]("asc"),
      page: args.page,
    }),
};

export const projectSearch = {
  type: "Project",
  args: {
    name: nonNull(stringArg()),
    orderBy: stringArg(),
    page: intArg(),
  },
  resolve: (_: any, args: any, __: any): Promise<Project[]> =>
    ProjectService.findProjectByName({
      name: args.name,
      orderBy: ProjectService.orderAboutProjectList[args.orderBy]("asc"),
      page: args.page,
    }),
};
