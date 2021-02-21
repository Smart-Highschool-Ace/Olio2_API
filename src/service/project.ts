import { PrismaClient, Prisma } from "@prisma/client";

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
  const result = await prisma.proejctLike.findMany({
    where: {
      user_id: userId,
    },
    select: {
      proejct: true,
    },
  });

  return result.map((item) => {
    return item.proejct;
  });
};
