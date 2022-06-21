import {
  PortfolioCertificate,
  PortfolioPrize,
  PortfolioProject,
} from "@prisma/client";

export interface PortfolioUpdateArgs {
  email?: string;
  introduction?: string;
  PortfolioCertificate?: PortfolioCertificate[];
  PortfolioPrize?: PortfolioPrize[];
  PortfolioProject?: PortfolioProject[];
  PortfolioSkill?: PortfolioSkill[];
}

export interface PortfolioModifyDTO {
  email?: string;
  introduction?: string;
  PortfolioCertificate?: { create: PortfolioCertificate[] };
  PortfolioPrize?: { create: PortfolioPrize[] };
  PortfolioProject?: { create: PortfolioProject[] };
  PortfolioSkill?: { create: { skill_id: number; level: number }[] };
}

type PortfolioSkill = {
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
