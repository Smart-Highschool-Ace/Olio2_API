import { PrismaClient } from "@prisma/client";

import { PortfolioUpdateArgs } from "interface";
const prisma = new PrismaClient();

export const portfolioHaveLike = async (
  portfolio_id: number,
  user_id: number
) => {
  const liked = await prisma.portfolioLike.findFirst({
    where: {
      portfolio_id: portfolio_id,
      user_id: user_id,
    },
  });
  if (liked) {
    return true;
  }
  return false;
};
export const getViewAboutPortfolio = async (id: number): Promise<number> => {
  return await prisma.portfolioView.count({
    where: {
      portfolio_id: id,
    },
  });
};
export const getLikesAboutPortfolioByPortfolio = async (id: number) => {
  return await prisma.portfolioLike.findMany({
    where: {
      portfolio_id: id,
    },
    select: {
      user: true,
    },
  });
};
export const modifyPortfolio = async (
  id: number,
  updateArgs: PortfolioUpdateArgs
) => {
  await prisma.portfolio.update({
    where: {
      id: id,
    },
    data: {
      owner: {
        update: {
          email: updateArgs.email,
        },
      },
      PortfolioSkill: {
        set: updateArgs.skils,
      },
      PortfolioProject: {
        set: updateArgs.projects,
      },
      PortfolioPrize: {
        set: updateArgs.prizes,
      },
      PortfolioCertificate: {
        set: updateArgs.certificates,
      },
    },
  });
};

export const getLikePortfolio = async (
  user_id: number,
  portfolio_id: number
) => {
  const liked = await prisma.portfolioLike.findFirst({
    where: {
      user_id: user_id,
      portfolio_id: portfolio_id,
    },
  });
  return liked;
};

export const createLikePortfolio = async (
  user_id: number,
  portfolio_id: number
) => {
  await prisma.portfolioLike.create({
    data: {
      user_id: user_id,
      portfolio_id: portfolio_id,
    },
  });
};

export const deleteLikePortfolio = async (
  user_id: number,
  portfolio_id: number
) => {
  await prisma.portfolioLike.deleteMany({
    where: {
      user_id: user_id,
      portfolio_id: portfolio_id,
    },
  });
};

export const getPortfolio = async (id: number) => {
  return await prisma.portfolio.findFirst({
    where: {
      id: id,
    },
    include: {
      owner: true,
      PortfolioSkill: true,
      PortfolioProject: true,
      PortfolioPrize: true,
      PortfolioCertificate: true,
    },
  });
};

export const getPortfolioByUser = async (user_id: number) => {
  return await prisma.portfolio.findFirst({
    where: {
      owner: {
        id: user_id,
      },
    },
  });
};

export const getLikedPortfoliosOfUser = async (userId: number) => {
  const result = await prisma.portfolioLike.findMany({
    where: {
      user_id: userId,
    },
    select: {
      portfolio: true,
    },
  });
  return result.map((item) => {
    return item.portfolio;
  });
};
