import { inputObjectType } from "nexus";

export const ProjectCreateInput = inputObjectType({
  name : 'ProjectCreateInput',
  definition(t){
    t.nonNull.string('name')
    t.nonNull.string('introduction')
    t.string('description')
    t.string('link')
    t.string('start_at')
    t.string('end_at')
    t.list.field('skils', {
        type : 'SkillInput'
    })
    t.list.field('members', {
        type : 'ProjectMemberInput'
    })
    t.list.field('fields', {
        type : 'ProjectFieldInput'
    })
    t.list.field('images', {
        type : 'ProjectImageInput'
    })
  },
})

export const ProjectUpdateInput = inputObjectType({
  name : 'ProjectUpdateInput',
  definition(t){
    t.nonNull.string('name')
    t.nonNull.string('introduction')
    t.string('description')
    t.string('link')
    t.string('start_at')
    t.string('end_at')
    t.list.field('skils', {
        type : 'SkillInput'
    })
    t.list.field('members', {
        type : 'ProjectMemberInput'
    })
    t.list.field('fields', {
        type : 'ProjectFieldInput'
    })
    t.list.field('images', {
        type : 'ProjectImageInput'
    })
  },
})

export const ProjectMemberInput = inputObjectType({
  name : 'ProjectMemberInput',
  definition(t){
      t.nonNull.int('id')
      t.string('role')
  }
})

export const ProjectFieldInput = inputObjectType({
  name : 'ProjectFieldInput',
  definition(t){
      t.nonNull.string('name')
  }
})

export const ProjectImageInput = inputObjectType({
  name : 'ProjectImageInput',
  definition(t){
      t.nonNull.string('image')
      t.int('order')
  }
})