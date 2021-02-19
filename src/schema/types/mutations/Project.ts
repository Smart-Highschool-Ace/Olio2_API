import { constants } from "http2";
import { arg } from "nexus";

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