import { PrismaClient } from "@prisma/client";

import { verifyToken } from "./util/token";

export const createContext: Function = async ({
  event,
  _,
}: any): Promise<{
  userId?: number;
}> => {
  const prisma = new PrismaClient();
  const token =
    event.headers.authorization || event.headers.Authorization || null;
  if (token) {
    const { userId } = verifyToken(token);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (user) {
      return { userId: user.id };
    }
  }
  return {};
};
