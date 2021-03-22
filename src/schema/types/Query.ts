import { queryType } from "nexus";
import { allUser, user } from "./queries";

export const Query = queryType({
  definition(t) {
    t.list.field("allUser", allUser);
    t.field("user", user);
  },
});
