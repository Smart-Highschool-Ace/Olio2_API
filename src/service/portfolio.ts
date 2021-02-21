import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPortfolio = async (id: number) => {
  return await prisma.portfolio.findFirst({
    where: {
      id: id,
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
