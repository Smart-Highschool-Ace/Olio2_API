import { Project } from "@prisma/client";
import { arg, intArg, nonNull } from "nexus";

import { Context } from "../../../interface";
import { ProjectService } from "../../../service";

export const createProject = {
  args: {
    project: arg({ type: "ProjectCreateInput" }),
  },
  resolve: (_: any, args: any, ctx: Context) => {
    return ProjectService.createProject(ctx.userId, args.project);
  },
  type: "Project",
};

export const updateProject = {
  args: {
    id: nonNull(intArg()),
    project: arg({ type: "ProjectUpdateInput" }),
  },
  resolve: (_: any, args: any, __: any) => {
    return ProjectService.updateProject(args.id, args.project);
  },
  type: "Project",
};

export const deleteProject = {
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_: any, args: any, __: any): Promise<Project> => {
    return ProjectService.deleteProject(args.id);
  },
  type: "Project",
};

export const likeProject = {
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_: any, args: any, ctx: Context): Promise<boolean> => {
    const is_followed = await ProjectService.isLikedByUser(args.id, ctx.userId);
    await ProjectService[
      is_followed ? "deleteLikeProject" : "createLikeProject"
    ](ctx.userId, args.id);
    return !is_followed;
  },
  type: "Boolean",
};
