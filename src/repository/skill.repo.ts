import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const insertSkill: Function = (name: string) =>
  prisma.skill.create({ data: { name } });

export const getSkillById: Function = (id: number) =>
  prisma.skill.findUnique({ where: { id } });

export const getSkillByName: Function = (name: string) =>
  prisma.skill.findFirst({ where: { name } });

export const findSkillByName: Function = (name: string) =>
  prisma.skill.findMany({ where: { name: { contains: name } } });
