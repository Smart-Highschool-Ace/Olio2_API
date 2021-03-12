import { arg, nonNull, stringArg } from "nexus";

import { UserService } from "service";
import { UserCreateArgs, UserUpdateArgs } from "interface/User";
import { checkAuthCode, sendAuthCode } from "util/emailAuth";

export const login = {
    args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
    },
    resolve: async (_: any, args: any, __ : any) => {
        const result = await UserService.login(args.email, args.password);
        return result;
    },
    type: "loginResult",
};

export const checkEmail = {
    args: {
        email: nonNull(stringArg()),
    },
    resolve: async (_: any, args: any, ctx: any) => {
        const result = await UserService.checkEmail(args.email);
        return result;
    },
    type: "statusResult",
};

export const sendAuthEmail = {
    args: {
        email: nonNull(stringArg()),
    },
    resolve: async (_: any, args: any, ctx: any) => {
        const result = await sendAuthCode(args.email);
        return result;
    },
    type: "statusResult",
};
export const authenticateEmail = {
    args: {
        email: nonNull(stringArg()),
        code: nonNull(stringArg()),
    },
    resolve: async (_: any, args: any, ctx: any) => {
        const result = await checkAuthCode(args.email, args.code);
        return result;
    },
    type: "statusResult",
};

export const createUser = {
    args: {
        user: nonNull(arg({ type: "UserCreateInput" })),
    },
    resolve: async (_: any, user: UserCreateArgs, ctx: any) => {
        const new_user = await UserService.createUser(user);
        return new_user;
    },
    type: "User",
};

export const updateUser = {
    args: {
        user: nonNull(arg({ type: "UserUpdateInput" })),
    },
    resolve: async (_: any, user: UserUpdateArgs, ctx: any) => {
        const updated_user = await UserService.updateUser(ctx.userId, user);
        return updated_user;
    },
    type: "User",
};
export const deleteUser = {
    resolve: async (_: any, args: any, ctx: any) => {
        const deleted_user = await UserService.deleteUser(ctx.userId);
        return deleted_user;
    },
    type: "User",
};
