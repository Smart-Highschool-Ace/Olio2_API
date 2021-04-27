import { inputObjectType } from "nexus";

export const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("school");
    t.nonNull.string("name");
    t.nonNull.int("entrance_year");
    t.string("profile_image");
  },
});

export const UserUpdateInput = inputObjectType({
  name: "UserUpdateInput",
  definition(t) {
    t.string("school");
    t.string("name");
    t.int("entrance_year");
    t.string("profile_image");
  },
});
