import { PrismaClient } from "@prisma/client";

import { PortfolioService, SkillService } from "service";
import { ProjectCreateArgs } from "../interface/project";

const prisma = new PrismaClient();

export const getProjects = async (args: any) => {
  return await prisma.project.findMany();
};

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

export const getMyProjects = async (userId: number) => {
  // 포트폴리오에 등록된 프로젝트, 등록되지 않은 프로젝트 모두 불러오기
  const portfolioProjects = (await PortfolioService.getPortfolio(userId))
    .PortfolioProject;
  const ownProjects = await getOwnProjectsOfUser(userId);

  // 포트폴리오에 등록된 프로젝트는 순서와 함께 반환, 등록 안된 프로젝트는 순서 9999 반환
  const myProjects = ownProjects.map((project) => {
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

  // 결과 정렬
  myProjects.sort((a, b) => {
    // 순서가 같으면 최신순 정렬
    if (a.order == b.order) {
      return Number(b.project.created_at) - Number(a.project.created_at);
    }
    // 순서 정렬
    return a.order - b.order;
  });

  return myProjects;
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

export const updateProject = async (
  id: number,
  updateArgs: ProjectCreateArgs
) => {
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
  await prisma.projectLike.deleteMany({
    where: {
      user_id: user_id,
      project_id: project_id,
    },
  });
};
