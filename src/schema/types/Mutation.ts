import { mutationType } from 'nexus'
import {
  updatePortfolio,
  likePortfolio,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  createUser,
  updateUser,
  deleteUser
} from './mutations'

export const Mutation = mutationType({
  definition(t) {
    t.field('updatePortfolio', updatePortfolio)
    t.field('likePortfolio', likePortfolio)

    t.field('createProject', createProject)
    t.field('createProject', updateProject)
    t.field('createProject', deleteProject)
    t.field('createProject', likeProject)

    t.field('createUser', createUser)
    t.field('updateUser', updateUser)
    t.field('deleteUser', deleteUser)
  },
})