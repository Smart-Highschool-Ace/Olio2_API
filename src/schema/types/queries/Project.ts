import { Prisma, Project } from "@prisma/client";
import { intArg, stringArg } from "nexus";

import { ProjectService } from "../../../service";
import { Context } from "../../../interface";

export const project = {
  type: "Project",
  args: { id: intArg() },
  resolve: async (_: any, args: any, ctx: Context) => {
    ProjectService.createProjectView(ctx.userId, args.id);
    return await ProjectService.getProject(args.id);
  },
};

export const myProject = {
  type: "Project",
  args: { id: intArg() },
  resolve: async (_: any, args: any, __: any): Promise<Project[]> => {
    return await ProjectService.getAllProjectsOfUser(args.id);
  },
};

export const allProject = {
  type: "Project",
  args: { orderBy: stringArg(), page: intArg() },
  resolve: async (_: any, args: any, ___: any): Promise<Project[]> => {
    //1page에 15개씩
    return await ProjectService.getProjects({
      orderBy: ProjectService.orderAboutProjectList[args.orderBy]("asc"),
      page: args.page,
    });
    //popular 인기순
    //views 조회수순
    //recent 최신순
  },
};
