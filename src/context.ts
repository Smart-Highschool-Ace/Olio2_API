import { PrismaClient } from "@prisma/client";

import { verifyToken } from "./util/token";

export const createContext: Function = async ({
  event,
  context,
}: any): Promise<{
  userId: number;
}> => {
  const prisma = new PrismaClient();
  if (event.headers.authorization) {
    const { userId } = verifyToken(event.headers.authorization);

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
