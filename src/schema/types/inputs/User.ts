import { inputObjectType } from "nexus";

export const UserUpdateInput = inputObjectType({
  name: "UserUpdateInput",
  definition(t) {
    t.string("name");
    t.string("profile_image");
  },
});
