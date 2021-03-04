import { arg, nonNull } from "nexus";

import { School } from "@prisma/client";
import { UserService } from "service";

export interface UserCreateArgs {
    user: {
        email: string;
        password: string;
        school: School;
        name: string;
        entrance_year: number;
        profile_image?: string;
        introduction?: string;
    };
}

export const createUser = {
    args: {
        user: nonNull(arg({ type: "UserCreateInput" })),
    },
    resolve: async (_: any, { user }: UserCreateArgs, ctx: any) => {
        const new_user = await UserService.createUser(user);
        return new_user;
    },
    type: "User",
};

export interface UserUpdateArgs {
    user: {
        school?: School;
        name?: string;
        profile_image?: string;
        introduction?: string;
    };
}

export const updateUser = {
    args: {
        user: nonNull(arg({ type: "UserUpdateInput" })),
    },
    resolve: async (_: any, { user }: UserUpdateArgs, ctx: any) => {
        const updated_user = await UserService.updateUser(ctx.user_id, user);
        return updated_user;
    },
    type: "User",
};
export const deleteUser = {
    resolve: async (_: any, args: any, ctx: any) => {
        const deleted_user = await UserService.deleteUser(ctx.user_id);
        return deleted_user;
    },
    type: "User",
};
