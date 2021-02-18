import { PrismaClient } from "@prisma/client";
import { objectType, queryType, intArg, extendType, inputObjectType, arg } from "nexus";

const prisma = new PrismaClient();

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("school");
    t.string("profile_image");
    t.string("introduction");
    t.int("entrance_year");
    t.int("grade", {
      resolve: (root) => {
        return new Date().getFullYear() - root.entrance_year;
      },
    });
  },
});

export const QueryUser = queryType({
  definition(t) {
    t.list.field("allUser", {
      type: User,
      resolve: async () => {
        return await prisma.user.findMany();
      },
    });
    t.field("user", {
      type: User,
      args: { id: intArg() },
      resolve: async (_, { id }, __) => {
        return await prisma.user.findFirst({
          where: {
            id: id,
          },
        });
      },
    });
  },
});

export const MutationUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'User',
      args: {
        user : arg({type : UserCreateInput})
      },
      resolve(_, args, ctx) {
        const mock_user = args.user // 일단 입력받은 값 그대로 돌려줌
        return mock_user
      }
    })

    t.nonNull.field('updateUser', {
      type: 'User',
      args: {
        user : arg({type : UserUpdateInput})
      },
      resolve(_, args, ctx) {
        const mock_user = args.user // 일단 입력받은 값 그대로 돌려줌
        return mock_user
      }
    })
  }
})

const UserCreateInput = inputObjectType({
  name : 'UserCreateInput',
  definition(t){
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.int('school')
    t.nonNull.string('name')
    t.nonNull.int('entrance_year')
    t.string('profile_image')
    t.string('introduction')
  },
})

const UserUpdateInput = inputObjectType({
  name : 'UserCreateInput',
  definition(t){
    t.nonNull.int('school')
    t.nonNull.string('name')
    t.nonNull.int('entrance_year')
    t.nonNull.string('profile_image')
    t.nonNull.string('introduction')
  },
})