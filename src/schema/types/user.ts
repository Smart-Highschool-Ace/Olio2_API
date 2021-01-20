import { objectType, queryType, intArg } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("name");
    t.string("email");
    t.string("password");
    t.string("createdAt");
  },
});

export const Query = queryType({
  definition(t) {
    t.field("user", {
      type: User,
      args: { id: intArg() },
      async resolve(_root, { id }, ctx) {
        return await ctx.prisma.user.findFirst({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
