import { arg, nonNull, intArg, mutationType } from "nexus";

export const MutationPortfolio = mutationType({
  definition(t) {
    t.nonNull.field('updatePortfolio', {
      args: {
        user : arg({type : 'PortfolioUpdateInput'})
      },
      resolve: (_, args, ctx) => { // 후에 포트폴리오 수정 구현
        const mock_link = "http://mock-example.com"
        return mock_link 
      },
      type: 'String'
    })

    t.nonNull.field('likePortfolio', {
      args: {
          id : nonNull(intArg())
      },
      resolve: (_, args, ctx) => { // 후에 좋아요 로직 구현
          return true 
      },
      type: 'Boolean'
    })
  }
});
