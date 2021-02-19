import { objectType } from "nexus";

export const Portfolio = objectType({
    name: "Portfolio",
    definition(t) {
      t.int("id");
      t.field("owner", {
        type: 'User',
        resolve: () => {
          return "he or she is the owner of this portfolio";
        },
      });
      t.string("email");
      t.string("link");
      t.list.field("likes", {
        type: 'User',
        resolve: () => {
          return "they like my portfolio";
        },
      });
      t.list.field("skills", {
        type: 'PortfolioSkill',
        resolve: () => {
          return "I can use these skills";
        },
      });
      t.list.field("projects", {
        type: 'Project',
        resolve: () => {
          return "this is my projects";
        },
      });
      t.list.field("prizes", {
        type: PortfolioPrize,
        resolve: () => {
          return "my prizes";
        },
      });
      t.list.field("certificates", {
        type: PortfolioCertificate,
        resolve: () => {
          return "my certificates";
        },
      });
      t.int("view", {
        resolve: () => {
          return 999;
        },
      });
      t.boolean("liked", {
        resolve: (_, __, ctx) => {
          if (ctx.header.userId) {
            return false;
          }
          return false;
        },
      });
    },
  });
  
  export const PortfolioSkill = objectType({
    name: "PortfolioSkill",
    definition(t) {
      t.field("skill", {
        type: 'Skill',
        resolve: () => {
          return "Typescript or something";
        },
      });
      t.int("level");
    },
  });
  
  export const PortfolioProject = objectType({
    name: "PortfolioProject",
    definition(t) {
      t.field("project", {
        type: 'Project',
      });
      t.int("order");
    },
  });
  
  export const PortfolioPrize = objectType({
    name: "PortfolioPrize",
    definition(t) {
      t.string("name");
      t.string("institution");
      t.string("prized_at");
    },
  });
  
  export const PortfolioCertificate = objectType({
    name: "PortfolioCertificate",
    definition(t) {
      t.string("name");
      t.string("institution");
      t.string("certified_at");
    },
  });
  