import { Skill } from "@prisma/client";
import { SkillRepository } from "repository";

export const getSkillByName: Function = (name: string): Promise<Skill | null> =>
  SkillRepository.getSkillByName(name);
export const findSkillByName: Function = (name: string): Promise<Skill[]> =>
  SkillRepository.findSkillByName(name);
export const getSkillByID: Function = (id: number): Promise<Skill | null> =>
  SkillRepository.getSkillById(id);
export const AddSkill: Function = (name: string): Promise<Skill> =>
  SkillRepository.insertSkill(name);
