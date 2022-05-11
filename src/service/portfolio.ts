import {
  Portfolio,
  PortfolioCertificate,
  PortfolioLike,
  PortfolioPrize,
  PortfolioProject,
  PortfolioSkill,
  PortfolioView,
  PrismaClient,
  User,
} from "@prisma/client";

import {
  orderAboutPortfolioListType,
  PortfolioUpdateArgs,
  SearchArgument,
} from "../interface";
import { parse_yyyy_mm_dd } from "../util/date";
import { SkillService } from "../service";
import { map, pipe, toArray, toAsync } from "@fxts/core";
const prisma = new PrismaClient();

export const createPortfolio: Function = async (
  user_id: number,
): Promise<Portfolio> => {
  return prisma.portfolio.create({
    data: {
      owner: {
        connect: { id: user_id },
      },
    },
  });
};

export const portfolioHaveLike: Function = async (
  portfolio_id: number,
  user_id: number,
): Promise<boolean> => {
  const liked = await prisma.portfolioLike.findFirst({
    where: {
      portfolio_id: portfolio_id,
      user_id: user_id,
    },
  });

  return !!liked;
};
export const getViewAboutPortfolio: Function = async (
  portfolio_id: number,
): Promise<number> => {
  return prisma.portfolioView.count({
    where: {
      portfolio_id,
    },
  });
};

export const getLikesAboutPortfolioByPortfolio: Function = async (
  portfolio_id: number,
): Promise<PortfolioLike[]> => {
  return prisma.portfolioLike.findMany({
    where: {
      portfolio_id,
    },
  });
};

export const modifyPortfolio: Function = async (
  id: number,
  updateArgs: PortfolioUpdateArgs,
): Promise<void> => {
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
      introduction: updateArgs.introduction,
      PortfolioCertificate: {
        deleteMany: {},
        create: pipe(
          updateArgs.certificates,
          map((certificateArgs) => {
            return {
              name: certificateArgs.name,
              institution: certificateArgs.institution,
              certified_at: parse_yyyy_mm_dd(certificateArgs.certified_at),
            };
          }),
          toArray,
        ),
      },
      PortfolioSkill: {
        deleteMany: {},
        create: await pipe(
          updateArgs.skills,
          map(async (skill) => {
            const localSkill = await SkillService.getSkillByName(skill.name);
            if (localSkill == null) {
              const skill_id = (await SkillService.AddSkill(skill.name)).id;
              return {
                skill_id: skill_id,
                level: skill.level,
              };
            }
            return {
              skill_id: localSkill.id,
              level: skill.level,
            };
          }),
          toAsync,
          toArray,
        ),
      },
      PortfolioProject: {
        deleteMany: {},
        create: pipe(
          updateArgs.projects,
          map((project) => {
            return {
              project_id: project.project_id,
              order: project.order,
            };
          }),
          toArray,
        ),
      },
      PortfolioPrize: {
        deleteMany: {},
        create: pipe(
          updateArgs.prizes,
          map((prize) => {
            return {
              name: prize.name,
              institution: prize.institution,
              prized_at: parse_yyyy_mm_dd(prize.prized_at),
            };
          }),
          toArray,
        ),
      },
    },
  });
};

export const getLikePortfolio: Function = async (
  user_id: number,
  portfolio_id: number,
): Promise<PortfolioLike> => {
  const liked = await prisma.portfolioLike.findFirst({
    where: {
      user_id: user_id,
      portfolio_id: portfolio_id,
    },
  });
  return liked;
};

export const createLikePortfolio: Function = async (
  user_id: number,
  portfolio_id: number,
): Promise<void> => {
  await prisma.portfolioLike.create({
    data: {
      user_id: user_id,
      portfolio_id: portfolio_id,
    },
  });
};

export const deleteLikePortfolio: Function = async (
  user_id: number,
  portfolio_id: number,
): Promise<void> => {
  await prisma.portfolioLike.deleteMany({
    where: {
      user_id: user_id,
      portfolio_id: portfolio_id,
    },
  });
};

export const getPortfolio: Function = (
  id: number,
): Promise<
  Portfolio & {
    owner: User;
    PortfolioView: PortfolioView[];
    PortfolioSkill: PortfolioSkill[];
    PortfolioProject: PortfolioProject[];
    PortfolioPrize: PortfolioPrize[];
    PortfolioCertificate: PortfolioCertificate[];
  }
> => {
  return prisma.portfolio.findFirst({
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
};

export const getPortfolioByUser: Function = (
  user_id: number,
): Promise<Portfolio> => {
  return prisma.portfolio.findFirst({
    where: {
      owner: {
        id: user_id,
      },
    },
  });
};

export const getLikedPortfoliosOfUser: Function = async (
  userId: number,
): Promise<Portfolio[]> => {
  const result = await prisma.portfolioLike.findMany({
    where: {
      user_id: userId,
    },
    select: {
      portfolio: true,
    },
  });
  return pipe(
    result,
    map((item) => item.portfolio),
    toArray,
  );
};

export const getPortfolios: Function = (): Promise<Portfolio[]> => {
  return prisma.portfolio.findMany({});
};

export const findPortfolioByName: Function = async (
  args: SearchArgument,
): Promise<Portfolio[]> => {
  return pipe(
    await prisma.user.findMany({
      where: {
        name: {
          contains: args.name,
        },
      },
      select: {
        Portfolio: true,
      },
      orderBy: args.orderBy,
      skip: (args.page - 1) * 15,
      take: 15,
    }),
    map((user) => user.Portfolio),
    toArray,
  );
};

export const createPortfolioView = async (
  portfolioId: number,
  userId?: number,
) => {
  await prisma.portfolioView.create({
    data: { user_id: userId, portfolio_id: portfolioId },
  });
};

const getLikeFirst: Function = (orderAscDesc: string): Object => {
  return {
    Portfolio: {
      PortfolioLike: {
        count: orderAscDesc,
      },
    },
  };
};
const getViewFirst: Function = (orderAscDesc: string): Object => {
  return {
    PortfolioView: {
      count: orderAscDesc,
    },
  };
};
const getRecentFirst: Function = (orderAscDesc: string): Object => {
  return {
    created_at: orderAscDesc,
  };
};
export const orderAboutPortfolioList: orderAboutPortfolioListType = {
  popular: getLikeFirst,
  views: getViewFirst,
  recent: getRecentFirst,
};
