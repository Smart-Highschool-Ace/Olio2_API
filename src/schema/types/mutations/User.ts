import { arg, nonNull, stringArg } from "nexus";

import { PortfolioService, UserService } from "service";
import { UserCreateArgs, UserUpdateArgs } from "interface/User";
import { checkAuthCode, sendAuthCode } from "util/emailAuth";
import { Context, Result } from "interface";

export const login = {
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any): Promise<Result> => {
    return await UserService.login(args.email, args.password);
  },
  type: "loginResult",
};

export const checkEmail = {
  args: {
    email: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any): Promise<Result> => {
    return await UserService.checkEmail(args.email);
  },
  type: "statusResult",
};

export const sendAuthEmail = {
  args: {
    email: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any) => {
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
  resolve: async (_: any, args: any, __: any) => {
    const result = await checkAuthCode(args.email, args.code);
    return result;
  },
  type: "statusResult",
};

export const createUser = {
  args: {
    user: nonNull(arg({ type: "UserCreateInput" })),
  },
  resolve: async (_: any, user: UserCreateArgs, __: any) => {
    const new_user = await UserService.createUser(user);
    const new_portfolio = await PortfolioService.createPortfolio(new_user.id);
    return new_user;
  },
  type: "User",
};

export const updateUser = {
  args: {
    user: nonNull(arg({ type: "UserUpdateInput" })),
  },
  resolve: async (_: any, user: UserUpdateArgs, ctx: Context) => {
    const updated_user = await UserService.updateUser(ctx.userId, user);
    return updated_user;
  },
  type: "User",
};
export const deleteUser = {
  resolve: async (_: any, args: any, ctx: Context) => {
    const deleted_user = await UserService.deleteUser(ctx.userId);
    return deleted_user;
  },
  type: "User",
};
