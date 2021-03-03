import { arg, nonNull } from "nexus";

import { School } from "@prisma/client";
import { UserService } from "service";

export interface UserCreateArgs {
    email: string;
    password: string;
    school: School;
    name: string;
    entrance_year: number;
    profile_image?: string;
    introduction?: string;
}

export const createUser = {
    args: {
        user: nonNull(arg({ type: "UserCreateInput" })),
    },
    resolve: async (_: any, args: any, ctx: any) => {
        const createArgs: UserCreateArgs = args.user;
        const new_user = await UserService.createUser(createArgs);
        return new_user;
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
