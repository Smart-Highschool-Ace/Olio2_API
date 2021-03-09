import {
  ProjectSkill,
  ProjectMember,
  ProjectImage,
  ProjectField,
} from "@prisma/client";

export interface ProjectCreateArgs {
  name: string;
  introduction: string;
  description: string;
  link: string;
  logo: string;
  start_at: Date;
  end_at: Date;
  skills: ProjectSkill[];
  members: ProjectMember[];
  fields: ProjectField[];
  images: ProjectImage[];
}
