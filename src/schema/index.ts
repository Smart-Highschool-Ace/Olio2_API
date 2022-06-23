import { makeSchema } from "nexus";
import * as resolvers from "./types";

export const schema = makeSchema({
  types: resolvers,
  contextType: {
    module: require.resolve("../middleware/context"),
    export: "context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});
