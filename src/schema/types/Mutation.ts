import { mutationType } from "nexus";
import * as m from "./mutations";

export const Mutation = mutationType({
  definition(t) {
    t.field("updatePortfolio", m.updatePortfolio);
    t.field("likePortfolio", m.likePortfolio);

    t.field("createProject", m.createProject);
    t.field("createProject", m.updateProject);
    t.field("createProject", m.deleteProject);
    t.field("createProject", m.likeProject);

    t.field("createUser", m.createUser);
    t.field("updateUser", m.updateUser);
    t.field("deleteUser", m.deleteUser);
  },
});
