import { stringArg, nonNull } from "nexus";
import { SkillService } from "service";

export const skillSearch = {
  type: "Skill",
  args: {
    search_word: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any) => {
    // TODO : Skill Search 구현
    const data = await SkillService.findSkillByName(args.search_word);
    return data;
  },
};

export const nameSearch = {
  type: "NameSearchResult",
  args: {
    search_word: nonNull(stringArg()),
  },
  resolve: async () => {
    // TODO : Name Search 구현
    return;
  },
};

export const emailSearch = {
  type: "User",
  args: {
    email: nonNull(stringArg()),
  },
  resolve: async () => {
    // TODO : Email Search 구현
    return;
  },
};

export const explore = {
  type: "ExploreResult",
  resolve: async () => {
    // TODO : explore(메인화면에 표시될 객체들) 구현
    return;
  },
};
