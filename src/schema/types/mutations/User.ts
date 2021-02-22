import { arg, nonNull } from "nexus";

export const createUser = {
  args: {
    user: nonNull(arg({ type: "UserCreateInput" })),
  },
  resolve(_: any, args: any, ctx: any) {
    // TODO : prisma로 create user 구현
    const mock_user = args.user;
    return mock_user;
  },
  type: "User",
};
export const updateUser = {
  args: {
    user: nonNull(arg({ type: "UserUpdateInput" })),
  },
  resolve(_: any, args: any, ctx: any) {
    // TODO : prisma로 update user 구현
    const mock_user = args.user;
    return mock_user;
  },
  type: "User",
};

export const deleteUser = {
  resolve(_: any, args: any, ctx: any) {
    // TODO : prisma로 delete user 구현
    const mock_user = {
      id: 1,
      name: "mock_user-name",
      school: 1,
      profile_image: "mock_user-profile_image",
      introduction: "mock_user-introduction",
      entrance_year: 2020,
      grade: 1,
    };
    return mock_user;
  },
  type: "User",
};
