import {
  PortfolioCertificate,
  PortfolioPrize,
  PortfolioProject,
} from "@prisma/client";
import { getViewAboutPortfolio } from "service/portfolio";

export interface PortfolioUpdateArgs {
  email?: string;
  introduction?: string;
  certificates?: PortfolioCertificate[];
  prizes?: PortfolioPrize[];
  projects?: PortfolioProject[];
  skills?: portfolioInputSkill[];
}

type portfolioInputSkill = {
  id: number;
  portfolio_id: number;
  name: string;
  level: number;
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
    createdAt: orderAscDesc,
  };
};
export const orderAboutPortfolioList: orderAboutPortfolioListType = {
  popular: getLikeFirst,
  views: getViewFirst,
  recent: getRecentFirst,
};

type orderAboutPortfolioListType = {
  [key: string]: Function;
  popular: Function;
  recent: Function;
  views: Function;
};
