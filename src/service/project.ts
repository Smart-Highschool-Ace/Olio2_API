import { Prisma, PrismaClient, Project, ProjectLike } from "@prisma/client";

import { SkillService } from "service";
import { ProjectCreateArgs } from "interface";

const prisma = new PrismaClient();

export const getProjects: Function = async (): Promise<Project[]> => {
  return await prisma.project.findMany({});
};

// 유저가 생성하거나 참여한 프로젝트를 모두 불러옴
export const getAllProjectsOfUser: Function = async (
  userId: number
): Promise<Project[]> => {
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

export const getSortedProjectsAtRecent: Function = async (
  orderBy: Prisma.SortOrder,
  page: number = 0
): Promise<Project[]> => {
  return prisma.project.findMany({
    orderBy: {
      created_at: orderBy,
    },
    skip: page,
    take: 15,
  });
};

export const getSortedProjectsAtPopular: Function = async (
  orderBy: Prisma.SortOrder,
  page: number = 0
): Promise<Project[]> => {
  return await prisma.project.findMany({
    orderBy: {
      ProjectLike: {
        count: orderBy,
      },
    },
    skip: page,
    take: 15,
  });
};

export const getSortedProjectsAtViews: Function = async (
  orderBy: Prisma.SortOrder,
  page: number = 0
): Promise<Project[]> => {
  return await prisma.project.findMany({
    orderBy: {
      ProjectView: {
        count: orderBy,
      },
    },
    skip: page,
    take: 15,
  });
};

export const getOwnProjectsOfUser: Function = async (
  userId: number
): Promise<Project[]> => {
  return await prisma.project.findMany({
    where: {
      owner_id: userId,
    },
  });
};

export const getParticipatedProjectsOfUser: Function = async (
  userId: number
): Promise<Project[]> => {
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

export const getLikedProjectsOfUser: Function = async (
  userId: number
): Promise<Project[]> => {
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

export const getProject: Function = async (projectId: number) => {
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

export const isLikedByUser: Function = async (
  projectId: number,
  userId: number
): Promise<boolean> => {
  const result = await prisma.projectLike.findFirst({
    where: {
      project_id: projectId,
      user_id: userId,
    },
  });
  return Boolean(result);
};

export const createProject: Function = async (
  user_id: number,
  createArgs: ProjectCreateArgs
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
        create: await Promise.all(
          createArgs.skills.map(async (skill) => {
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
          })
        ),
      },
      ProjectMember: {
        create: createArgs.members.map((m) => {
          return { member_id: m.member_id, role: m.role };
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

export const updateProject: Function = async (
  id: number,
  updateArgs: ProjectCreateArgs
): Promise<Project> => {
  updateArgs.skills = updateArgs.skills || [];
  updateArgs.members = updateArgs.members || [];
  updateArgs.fields = updateArgs.fields || [];
  updateArgs.images = updateArgs.images || [];

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
        deleteMany: {},
        create: await Promise.all(
          updateArgs.skills.map(async (skill) => {
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
          })
        ),
      },
      ProjectMember: {
        deleteMany: {},
        create: updateArgs.members.map((member) => {
          return { member_id: member.member_id, role: member.role };
        }),
      },
      ProjectField: {
        deleteMany: {},
        create: updateArgs.fields.map((field) => {
          return { name: field.name };
        }),
      },
      ProjectImage: {
        deleteMany: {},
        create: updateArgs.images.map((image) => {
          return { link: image.link, order: image.order };
        }),
      },
    },
  });
};

export const deleteProject: Function = async (id: number): Promise<Project> => {
  return await prisma.project.delete({
    where: {
      id: id,
    },
  });
};

export const createLikeProject: Function = async (
  user_id: number,
  project_id: number
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
  project_id: number
): Promise<void> => {
  await prisma.projectLike.deleteMany({
    where: {
      user_id: user_id,
      project_id: project_id,
    },
  });
};

export const findProjectByName: Function = async (
  name: string
): Promise<Project[]> => {
  return await prisma.project.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export const getViewAboutProject: Function = async (
  id: number
): Promise<number> => {
  return await prisma.projectView.count({
    where: {
      project_id: id,
    },
  });
};

export const getOwnLikeOfProjects: Function = async (
  id: number
): Promise<ProjectLike[]> => {
  return await prisma.projectLike.findMany({
    where: {
      project_id: id,
    },
  });
};

export const createProjectView = async (userId: number, projectId: number) => {
  await prisma.projectView.create({
    data: {
      user_id: userId,
      project_id: projectId,
    },
  });
};
