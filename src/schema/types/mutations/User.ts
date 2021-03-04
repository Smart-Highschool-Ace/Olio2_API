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

export interface UserUpdateArgs {
    school?: School;
    name?: string;
    profile_image?: string;
    introduction?: string;
}

export const updateUser = {
    args: {
        user: nonNull(arg({ type: "UserUpdateInput" })),
    },
    resolve: async (_: any, args: any, ctx: any) => {
        const user_id = ctx.user_id;
        const updateArgs: UserUpdateArgs = args.user;
        const updated_user = await UserService.updateUser(user_id, updateArgs);
        return updated_user;
    },
    type: "User",
};
export const deleteUser = {
    resolve: async (_: any, args: any, ctx: any) => {
        const deleted_user = await UserService.deleteUser(args.user);
        return deleted_user;
    },
    type: "User",
};
