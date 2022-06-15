import { PrismaClient, Project } from "@prisma/client";
import {
  ProjectCreateArgs,
  ProjectUpdateArgs,
  SearchArgument,
} from "interface";
import { idArg } from "nexus";

const prisma = new PrismaClient();
const PROJECT_PAGE_CONTENT_COUNT = 15;

export const getProjects: Function = async ({
  page,
  orderBy,
}: {
  page: number;
  orderBy: Object;
}): Promise<Project[]> =>
  prisma.project.findMany({
    orderBy,
    skip: (page - 1) * PROJECT_PAGE_CONTENT_COUNT,
    take: PROJECT_PAGE_CONTENT_COUNT,
  });

export const getProjectListOfUser: Function = async (userId: number) =>
  prisma.project.findMany({
    where: {
      OR: [
        { owner_id: userId },
        {
          ProjectMember: {
            some: {
              member_id: userId,
            },
          },
        },
      ],
    },
  });

export const getProjectListOfOwnerUser: Function = async (userId: number) =>
  prisma.project.findMany({ where: { owner_id: userId } });

export const getParticipatedProjectsOfUser: Function = async (userId: number) =>
  prisma.project.findMany({
    where: { ProjectMember: { some: { member_id: userId } } },
  });

export const getLikedProjectFromUser: Function = async (userId: number) =>
  prisma.project.findMany({
    where: { ProjectLike: { some: { user_id: userId } } },
  });

export const getProjectById: Function = async (
  projectId: number,
): Promise<Project | null> =>
  prisma.project.findUnique({
    where: { id: projectId },
    include: {
      owner: true,
      ProjectView: true,
      ProjectField: true,
      ProjectImage: true,
      ProjectMember: {
        include: {
          member: true,
        },
      },
      ProjectSkill: true,
      ProjectLike: true,
    },
  });

export const findProjectContainName: Function = async ({
  name,
  orderBy,
  page,
}: SearchArgument) =>
  prisma.project.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    orderBy,
    skip: (page - 1) * PROJECT_PAGE_CONTENT_COUNT,
    take: PROJECT_PAGE_CONTENT_COUNT,
  });

export const getLikedFromProjectAndUserId: Function = async (
  projectId: number,
  userId: number,
) =>
  prisma.projectLike.findFirst({
    where: { project_id: projectId, user_id: userId },
  });

export const getViewCountAboutProject: Function = (project_id: number) =>
  prisma.projectView.count({ where: { project_id } });

export const getLikesOfProject: Function = (project_id: number) =>
  prisma.projectLike.findMany({ where: { project_id } });

export const create: Function = async (
  user_id: number,
  data: ProjectCreateArgs,
) =>
  prisma.project.create({
    data: {
      owner_id: user_id,
      ...data,
    },
  });

export const update: Function = async (id: number, data: ProjectUpdateArgs) =>
  prisma.project.update({
    where: {
      id,
    },
    data,
  });

export const deleteById: Function = async (id: number) =>
  prisma.project.delete({ where: { id } });

export const addLikeAtProject: Function = async (
  user_id: number,
  project_id: number,
) => prisma.projectLike.create({ data: { user_id, project_id } });

export const removeLikeAtProject: Function = async (
  user_id: number,
  project_id: number,
) => prisma.projectLike.deleteMany({ where: { user_id, project_id } });

export const addView = async (project_id: number, user_id?: number) =>
  prisma.projectView.create({ data: { user_id, project_id } });
