import { PrismaClient } from "@prisma/client";
import { objectType } from "nexus";

import { Portfolio, Project } from "schema/types";

const prisma = new PrismaClient();

export const User = objectType({
    name: "User",
    definition(t) {
      t.int("id");
      t.string("name");
      t.string("email");
      t.string("school");
      t.string("profile_image");
      t.string("introduction");
      t.int("entrance_year");
      t.int("grade", {
        resolve: (root) => {
          return new Date().getFullYear() - root.entrance_year;
        },
      });
      t.field("portfolio", {
        type: 'Portfolio',
        resolve: async (root, _, __) => {
          return await prisma.portfolio.findFirst({
            where: {
              id: root.id,
            },
          });
        },
      });
      t.list.field("projects", {
        type: 'Project',
        resolve: async (root, _, __) => {
          return await prisma.project.findMany({
            where: {
              owner_id: root.id,
            },
          });
        },
      });
      t.list.field("participated_projects", {
        type: Project,
        resolve: () => {
          return "these are my projects participated";
        },
      });
      t.list.field("liked_projects", {
        type: Project,
        resolve: () => {
          return "these are my favorite projects";
        },
      });
      t.list.field("liked_portfolios", {
        type: Portfolio,
        resolve: () => {
          return "these are my favorite portfolios";
        },
      });
    },
  });