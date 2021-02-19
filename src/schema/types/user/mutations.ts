import { arg, mutationType } from "nexus";


export const MutationUser = mutationType({
  definition(t) {
    t.nonNull.field('createUser', {
      args: {
        user : arg({type : 'UserCreateInput'})
      },
      resolve(_, args, ctx) { // TODO : prisma로 create user 구현
        const mock_user = args.user 
        return mock_user
      },
      type: 'User'
    })

    t.nonNull.field('updateUser', {
      args: {
        user : arg({type : 'UserUpdateInput'})
      },
      resolve(_, args, ctx) { // TODO : prisma로 update user 구현
        const mock_user = args.user 
        return mock_user
      },
      type: 'User'
    })

    t.nonNull.field('deleteUser', {
      resolve(_, args, ctx) { // TODO : prisma로 delete user 구현
        const mock_user = { 
          id : 1,
          name : "mock_user-name",
          school : 1,
          profile_image : "mock_user-profile_image",
          introduction : "mock_user-introduction",
          entrance_year : 2020,
          grade : 1,
        }
        return mock_user
      },
      type: 'User'
    })
  }
})
