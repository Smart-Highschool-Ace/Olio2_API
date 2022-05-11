import { PrismaClient, Project, ProjectLike } from "@prisma/client";

import { SkillService } from "../service";
import {
  orderAboutProjectListType,
  ProjectCreateArgs,
  SearchArgument,
} from "../interface";
import { map, pipe, toArray, toAsync } from "@fxts/core";

const prisma = new PrismaClient();

export const getProjects: Function = (args: {
  page: number;
  orderBy: Object;
}): Promise<Project[]> => {
  return prisma.project.findMany({
    orderBy: args.orderBy,
    skip: (args.page - 1) * 15,
    take: 15,
  });
};

// 유저가 생성하거나 참여한 프로젝트를 모두 불러옴
export const getAllProjectsOfUser: Function = (
  userId: number,
): Promise<Project[]> => {
  return prisma.project.findMany({
    where: {
      OR: [
        {
          owner_id: userId,
        },
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
};
export const getOwnProjectsOfUser: Function = (
  userId: number,
): Promise<Project[]> => {
  return prisma.project.findMany({
    where: {
      owner_id: userId,
    },
  });
};

export const getParticipatedProjectsOfUser: Function = (
  userId: number,
): Promise<Project[]> => {
  return prisma.project.findMany({
    where: {
      ProjectMember: {
        some: {
          member_id: userId,
        },
      },
    },
  });
};

export const getLikedProjectsOfUser: Function = async (
  userId: number,
): Promise<Project[]> => {
  const result = await prisma.projectLike.findMany({
    where: {
      user_id: userId,
    },
    select: {
      project: true,
    },
  });
  return pipe(
    result,
    map((item) => item.project),
    toArray,
  );
};

export const getProject: Function = (projectId: number) => {
  return prisma.project.findFirst({
    where: {
      id: projectId,
    },
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
};

export const isLikedByUser: Function = async (
  projectId: number,
  userId: number,
): Promise<boolean> => {
  const result = await prisma.projectLike.findFirst({
    where: {
      project_id: projectId,
      user_id: userId,
    },
  });
  return !!result;
};

export const createProject: Function = async (
  user_id: number,
  createArgs: ProjectCreateArgs,
): Promise<Project> => {
  createArgs.skills = createArgs.skills || [];
  createArgs.members = createArgs.members || [];
  createArgs.fields = createArgs.fields || [];
  createArgs.images = createArgs.images || [];

  return await prisma.project.create({
    data: {
      owner_id: user_id,
      name: createArgs.name,
      introduction: createArgs.introduction,
      description: createArgs.description,
      link: createArgs.link,
      logo: createArgs.logo,
      start_at: createArgs.start_at,
      end_at: createArgs.end_at,
      ProjectSkill: {
        create: await pipe(
          createArgs.skills,
          map(async (skill) => {
            const localSkill = await SkillService.getSkillByName(skill.name);
            if (localSkill == null) {
              const skill_id = (await SkillService.AddSkill(skill.name)).id;
              return {
                skill_id: skill_id,
              };
            }
            return {
              skill_id: localSkill.id,
            };
          }),
          toAsync,
          toArray,
        ),
      },
      ProjectMember: {
        create: pipe(
          createArgs.members,
          map((m) => ({ member_id: m.member_id, role: m.role })),
          toArray,
        ),
      },
      ProjectField: {
        create: pipe(
          createArgs.fields,
          map((f) => ({ name: f.name })),
          toArray,
        ),
      },
      ProjectImage: {
        create: pipe(
          createArgs.images,
          map((i) => ({ link: i.link, order: i.order })),
          toArray,
        ),
      },
    },
  });
};

export const updateProject: Function = async (
  id: number,
  updateArgs: ProjectCreateArgs,
): Promise<Project> => {
  updateArgs.skills = updateArgs.skills || [];
  updateArgs.members = updateArgs.members || [];
  updateArgs.fields = updateArgs.fields || [];
  updateArgs.images = updateArgs.images || [];

  return prisma.project.update({
    where: {
      id: id,
    },
    data: {
      name: updateArgs.name,
      introduction: updateArgs.introduction,
      description: updateArgs.description,
      link: updateArgs.link,
      logo: updateArgs.logo,
      start_at: updateArgs.start_at,
      end_at: updateArgs.end_at,
      ProjectSkill: {
        deleteMany: {},
        create: await pipe(
          updateArgs.skills,
          map(async (skill) => {
            const localSkill = await SkillService.getSkillByName(skill.name);
            if (localSkill == null) {
              const skill_id = (await SkillService.AddSkill(skill.name)).id;
              return {
                skill_id: skill_id,
              };
            }
            return {
              skill_id: localSkill.id,
            };
          }),
          toAsync,
          toArray,
        ),
      },
      ProjectMember: {
        deleteMany: {},
        create: pipe(
          updateArgs.members,
          map((m) => ({ member_id: m.member_id, role: m.role })),
          toArray,
        ),
      },
      ProjectField: {
        deleteMany: {},
        create: pipe(
          updateArgs.fields,
          map((f) => ({ name: f.name })),
          toArray,
        ),
      },
      ProjectImage: {
        deleteMany: {},
        create: pipe(
          updateArgs.images,
          map((i) => ({ link: i.link, order: i.order })),
          toArray,
        ),
      },
    },
  });
};

export const deleteProject: Function = (id: number): Promise<Project> => {
  return prisma.project.delete({
    where: {
      id: id,
    },
  });
};

export const createLikeProject: Function = async (
  user_id: number,
  project_id: number,
): Promise<void> => {
  await prisma.projectLike.create({
    data: {
      user_id: user_id,
      project_id: project_id,
    },
  });
};

export const deleteLikeProject: Function = async (
  user_id: number,
  project_id: number,
): Promise<void> => {
  await prisma.projectLike.deleteMany({
    where: {
      user_id: user_id,
      project_id: project_id,
    },
  });
};

export const findProjectByName: Function = (
  args: SearchArgument,
): Promise<Project[]> => {
  return prisma.project.findMany({
    where: {
      name: {
        contains: args.name,
      },
    },
    orderBy: args.orderBy,
    skip: (args.page - 1) * 15,
    take: 15,
  });
};

export const getViewAboutProject: Function = (id: number): Promise<number> => {
  return prisma.projectView.count({
    where: {
      project_id: id,
    },
  });
};

export const getOwnLikeOfProjects: Function = (
  id: number,
): Promise<ProjectLike[]> => {
  return prisma.projectLike.findMany({
    where: {
      project_id: id,
    },
  });
};

export const createProjectView = async (projectId: number, userId?: number) => {
  await prisma.projectView.create({
    data: {
      user_id: userId,
      project_id: projectId,
    },
  });
};

const getLikeFirst: Function = (orderAscDesc: string): Object => {
  return {
    ProjectLike: {
      count: orderAscDesc,
    },
  };
};
const getViewFirst: Function = (orderAscDesc: string): Object => {
  return {
    ProjectView: {
      count: orderAscDesc,
    },
  };
};
const getRecentFirst: Function = (orderAscDesc: string): Object => {
  return {
    created_at: orderAscDesc,
  };
};

export const orderAboutProjectList: orderAboutProjectListType = {
  popular: getLikeFirst,
  views: getViewFirst,
  recent: getRecentFirst,
};
