import { PrismaClient, Skill } from "@prisma/client";

export const getSkillByName: Function = async (
  prisma: PrismaClient,
  name: string
): Promise<Skill> => {
  return await prisma.skill.findFirst({
    where: {
      name: name,
    },
  });
};

export const findSkillByName: Function = async (
  prisma: PrismaClient,
  name: string
): Promise<Skill[]> => {
  return await prisma.skill.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export const getSkillByID: Function = async (
  prisma: PrismaClient,
  id: number
): Promise<Skill> => {
  return await prisma.skill.findFirst({
    where: {
      id: id,
    },
  });
};
export const AddSkill: Function = async (
  prisma: PrismaClient,
  name: string
): Promise<Skill> => {
  return await prisma.skill.create({
    data: {
      name: name,
    },
  });
};
