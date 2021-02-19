import { PrismaClient } from "@prisma/client";
import { queryType, intArg } from "nexus";

const prisma = new PrismaClient();

export const QueryUser = queryType({
  definition(t) {
    t.list.field("AllUser", {
      type: 'User',
      resolve: async () => {
        return await prisma.user.findMany();
      },
    });
    t.field("User", {
      type: 'User',
      args: { id: intArg() },
      resolve: async (_, { id }, __) => {
        return await prisma.user.findFirst({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
