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

export type orderAboutPortfolioListType = {
  [key: string]: Function;
  popular: Function;
  recent: Function;
  views: Function;
};
