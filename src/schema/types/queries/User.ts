import { User } from "@prisma/client";
import { intArg } from "nexus";
import { UserService } from "service";

import { Context } from "../../../interface";

export const allUser = {
  type: "User",
  resolve: async (_: any, __: any, ctx: Context): Promise<User[]> => {
    return await ctx.prisma.user.findMany();
  },
};

export const user = {
  type: "User",
  args: { id: intArg() },
  resolve: async (_: any, args: any, ctx: Context): Promise<User> => {
    return await UserService.getUser(ctx.prisma, args.id);
  },
};
