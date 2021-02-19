import { PrismaClient } from "@prisma/client";
import { objectType, queryType, intArg, extendType, inputObjectType, arg } from "nexus";

import { Portfolio, Project } from "schema/types";

const prisma = new PrismaClient();

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("email");
    t.string("school");
    t.string("profile_image");
    t.string("introduction");
    t.int("entrance_year");
    t.int("grade", {
      resolve: (root) => {
        return new Date().getFullYear() - root.entrance_year;
      },
    });
    t.field("portfolio", {
      type: Portfolio,
      resolve: async (root, _, __) => {
        return await prisma.portfolio.findFirst({
          where: {
            id: root.id,
          },
        });
      },
    });
    t.list.field("projects", {
      type: Project,
      resolve: async (root, _, __) => {
        return await prisma.project.findMany({
          where: {
            owner_id: root.id,
          },
        });
      },
    });
    t.list.field("participated_projects", {
      type: Project,
      resolve: () => {
        return "these are my projects participated";
      },
    });
    t.list.field("liked_projects", {
      type: Project,
      resolve: () => {
        return "these are my favorite projects";
      },
    });
    t.list.field("liked_portfolios", {
      type: Portfolio,
      resolve: () => {
        return "these are my favorite portfolios";
      },
    });
  },
});

export const QueryUser = queryType({
  definition(t) {
    t.list.field("AllUser", {
      type: User,
      resolve: async () => {
        return await prisma.user.findMany();
      },
    });
    t.field("User", {
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

    t.nonNull.field('deleteUser', {
      type: 'User',
      resolve(_, args, ctx) {
        const mock_user = { // 임의의 유저를 반환 (제거된 유저)
          id : 1,
          name : "mock_user-name",
          school : 1,
          profile_image : "mock_user-profile_image",
          introduction : "mock_user-introduction",
          entrance_year : 2020,
          grade : 1,
        }
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
  name : 'UserUpdateInput',
  definition(t){
    t.nonNull.int('school')
    t.nonNull.string('name')
    t.nonNull.int('entrance_year')
    t.nonNull.string('profile_image')
    t.nonNull.string('introduction')
  },
})