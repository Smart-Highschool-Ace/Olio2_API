import { Project } from "@prisma/client";
import { intArg, stringArg } from "nexus";

import { ProjectService } from "service";

export const project = {
  type: "Project",
  args: { id: intArg() },
  resolve: async (_: any, args: any, __: any) => {
    return await ProjectService.getProject(args.id);
  },
};

export const myProject = {
  type: "PortfolioProject",
  args: { id: intArg() },
  resolve: async (_: any, args: any, __: any): Promise<Project[]> => {
    return await ProjectService.getAllProjectsOfUser(args.id);
  },
};

export const allProject = {
  type: "Project",
  args: { orderBy: stringArg(), page: intArg() },
  resolve: async (_: any, __: any, ___: any): Promise<Project[]> => {
    return await ProjectService.getProjects();
  },
};
