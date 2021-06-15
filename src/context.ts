import { Context } from "koa";

import { PrismaClient } from "@prisma/client";

import { verifyToken } from "./util/token";

export const createContext: Function = async ({
  ctx,
}: Context): Promise<{
  userId: number;
}> => {
  const prisma = new PrismaClient();
  if (ctx.request.header.authorization) {
    const { userId } = verifyToken(ctx.request.header.authorization);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (user) {
      return { userId: user.id };
    }
  }
};
