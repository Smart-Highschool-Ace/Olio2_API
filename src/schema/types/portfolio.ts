import { PrismaClient } from "@prisma/client";
import { objectType, queryType, extendType, inputObjectType, arg, nonNull, intArg } from "nexus";

const PortfolioUpdateInput = inputObjectType({
  name : 'PortfolioUpdateInput',
  definition(t){
    t.nonNull.string('email')
    t.nonNull.field('PortfolioSkill', {
        type: PortfolioSkill
    })
    t.nonNull.field('PortfolioProject', {
        type: PortfolioSkill
    })
    t.nonNull.field('PortfolioPrize', {
        type: PortfolioSkill
    })
    t.nonNull.field('PortfolioCertificate', {
        type: PortfolioCertificate
    })
  },
})
