import { objectType } from "nexus";

export const Skill = objectType({
  name: "Skill",
  definition(t) {
    t.id("id");
    t.string("name");
  },
});
