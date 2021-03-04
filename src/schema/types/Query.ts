import { queryType } from "nexus";
import * as q from "./queries";

export const Query = queryType({
  definition(t) {
    t.list.field("allUser", q.allUser);
    t.field("user", q.user);

    t.field("project", q.project);

    t.field("portfolio", q.portfolio);

    t.field("skillSearch", q.skillSearch);
    t.field("nameSearch", q.nameSearch);
    t.field("emailSearch", q.emailSearch);
    t.field("explore", q.explore);
  },
});
