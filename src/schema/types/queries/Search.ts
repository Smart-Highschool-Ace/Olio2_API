import { stringArg, nonNull } from "nexus";

export const skillSearch = {
  type: "Skill",
  args: {
    search_word: nonNull(stringArg()),
  },
  resolve: async () => {
    // TODO : Skill Search 구현
    return;
  },
};

export const nameSearch = {
  type: "NameSearchType",
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
  type: "ExploreType",
  resolve: async () => {
    // TODO : explore(메인화면에 표시될 객체들) 구현
    return;
  },
};
