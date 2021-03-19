import { PrismaClient } from "@prisma/client";

import { PortfolioService } from "service";

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
