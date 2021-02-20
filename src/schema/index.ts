import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import {resolvers} from './types'
export const schema = makeSchema({
  types: resolvers,
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + "/../../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
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
