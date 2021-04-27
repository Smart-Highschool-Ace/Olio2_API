import {
  PortfolioCertificate,
  PortfolioPrize,
  PortfolioProject,
} from "@prisma/client";

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
