import { Project } from "@prisma/client";
import { arg, intArg, nonNull } from "nexus";

import { Context } from "../../../interface";
import { ProjectService } from "../../../service";

export const createProject = {
  args: {
    project: arg({ type: "ProjectCreateInput" }),
  },
  resolve: async (_: any, args: any, ctx: Context) => {
    return await ProjectService.createProject(
      ctx.prisma,
      ctx.userId,
      args.project
    );
  },
  type: "Project",
};

export const updateProject = {
  args: {
    id: nonNull(intArg()),
    project: arg({ type: "ProjectUpdateInput" }),
  },
  resolve: async (_: any, args: any, ctx: Context) => {
    return await ProjectService.updateProject(
      ctx.prisma,
      args.id,
      args.project
    );
  },
  type: "Project",
};

export const deleteProject = {
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_: any, args: any, ctx: Context): Promise<Project> => {
    return await ProjectService.deleteProject(ctx.prisma, args.id);
  },
  type: "Project",
};

export const likeProject = {
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_: any, args: any, ctx: Context): Promise<boolean> => {
    const is_followed = await ProjectService.isLikedByUser(
      ctx.prisma,
      args.id,
      ctx.userId
    );
    if (is_followed) {
      await ProjectService.deleteLikeProject(ctx.prisma, ctx.userId, args.id);
      return false;
    } else {
      await ProjectService.createLikeProject(ctx.prisma, ctx.userId, args.id);
      return true;
    }
  },
  type: "Boolean",
};
