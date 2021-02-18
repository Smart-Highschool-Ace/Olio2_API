import { PrismaClient } from "@prisma/client";
import { objectType, queryType, extendType, inputObjectType, arg, nonNull, intArg } from "nexus";

export const MutationPortfolio = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updatePortfolio', {
      type: 'String',
      args: {
        user : arg({type : PortfolioUpdateInput})
      },
      resolve(_, args, ctx) { // 후에 포트폴리오 수정 구현
        const mock_link = "http://mock-example.com"
        return mock_link 
      }
    })
  }
});

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
