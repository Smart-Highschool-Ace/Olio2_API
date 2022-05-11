import { arg, nonNull, stringArg } from "nexus";

import { PortfolioService, UserService } from "../../../service";
import { UserCreateArgs, UserUpdateArgs } from "../../../interface/User";
import { checkAuthCode, sendAuthCode } from "../../../util/emailAuth";
import { Context, Result } from "../../../interface";

export const login = {
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: (_: any, args: any, __: any): Promise<Result> => {
    return UserService.login(args.email, args.password);
  },
  type: "loginResult",
};

export const checkEmail = {
  args: {
    email: nonNull(stringArg()),
  },
  resolve: (_: any, args: any, __: any): Promise<Result> => {
    return UserService.checkEmail(args.email);
  },
  type: "statusResult",
};

export const sendAuthEmail = {
  args: {
    email: nonNull(stringArg()),
  },
  resolve: (_: any, args: any, __: any) => {
    return sendAuthCode(args.email);
  },
  type: "statusResult",
};
export const authenticateEmail = {
  args: {
    email: nonNull(stringArg()),
    code: nonNull(stringArg()),
  },
  resolve: (_: any, args: any, __: any) => {
    return checkAuthCode(args.email, args.code);
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
  resolve: (_: any, user: UserUpdateArgs, ctx: Context) => {
    return UserService.updateUser(ctx.userId, user);
  },
  type: "User",
};
export const deleteUser = {
  resolve: async (_: any, __: any, ctx: Context) => {
    return UserService.deleteUser(ctx.userId);
  },
  type: "User",
};
