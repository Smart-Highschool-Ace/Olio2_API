import { arg, intArg, nonNull } from "nexus";

import { Project } from "@prisma/client";
import { ProjectService } from "service";
import {
  ProjectSkill,
  ProjectMember,
  ProjectImage,
  ProjectField,
} from "@prisma/client";
export interface ProjectCreateArgs {
  name: string;
  introduction: string;
  description: string;
  link: string;
  logo: string;
  start_at: Date;
  end_at: Date;
  skills: ProjectSkill[];
  members: ProjectMember[];
  fields: ProjectField[];
  images: ProjectImage[];
}

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
  resolve(_: any, args: any, ctx: any) {
    // 후에 프로젝트 수정 구현
    const mock_link = "http://mock-example.com";
    return mock_link;
  },
  type: "String",
};

export const deleteProject = {
  args: {
    id: nonNull(intArg()),
  },
  resolve(_: any, args: any, ctx: any) {
    // 후에 프로젝트 삭제 구현
    const mock_error = "mock error!";
    return mock_error;
  },
  type: "String",
};

export const likeProject = {
  args: {
    id: nonNull(intArg()),
  },
  resolve(_: any, args: any, ctx: any) {
    // 후에 프로젝트 좋아요 구현
    const mock_liked = true;
    return mock_liked;
  },
  type: "Boolean",
};
