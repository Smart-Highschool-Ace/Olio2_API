import { PrismaClient } from "@prisma/client";
import { objectType, queryType, intArg } from "nexus";

const prisma = new PrismaClient();

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("school");
    t.string("profile_image");
    t.string("introduction");
    t.int("entrance_year");
    t.int("grade", {
      resolve: (root) => {
        return new Date().getFullYear() - root.entrance_year;
      },
    });
  },
});

export const Query = queryType({
  definition(t) {
    t.list.field("allUser", {
      type: User,
      resolve: async () => {
        return await prisma.user.findMany();
      },
    });
    t.field("user", {
      type: User,
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
