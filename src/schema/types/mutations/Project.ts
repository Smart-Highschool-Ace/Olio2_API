import { arg, intArg, nonNull } from "nexus";

export const createProject = {
  args: {
    project : arg({type : 'ProjectCreateInput'})
  },
  resolve(_ : any, args : any, ctx : any) { // 후에 프로젝트 생성 구현
    const mock_link = "http://mock-example.com"
    return mock_link
  },
  type: 'String'
}


export const updateProject = {
  args: {
    id : nonNull(intArg()),
    project : nonNull(arg({type : 'ProjectUpdateInput'}))
  },
  resolve(_ : any, args : any, ctx : any) { // 후에 프로젝트 수정 구현
    const mock_link = "http://mock-example.com"
    return mock_link
  },
  type: 'String'
}

export const deleteProject = {
  args: {
    id : nonNull(intArg())
  },
  resolve(_ : any, args : any, ctx : any) { // 후에 프로젝트 삭제 구현
    const mock_error = "mock error!"
    return mock_error
  },
  type: 'String'
}

export const likeProject = {
  args: {
      id : nonNull(intArg())
    },
  resolve(_ : any, args : any, ctx : any) { // 후에 프로젝트 좋아요 구현
    const mock_liked = true
    return mock_liked
  },
  type: 'Boolean'
}