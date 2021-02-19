import { arg, mutationType } from "nexus";

export const MutationProject = mutationType({
  definition(t) {
    t.nonNull.field('createProject', {
      args: {
        user : arg({type : 'ProjectCreateInput'})
      },
      resolve(_, args, ctx) { // 후에 프로젝트 생성 구현
        const mock_link = "http://mock-example.com"
        return mock_link
      },
      type: 'String'
    })
  }
})
  