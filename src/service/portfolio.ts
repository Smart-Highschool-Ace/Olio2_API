import {
  Portfolio,
  PortfolioCertificate,
  PortfolioLike,
  PortfolioPrize,
  PortfolioProject,
  PortfolioSkill,
  PortfolioView,
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
import { PortfolioRepository } from "../repository";
import { OrderDirectionType } from "../constant";

export const createPortfolio: Function = async (
  userId: number,
): Promise<Portfolio> => PortfolioRepository.create(userId);

export const portfolioHaveLike: Function = async (
  portfolioId: number,
  userId: number,
): Promise<boolean> =>
  !!(await PortfolioRepository.getLikeByUserIdPortfolioId(portfolioId, userId));

export const getViewAboutPortfolio: Function = async (
  portfolioId: number,
): Promise<number> => PortfolioRepository.getViewAboutPortfolio(portfolioId);

export const getLikesAboutPortfolioByPortfolio: Function = async (
  portfolioId: number,
): Promise<PortfolioLike[]> =>
  PortfolioRepository.getLikesAboutPortfolio(portfolioId);

export const modifyPortfolio: Function = async (
  id: number,
  {
    PortfolioCertificate,
    PortfolioSkill,
    PortfolioPrize,
    PortfolioProject,
    ...args
  }: PortfolioUpdateArgs,
): Promise<void> => {
  const wrapUpdateArgs = (create: any) => ({ deleteMany: {}, create });
  await PortfolioRepository.update(id, {
    ...args,
    PortfolioCertificate: PortfolioCertificate
      ? wrapUpdateArgs(
          PortfolioCertificate?.map(
            ({ certified_at, ...etc }: PortfolioCertificate) => ({
              certified_at: parse_yyyy_mm_dd(String(certified_at)),
              ...etc,
            }),
          ),
        )
      : undefined,
    PortfolioSkill: PortfolioSkill
      ? wrapUpdateArgs(
          await pipe(
            PortfolioSkill,
            map(async (skill) => {
              const localSkill = await SkillService.getSkillByName(skill.name);
              if (localSkill) {
                return { skill_id: localSkill.id, level: skill.level };
              }
              return {
                skill_id: (await SkillService.AddSkill(skill.name)).id,
                level: skill.level,
              };
            }),
            toAsync,
            toArray,
          ),
        )
      : undefined,
    PortfolioProject: PortfolioProject
      ? wrapUpdateArgs(PortfolioProject)
      : undefined,
    PortfolioPrize: PortfolioPrize
      ? wrapUpdateArgs(
          PortfolioPrize.map((prized_at, ...etc) => ({
            prized_at: parse_yyyy_mm_dd(String(prized_at)),
            ...etc,
          })),
        )
      : undefined,
  });
};

export const getLikePortfolio: Function = async (
  userId: number,
  portfolioId: number,
): Promise<PortfolioLike | null> =>
  PortfolioRepository.getLike(userId, portfolioId);

export const createLikePortfolio: Function = async (
  user_id: number,
  portfolio_id: number,
): Promise<void> => PortfolioRepository.insertLike(user_id, portfolio_id);

export const deleteLikePortfolio: Function = async (
  user_id: number,
  portfolio_id: number,
): Promise<void> => PortfolioRepository.deleteLike(user_id, portfolio_id);

export const getPortfolio: Function = (
  id: number,
): Promise<
  | (Portfolio & {
      owner: User;
      PortfolioView: PortfolioView[];
      PortfolioSkill: PortfolioSkill[];
      PortfolioProject: PortfolioProject[];
      PortfolioPrize: PortfolioPrize[];
      PortfolioCertificate: PortfolioCertificate[];
    })
  | null
> => PortfolioRepository.getById(id);

export const getPortfolioByUser: Function = (
  user_id: number,
): Promise<Portfolio | null> => PortfolioRepository.getPortfolioByUser(user_id);

export const getLikedPortfoliosOfUser: Function = async (
  userId: number,
): Promise<Portfolio[]> =>
  (await PortfolioRepository.getLikedByUser(userId)).map(
    (item: { portfolio: Portfolio }) => item.portfolio,
  );

export const getPortfolios: Function = (): Promise<Portfolio[]> =>
  PortfolioRepository.getPortfolios({});

export const findPortfolioByName: Function = async (
  args: SearchArgument,
): Promise<(Portfolio | null)[]> =>
  PortfolioRepository.findPortfolioByName(args);

export const createPortfolioView = async (
  portfolioId: number,
  userId?: number,
) => {
  PortfolioRepository.incrementView(portfolioId);
  PortfolioRepository.insertView(portfolioId, userId);
};

export const joinPortfolio: Function = async (id: number, userId: number) => {
  await createPortfolioView(userId, id);
  return getPortfolio(id);
};

const getLikeFirst: Function = (orderAscDesc: OrderDirectionType) => ({
  Portfolio: {
    PortfolioLike: {
      count: orderAscDesc,
    },
  },
});

const getViewFirst: Function = (orderAscDesc: OrderDirectionType) => ({
  PortfolioView: {
    count: orderAscDesc,
  },
});
const getRecentFirst: Function = (orderAscDesc: OrderDirectionType) =>
  -{
    created_at: orderAscDesc,
  };
export const orderAboutPortfolioList: orderAboutPortfolioListType = {
  popular: getLikeFirst,
  views: getViewFirst,
  recent: getRecentFirst,
};
