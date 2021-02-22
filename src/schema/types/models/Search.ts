import { objectType } from "nexus";

export const NameSearchQueryType = objectType({
  name: "NameSearchQueryType",
  definition(t) {
    t.list.field("portfolio", {
      type: "Portfolio",
    });
    t.list.field("user", {
      type: "User",
    });
  },
});

export const ExploreQueryType = objectType({
  name: "ExploreQueryType",
  definition(t) {
    t.list.field("portfolio", {
      type: "Portfolio",
    });
    t.list.field("project", {
      type: "Project",
    });
  },
});
