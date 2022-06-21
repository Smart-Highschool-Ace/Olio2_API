import {
  ProjectMember,
  ProjectImage,
  ProjectField,
  Project,
} from "@prisma/client";

interface ProjectBaseArgs {
  name: string;
  introduction: string;
  description?: string;
  link?: string;
  logo?: string;
  start_at?: Date;
  end_at?: Date;
}
export interface ProjectDTO extends ProjectBaseArgs {
  ProjectSkill?: ProjectInputSkill[];
  ProjectMember?: ProjectMember[];
  ProjectField?: ProjectField[];
  ProjectImage?: ProjectImage[];
}
export interface ProjectCreateArgs extends ProjectBaseArgs {
  ProjectSkill?: { create: BaseProjectSkill[] };
  ProjectMember?: { create: ProjectMember[] };
  ProjectField?: { create: ProjectField[] };
  ProjectImage?: { create: ProjectImage[] };
}

export interface ProjectUpdateArgs extends ProjectBaseArgs {
  ProjectSkill?: { deleteMany: {}; create: BaseProjectSkill[] };
  ProjectMember?: { deleteMany: {}; create: ProjectMember[] };
  ProjectField?: { deleteMany: {}; create: ProjectField[] };
  ProjectImage?: { deleteMany: {}; create: ProjectImage[] };
}

type BaseProjectSkill = {
  skill_id: number;
};

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
