import { Skill, User, Portfolio, Project } from "@prisma/client";
import { Context } from "../../../interface";
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
  resolve: async (_: any, args: any, ctx: Context): Promise<Skill[]> => {
    return await SkillService.findSkillByName(ctx.prisma, args.search_word);
  },
};

export const nameSearch = {
  type: "User",
  args: {
    name: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, ctx: Context): Promise<User[]> => {
    return await UserService.findUserByName(ctx.prisma, args.name);
  },
};

export const emailSearch = {
  type: "User",
  args: {
    email: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, ctx: Context): Promise<User[]> => {
    return await UserService.findUserByEmail(ctx.prisma, args.email);
  },
};

export const portfolioSearch = {
  type: "Portfolio",
  args: {
    name: nonNull(stringArg()),
    orderBy: stringArg(),
    page: intArg(),
  },
  resolve: async (_: any, args: any, ctx: Context): Promise<Portfolio[]> => {
    return await PortfolioService.findPortfolioByName(ctx.prisma, {
      name: args.name,
      orderBy: PortfolioService.orderAboutPortfolioList[args.orderBy]("asc"),
      page: args.page,
    });
  },
};

export const projectSearch = {
  type: "Project",
  args: {
    name: nonNull(stringArg()),
    orderBy: stringArg(),
    page: intArg(),
  },
  resolve: async (_: any, args: any, ctx: Context): Promise<Project[]> => {
    return await ProjectService.findProjectByName(ctx.prisma, {
      name: args.name,
      orderBy: ProjectService.orderAboutProjectList[args.orderBy]("asc"),
      page: args.page,
    });
  },
};
export const explore = {
  type: "ExploreResult",
  resolve: async () => {
    // TODO : explore(메인화면에 표시될 객체들) 구현
    return;
  },
};
