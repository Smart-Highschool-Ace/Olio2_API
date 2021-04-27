import { PrismaClient } from "@prisma/client";

import { PortfolioUpdateArgs } from "interface/Portfolio";
import { parse_yyyy_mm_dd } from "util/date";
import { SkillService } from "service";
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
      introduction: updateArgs.introduction,
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
        create: await Promise.all(
          updateArgs.skills.map(async (skill) => {
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
          })
        ),
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

export const getPortfolios = async () => {
  return await prisma.portfolio.findMany({});
};

export const findPortfolioByName = async (name: string) => {
  return (
    await prisma.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      select: {
        Portfolio: true,
      },
    })
  ).map((portfolio) => {
    return portfolio.Portfolio;
  });
};
