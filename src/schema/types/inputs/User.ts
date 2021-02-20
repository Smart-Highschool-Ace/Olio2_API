import { inputObjectType } from "nexus";

export const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.int("school");
    t.nonNull.string("name");
    t.nonNull.int("entrance_year");
    t.string("profile_image");
    t.string("introduction");
  },
});

export const UserUpdateInput = inputObjectType({
  name: "UserUpdateInput",
  definition(t) {
    t.nonNull.int("school");
    t.nonNull.string("name");
    t.nonNull.int("entrance_year");
    t.nonNull.string("profile_image");
    t.nonNull.string("introduction");
  },
});
