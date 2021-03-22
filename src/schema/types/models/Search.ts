import { unionType } from "nexus";

export const NameSearchResult = unionType({
  name: "NameSearchResult",
  resolveType(data) {
    const __typename = "profile_image" in data ? "User" : "Portfolio";
    if (!__typename) {
      throw new Error(
        `Could not resolve the type of data passed to union type "NameSearchResult"`
      );
    }
    return __typename;
  },
  definition(t) {
    t.members("Portfolio", "User");
  },
});

export const ExploreResult = unionType({
  name: "ExploreResult",
  resolveType(data) {
    const __typename = "email" in data ? "Portfolio" : "Project";
    if (!__typename) {
      throw new Error(
        `Could not resolve the type of data passed to union type "NameSearchResult"`
      );
    }
    return __typename;
  },
  definition(t) {
    t.members("Portfolio", "Project");
  },
});
