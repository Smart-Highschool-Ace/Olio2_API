import { Portfolio, PrismaClient } from "@prisma/client";
import { PROJECT_PAGE_CONTENT_COUNT } from "../constant";
import { PortfolioModifyDTO, SearchArgument } from "../interface";

const prisma = new PrismaClient();

export const create: Function = async (id: number) =>
  prisma.portfolio.create({ data: { owner: { connect: { id } } } });

export const insertView: Function = async (
  portfolio_id: number,
  user_id?: number,
) => prisma.portfolioView.create({ data: { portfolio_id, user_id } });

export const incrementView: Function = async (id: number) =>
  prisma.portfolio.update({
    where: { id },
    data: { view_count: { increment: 1 } },
  });
export const getLikeByUserIdPortfolioId: Function = async (
  portfolio_id: number,
  user_id: number,
) => prisma.portfolioLike.findFirst({ where: { portfolio_id, user_id } });

export const getViewAboutPortfolio: Function = async (portfolio_id: number) =>
  prisma.portfolioView.count({ where: { portfolio_id } });

export const getLikesAboutPortfolio: Function = async (portfolio_id: number) =>
  prisma.portfolioLike.findMany({ where: { portfolio_id } });

export const update: Function = async (id: number, data: PortfolioModifyDTO) =>
  prisma.portfolio.update({
    where: { id },
    data,
  });

export const getLike: Function = async (
  user_id: number,
  portfolio_id: number,
) => prisma.portfolioLike.findFirst({ where: { user_id, portfolio_id } });

export const insertLike: Function = async (
  user_id: number,
  portfolio_id: number,
) =>
  prisma.portfolioLike.create({
    data: { user_id, portfolio_id },
  });

export const deleteLike: Function = async (
  user_id: number,
  portfolio_id: number,
) => prisma.portfolioLike.deleteMany({ where: { user_id, portfolio_id } });

export const getById: Function = (id: number) =>
  prisma.portfolio.findFirst({
    where: {
      id: id,
    },
    include: {
      owner: true,
      PortfolioView: true,
      PortfolioSkill: true,
      PortfolioProject: true,
      PortfolioPrize: true,
      PortfolioCertificate: true,
      PortfolioLike: true,
    },
  });

export const getPortfolioByUser: Function = async (id: number) =>
  prisma.portfolio.findFirst({ where: { owner: { id } } });

export const getLikedByUser: Function = async (
  user_id: number,
): Promise<{ portfolio: Portfolio }[] | null> =>
  prisma.portfolioLike.findMany({
    where: { user_id },
    select: { portfolio: true },
  });

export const getPortfolios = prisma.portfolio.findMany;

export const findPortfolioByName: Function = async ({
  name,
  orderBy,
  page,
}: SearchArgument) =>
  (
    await prisma.user.findMany({
      where: { name: { contains: name } },
      select: { Portfolio: true },
      orderBy,
      skip: (page - 1) * PROJECT_PAGE_CONTENT_COUNT,
      take: PROJECT_PAGE_CONTENT_COUNT,
    })
  ).map(({ Portfolio }) => Portfolio);
