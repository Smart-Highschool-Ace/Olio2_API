import { arg, intArg, nonNull } from "nexus";
import { Project } from "@prisma/client";
import { ProjectService } from "service";
import {
  ProjectSkill,
  ProjectMember,
  ProjectImage,
  ProjectField,
} from "@prisma/client";

export const createProject = {
  args: {
    project: arg({ type: "ProjectCreateInput" }),
  },
  resolve: async (_: any, args: any, ctx: any) => {
    const user_id = ctx.user_id;
    const createArgs: ProjectCreateArgs = args.project;
    const new_project = await ProjectService.createProject(user_id, createArgs);
    return String(new_project.id);
  },
  type: "String",
};

export const updateProject = {
  args: {
    id: nonNull(intArg()),
    project: arg({ type: "ProjectUpdateInput" }),
  },
  resolve: async (_: any, args: any, ctx: any) => {
    const updateArgs: ProjectCreateArgs = args.project;
    const updated_project = await ProjectService.updateProject(
      args.id,
      updateArgs
    );
    return String(updated_project.id);
  },
  type: "String",
};

export const deleteProject = {
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_: any, args: any, ctx: any) => {
    const deleted_project = await ProjectService.deleteProject(args.id);
    return String(deleted_project.id);
  },
  type: "String",
};

export const likeProject = {
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_: any, args: any, ctx: any) => {
    const is_followed = await ProjectService.isLikedByUser(
      args.id,
      ctx.user_id
    );
    if (is_followed) {
      await ProjectService.deleteLikeProject(ctx.user_id, args.id);
      return false;
    } else {
      await ProjectService.createLikeProject(ctx.user_id, args.id);
      return true;
    }
  },
  type: "Boolean",
};
