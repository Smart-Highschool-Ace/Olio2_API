import { inputObjectType } from "nexus";

export const SkillInput = inputObjectType({
  name : 'SkillInput',
  definition(t){
    t.nonNull.string('name')
  },
});