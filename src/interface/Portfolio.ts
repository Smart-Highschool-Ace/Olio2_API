import {
  PortfolioCertificate,
  PortfolioPrize,
  PortfolioProject,
  PortfolioSkill,
} from "@prisma/client";

export interface PortfolioUpdateArgs {
  email?: string;
  certificates?: PortfolioCertificate[];
  prizes?: PortfolioPrize[];
  projects?: PortfolioProject[];
  skills?: PortfolioSkill[];
}
