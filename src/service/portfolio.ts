import { PrismaClient } from "@prisma/client";

import { PortfolioUpdateArgs } from "interface/Portfolio";
<<<<<<< HEAD
import { parse_yyyy_mm_dd } from "util/date";
=======

>>>>>>> 16af3815f68da9f7dfc344724cadb48f260bc1a6
const prisma = new PrismaClient();

export const createPortfolio = async (user_id: number) => {
  return await prisma.portfolio.create({
    data: {
      owner: {
        connect: { id: user_id },
      },
    },
  });
};

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
  const like = await prisma.portfolioLike.findMany({
    where: {
      portfolio_id: id,
    },
  });
  return like;
};

export const modifyPortfolio = async (
  id: number,
  updateArgs: PortfolioUpdateArgs
) => {
  updateArgs.skills = updateArgs.skills || [];
  updateArgs.certificates = updateArgs.certificates || [];
  updateArgs.prizes = updateArgs.prizes || [];
  updateArgs.projects = updateArgs.projects || [];

  await prisma.portfolio.update({
    where: {
      id: id,
    },
    data: {
      email: updateArgs.email,
      PortfolioCertificate: {
        deleteMany: {},
        create: updateArgs.certificates.map((certificateArgs) => {
          return {
            name: certificateArgs.name,
            institution: certificateArgs.institution,
            certified_at: parse_yyyy_mm_dd(certificateArgs.certified_at),
          };
        }),
      },
      PortfolioSkill: {
        deleteMany: {},
        create: updateArgs.skills.map((skill) => {
          return {
            name: skill.name,
            level: skill.level,
          };
        }),
      },
      PortfolioProject: {
        deleteMany: {},
        create: updateArgs.projects.map((project) => {
          return {
            project_id: project.project_id,
            order: project.order,
          };
        }),
      },
      PortfolioPrize: {
        deleteMany: {},
        create: updateArgs.prizes.map((prize) => {
          return {
            name: prize.name,
            institution: prize.institution,
            prized_at: parse_yyyy_mm_dd(prize.prized_at),
          };
        }),
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
<<<<<<< HEAD
    include: {
      owner: true,
      PortfolioView: true,
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
=======
>>>>>>> 16af3815f68da9f7dfc344724cadb48f260bc1a6
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
