import { Context } from "./interface/Context";
import { getUser } from "./service/user";
import { verifyToken } from "./util/token";
import prisma from "./prisma";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const createContext: Function = async ({
  event,
  context,
}: any): Promise<Context> => {
  const token =
    event.headers.authorization || event.headers.Authorization || null;
  if (!token) {
    return { prisma: prisma };
  }

  let user;
  try {
    const { userId } = verifyToken(token);
    user = await getUser(prisma, userId);
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return { prisma: prisma };
    } else if (e instanceof JsonWebTokenError) {
      return { prisma: prisma };
    } else {
      throw e;
    }
  }
  if (!user) {
    return { prisma: prisma };
  }

  return { prisma: prisma, userId: user.id };
};
