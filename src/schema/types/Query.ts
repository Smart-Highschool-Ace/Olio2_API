import { queryType } from "nexus";
import * as q from "./queries";

export const Query = queryType({
  definition(t) {
    t.list.field("allUser", q.allUser);
    t.field("user", q.user);

    t.list.field("allProject", q.allProject);
    t.field("project", q.project);

    t.list.field("allPortfolio", q.allPortfolio);
    t.field("portfolio", q.portfolio);

    t.field("skillSearch", q.skillSearch);
    t.field("nameSearch", q.nameSearch);
    t.field("emailSearch", q.emailSearch);
    t.field("explore", q.explore);
  },
});
