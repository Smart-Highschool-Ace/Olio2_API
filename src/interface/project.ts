import {
  ProjectMember,
  ProjectImage,
  ProjectField,
  Project,
} from "@prisma/client";

export interface ProjectCreateArgs {
  name: string;
  introduction: string;
  description?: string;
  link?: string;
  logo?: string;
  start_at?: Date;
  end_at?: Date;
  skills?: ProjectInputSkill[];
  members?: ProjectMember[];
  fields?: ProjectField[];
  images?: ProjectImage[];
}

type ProjectInputSkill = {
  id: number;
  name: string;
  project_id: number;
};

export type ProjectOrder = {
  project: Project;
  order: number;
};

const getLikeFirst: Function = (orderAscDesc: string): Object => {
  return {
    ProjectLike: {
      count: orderAscDesc,
    },
  };
};
const getViewFirst: Function = (orderAscDesc: string): Object => {
  return {
    ProjectView: {
      count: orderAscDesc,
    },
  };
};
const getRecentFirst: Function = (orderAscDesc: string): Object => {
  return {
    created_at: orderAscDesc,
  };
};
export const orderAboutProjectList: orderAboutProjectListType = {
  popular: getLikeFirst,
  views: getViewFirst,
  recent: getRecentFirst,
};

type orderAboutProjectListType = {
  [key: string]: Function;
  popular: Function;
  recent: Function;
  views: Function;
};
