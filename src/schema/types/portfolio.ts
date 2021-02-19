import { PrismaClient } from "@prisma/client";
import { objectType, queryType, extendType, inputObjectType, arg, nonNull, intArg } from "nexus";

import { User, Project, Skill } from "schema/types";

const prisma = new PrismaClient();

export const Portfolio = objectType({
  name: "Portfolio",
  definition(t) {
    t.int("id");
    t.field("owner", {
      type: User,
      resolve: () => {
        return "he or she is the owner of this portfolio";
      },
    });
    t.string("email");
    t.string("link");
    t.list.field("likes", {
      type: User,
      resolve: () => {
        return "they like my portfolio";
      },
    });
    t.list.field("skills", {
      type: PortfolioSkill,
      resolve: () => {
        return "I can use these skills";
      },
    });
    t.list.field("projects", {
      type: Project,
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
      type: Skill,
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
      type: Project,
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


export const MutationPortfolio = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updatePortfolio', {
      type: 'String',
      args: {
        user : arg({type : PortfolioUpdateInput})
      },
      resolve(_, args, ctx) { // 후에 포트폴리오 수정 구현
        const mock_link = "http://mock-example.com"
        return mock_link 
      }
    })

    t.nonNull.field('likePortfolio',{
        type: 'Boolean',
        args: {
            id : nonNull(intArg())
        },
        resolve(_, args, ctx){ // 후에 좋아요 로직 구현
            return true 
        }
    })
  }
});

const PortfolioUpdateInput = inputObjectType({
  name : 'PortfolioUpdateInput',
  definition(t){
    t.nonNull.string('email')
    t.nonNull.field('PortfolioSkill', {
        type: PortfolioSkill
    })
    t.nonNull.field('PortfolioProject', {
        type: PortfolioProject
    })
    t.nonNull.field('PortfolioPrize', {
        type: PortfolioPrize
    })
    t.nonNull.field('PortfolioCertificate', {
        type: PortfolioCertificate
    })
  },
})