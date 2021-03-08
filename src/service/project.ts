import { PrismaClient, Prisma } from "@prisma/client";
import { Project } from "schema/types";
import { ProjectCreateArgs } from "../interface/project";

const prisma = new PrismaClient();

// 유저가 생성하거나 참여한 프로젝트를 모두 불러옴
export const getAllProjectsOfUser = async (userId: number) => {
  return await prisma.project.findMany({
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

export const getOwnProjectsOfUser = async (userId: number) => {
  return await prisma.project.findMany({
    where: {
      owner_id: userId,
    },
  });
};

export const getParticipatedProjectsOfUser = async (userId: number) => {
  return await prisma.project.findMany({
    where: {
      ProjectMember: {
        some: {
          member_id: userId,
        },
      },
    },
  });
};

export const getLikedProjectsOfUser = async (userId: number) => {
  const result = await prisma.projectLike.findMany({
    where: {
      user_id: userId,
    },
    select: {
      project: true,
    },
  });

  return result.map((item) => {
    return item.project;
  });
};

export const getProject = async (projectId: number) => {
  return await prisma.project.findFirst({
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

export const isLikedByUser = async (projectId: number, userId: number) => {
  const result = await prisma.projectLike.findFirst({
    where: {
      project_id: projectId,
      user_id: userId,
    },
  });
  return Boolean(result);
};

export const createProject = async (
  user_id: number,
  createArgs: ProjectCreateArgs
) => {
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
        create: createArgs.skills.map((skill) => {
          return { name: skill.name };
        }),
      },
      ProjectMember: {
        create: createArgs.members.map((m) => {
          return { member: m.member_id, role: m.role };
        }),
      },
      ProjectField: {
        create: createArgs.fields.map((field) => {
          return { name: field.name };
        }),
      },
      ProjectImage: {
        create: createArgs.images.map((image) => {
          return { link: image.link, order: image.order };
        }),
      },
    },
  });
};

export const updateProject = async (
  id: number,
  updateArgs: ProjectCreateArgs
) => {
  return await prisma.project.update({
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
        set: updateArgs.skills,
      },
      ProjectMember: {
        set: updateArgs.members,
      },
      ProjectField: {
        set: updateArgs.fields,
      },
      ProjectImage: {
        set: updateArgs.images,
      },
    },
  });
};

export const deleteProject = async (id: number) => {
  return await prisma.project.delete({
    where: {
      id: id,
    },
  });
};

export const createLikeProject = async (
  user_id: number,
  project_id: number
) => {
  await prisma.projectLike.create({
    data: {
      user_id: user_id,
      project_id: project_id,
    },
  });
};

export const deleteLikeProject = async (
  user_id: number,
  project_id: number
) => {
  await prisma.projectLike.delete({
    where: {
      user_id: user_id,
      project_id: project_id,
    },
  });
};
