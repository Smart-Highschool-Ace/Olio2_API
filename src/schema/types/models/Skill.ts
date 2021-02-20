import { objectType } from "nexus";

export const Skill = objectType({
  name: "Skill",
  definition(t) {
    t.string("name");
  },
});
