import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import * as resolvers from "./types";
export const schema = makeSchema({
  types: resolvers,
  plugins: [
    nexusPrisma({ experimentalCRUD: true, shouldGenerateArtifacts: false }),
  ],
  outputs: {
    schema: __dirname + "/../../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
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
