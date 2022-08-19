import { Project, ProjectLike } from "@prisma/client";

import {
  orderAboutProjectListType,
  ProjectDTO,
  SearchArgument,
} from "../interface";
import { map, pipe, toArray, toAsync } from "@fxts/core";
import { ProjectRepository, SkillRepository } from "../repository";
import { OrderDirectionType } from "../constant";

export const getProjects: Function = (args: {
  page: number;
  orderBy: Object;
}): Promise<Project[]> => ProjectRepository.getProjects(args);

// 유저가 생성하거나 참여한 프로젝트를 모두 불러옴
export const getAllProjectsOfUser: Function = (
  userId: number,
): Promise<Project[]> => ProjectRepository.getProjectListOfUser(userId);

export const getOwnProjectsOfUser: Function = (
  userId: number,
): Promise<Project[]> => ProjectRepository.getProjectListOfOwnerUser(userId);

export const getParticipatedProjectsOfUser: Function = (
  userId: number,
): Promise<Project[]> =>
  ProjectRepository.getParticipatedProjectsOfUser(userId);

export const getLikedProjectsOfUser: Function = async (
  userId: number,
): Promise<Project[]> => ProjectRepository.getLikedProjectFromUser(userId);

export const getProject: Function = (projectId: number) =>
  ProjectRepository.getProjectById(projectId);

export const isLikedByUser: Function = async (
  projectId: number,
  userId: number,
): Promise<boolean> =>
  !!(await ProjectRepository.getLikedFromProjectAndUserId(projectId, userId));

export const createProject: Function = async (
  user_id: number,
  {
    ProjectSkill,
    ProjectMember,
    ProjectField,
    ProjectImage,
    ...args
  }: ProjectDTO,
): Promise<Project> =>
  ProjectRepository.create(user_id, {
    ...args,
    ProjectMember: ProjectMember ? { create: ProjectMember } : undefined,
    ProjectField: ProjectField ? { create: ProjectField } : undefined,
    ProjectImage: ProjectImage ? { create: ProjectImage } : undefined,
    ProjectSkill: {
      create: ProjectSkill
        ? await pipe(
            ProjectSkill || [],
            map(async (skill) => {
              const localSkill = await SkillRepository.getSkillByName(
                skill.name,
              );
              if (localSkill) {
                return { skill_id: localSkill.id };
              }
              return {
                skill_id: (await SkillRepository.insertSkill(skill.name)).id,
              };
            }),
            toAsync,
            toArray,
          )
        : undefined,
    },
  });

export const updateProject: Function = async (
  id: number,
  {
    ProjectSkill,
    ProjectMember,
    ProjectField,
    ProjectImage,
    ...args
  }: ProjectDTO,
): Promise<Project> => {
  const getUpdateObject = (create: unknown) =>
    create
      ? {
          deleteMany: {},
          create,
        }
      : undefined;
  return ProjectRepository.update(id, {
    ...args,
    ProjectMember: getUpdateObject(ProjectMember),
    ProjectField: getUpdateObject(ProjectField),
    ProjectImage: getUpdateObject(ProjectImage),
    ProjectSkill: getUpdateObject(
      await pipe(
        ProjectSkill || [],
        map(async (skill) => {
          const localSkill = await SkillRepository.getSkillByName(skill.name);
          if (localSkill) {
            return { skill_id: localSkill.id };
          }
          return {
            skill_id: (await SkillRepository.insertSkill(skill.name)).id,
          };
        }),
        toAsync,
        toArray,
      ),
    ),
  });
};

export const deleteProject: Function = (id: number): Promise<Project> =>
  ProjectRepository.deleteById(id);

export const createLikeProject: Function = async (
  user_id: number,
  project_id: number,
): Promise<void> => ProjectRepository.addLikeAtProject(user_id, project_id);

export const deleteLikeProject: Function = async (
  user_id: number,
  project_id: number,
): Promise<void> => ProjectRepository.removeLikeAtProject(user_id, project_id);

export const findProjectByName: Function = (
  args: SearchArgument,
): Promise<Project[]> => ProjectRepository.findProjectContainName(args);

export const getViewAboutProject: Function = (id: number): Promise<number> =>
  ProjectRepository.getViewCountAboutProject(id);

export const getOwnLikeOfProjects: Function = (
  id: number,
): Promise<ProjectLike[]> => ProjectRepository.getLikesOfProject(id);

export const createProjectView = async (projectId: number, userId?: number) => {
  ProjectRepository.incrementView(projectId);
  ProjectRepository.addView(projectId, userId);
};

export const joinProject: Function = async (id: number, userId: number) => {
  await createProjectView(userId, id);
  return getProject(id);
};

const getLikeFirst: Function = (orderAscDesc: OrderDirectionType) => ({
  ProjectLike: {
    count: orderAscDesc,
  },
});

const getViewFirst: Function = (orderAscDesc: OrderDirectionType) => ({
  ProjectView: {
    count: orderAscDesc,
  },
});
const getRecentFirst: Function = (orderAscDesc: OrderDirectionType) => ({
  created_at: orderAscDesc,
});

export const orderAboutProjectList: orderAboutProjectListType = {
  popular: getLikeFirst,
  views: getViewFirst,
  recent: getRecentFirst,
};
