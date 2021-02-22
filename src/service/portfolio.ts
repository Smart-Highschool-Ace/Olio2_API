import {
  PortfolioCertificate,
  PortfolioPrize,
  PortfolioProject,
  PortfolioSkill,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();

export const getPortfolioByUser = async (id: number) => {
  return await prisma.portfolio.findFirst({
    where: {
      owner: {
        id: id,
      },
    },
  });
};

export const modifyPortfolio = async (
  id: number,
  email: string,
  skils: PortfolioSkill,
  projects: PortfolioProject,
  prize: PortfolioPrize,
  certificates: PortfolioCertificate
) => {
  await prisma.portfolio.update({
    where: {
      id: id,
    },
    data: {
      owner: {
        update: {
          email: email,
        },
      },
      PortfolioSkill: {
        set: skils,
      },
      PortfolioProject: {
        set: projects,
      },
      PortfolioPrize: {
        set: prize,
      },
      PortfolioCertificate: {
        set: certificates,
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
