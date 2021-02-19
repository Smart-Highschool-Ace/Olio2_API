import { inputObjectType } from "nexus";

export const PortfolioUpdateInput = inputObjectType({
  name : 'PortfolioUpdateInput',
  definition(t){
    t.nonNull.string('email')
    t.nonNull.list.field('skils', {
        type: 'PortfolioSkillInput'
    })
    t.nonNull.list.field('projects', {
        type: 'PortfolioProjectInput'
    })
    t.nonNull.list.field('prizes', {
        type: 'PortfolioPrizeInput'
    })
    t.nonNull.list.field('certificates', {
        type: 'PortfolioCertificateInput'
    })
  },
});

export const PortfolioSkillInput = inputObjectType({
  name : 'PortfolioSkillInput',
  definition(t){
    t.nonNull.string('skill'),
    t.nonNull.int('level')
  },
});

export const PortfolioProjectInput = inputObjectType({
  name : 'PortfolioProjectInput',
  definition(t){
    t.nonNull.int('project'),
    t.nonNull.int('order')
  },
});

export const PortfolioPrizeInput = inputObjectType({
  name : 'PortfolioPrizeInput',
  definition(t){
    t.nonNull.string('name'),
    t.nonNull.string('institution')
    t.nonNull.int('prized_at')
  },
});

export const PortfolioCertificateInput = inputObjectType({
  name : 'PortfolioCertificateInput',
  definition(t){
    t.nonNull.string('name'),
    t.nonNull.string('institution')
    t.nonNull.int('certified_at')
  },
});