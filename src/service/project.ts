import {
  PortfolioProject,
  PrismaClient,
  Project,
  ProjectLike,
} from "@prisma/client";

import { PortfolioService, SkillService } from "service";
import { ProjectCreateArgs, ProjectOrder } from "interface";

const prisma = new PrismaClient();

export const getProjects: Function = async (): Promise<Project[]> => {
  return await prisma.project.findMany();
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

export const sortProjectsCreatedAt: Function = (
  projects: ProjectOrder[]
): ProjectOrder[] => {
  return projects.sort((a, b) => {
    // 최신순 정렬
    return Number(b.project.created_at) - Number(a.project.created_at);
  });
};

export const sortProjectsAtOrder: Function = (
  projects: ProjectOrder[]
): ProjectOrder[] => {
  return projects.sort((a, b) => {
    // 순서가 같으면 최신순 정렬
    if (a.order == b.order) {
      return Number(b.project.created_at) - Number(a.project.created_at);
    }
    // 순서 정렬
    return a.order - b.order;
  });
};

export const getMyProjectsWithOrder: Function = async (
  userId: number
): Promise<ProjectOrder[]> => {
  // 포트폴리오에 등록된 프로젝트, 등록되지 않은 프로젝트 모두 불러오기
  const portfolioProjects: PortfolioProject[] = (
    await PortfolioService.getPortfolio(userId)
  ).PortfolioProject;
  const ownProjects: Project[] = await getOwnProjectsOfUser(userId);

  // 포트폴리오에 등록된 프로젝트는 순서와 함께 반환, 등록 안된 프로젝트는 순서 9999 반환
  const myProjects: ProjectOrder[] = ownProjects.map((project) => {
    const portProject = portfolioProjects.map((portProject) => {
      if (portProject.project_id == project.id) {
        return portProject;
      }
    });

    if (portProject[0]) {
      return { project: project, order: portProject[0].order }; // 순서가 있을 때 반환
    }

    return { project: project, order: 9999 }; // 순서가 없을 때 반환
  });

  return myProjects;
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
