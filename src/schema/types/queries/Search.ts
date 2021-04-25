import { AnyAaaaRecord } from "dns";
import { stringArg, nonNull } from "nexus";
import { SkillService, UserService } from "service";

export const skillSearch = {
  type: "Skill",
  args: {
    search_word: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any) => {
    const data = await SkillService.findSkillByName(args.search_word);
    return data;
  },
};

export const nameSearch = {
  type: "User",
  args: {
    name: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any) => {
    return await UserService.findUserByName(args.name);
  },
};

export const emailSearch = {
  type: "User",
  args: {
    email: nonNull(stringArg()),
  },
  resolve: async (_: any, args: any, __: any) => {
    return await UserService.findUserByEmail(args.email);
  },
};

export const explore = {
  type: "ExploreResult",
  resolve: async () => {
    // TODO : explore(메인화면에 표시될 객체들) 구현
    return;
  },
};
