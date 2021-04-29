import { PrismaClient, Skill } from "@prisma/client";

export const getSkillByName: Function = async (
  name: string
): Promise<Skill> => {
  const prisma = new PrismaClient();

  return await prisma.skill.findFirst({
    where: {
      name: name,
    },
  });
};

export const findSkillByName: Function = async (
  name: string
): Promise<Skill[]> => {
  const prisma = new PrismaClient();

  return await prisma.skill.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export const getSkillByID: Function = async (id: number): Promise<Skill> => {
  const prisma = new PrismaClient();
  return await prisma.skill.findFirst({
    where: {
      id: id,
    },
  });
};
export const AddSkill: Function = async (name: string): Promise<Skill> => {
  const prisma = new PrismaClient();
  return await prisma.skill.create({
    data: {
      name: name,
    },
  });
};
