import { Prisma, Project } from "@prisma/client";
import { intArg, stringArg } from "nexus";

import { ProjectService } from "service";
import { Context } from "interface";

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
    const sortFlag: Prisma.SortOrder = "asc";
    const page: number = (args.page - 1) * 15;
    if (args.orderBy == "popular") {
      return await ProjectService.getSortedProjectsAtPopular(sortFlag, page);
    } else if (args.orderBy == "views") {
      return await ProjectService.getSortedProjectsAtViews(sortFlag, page);
    } else if (args.orderBy == "recent") {
      return await ProjectService.getSortedProjectsAtRecent(sortFlag, page);
    }
    //popular 인기순
    //views 조회수순
    //recent 최신순
  },
};
