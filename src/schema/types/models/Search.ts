import { objectType } from "nexus";

export const NameSearchType = objectType({
  name: "NameSearchType",
  definition(t) {
    t.list.field("portfolio", {
      type: "Portfolio",
    });
    t.list.field("user", {
      type: "User",
    });
  },
});

export const ExploreType = objectType({
  name: "ExploreType",
  definition(t) {
    t.list.field("portfolio", {
      type: "Portfolio",
    });
    t.list.field("project", {
      type: "Project",
    });
  },
});
