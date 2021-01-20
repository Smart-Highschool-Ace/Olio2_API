import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import * as types from "./types";

export const schema = makeSchema({
  types: types,
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + "/../../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  contextType: {
    module: require.resolve("../context"),
    export: "Context",
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
