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

export type orderAboutProjectListType = {
  [key: string]: Function;
  popular: Function;
  recent: Function;
  views: Function;
};
