import { PrismaClient, Skill } from "@prisma/client";

export const getSkillByName = async (name: string): Promise<Skill> => {
  const prisma = new PrismaClient();

  return await prisma.skill.findFirst({
    where: {
      name: name,
    },
  });
};

export const findSkillByName = async (name: string): Promise<Skill[]> => {
  const prisma = new PrismaClient();

  return await prisma.skill.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export const getSkillByID = async (id: number): Promise<Skill> => {
  const prisma = new PrismaClient();
  return await prisma.skill.findFirst({
    where: {
      id: id,
    },
  });
};
export const AddSkill = async (name: string): Promise<Skill> => {
  const prisma = new PrismaClient();
  return await prisma.skill.create({
    data: {
      name: name,
    },
  });
};
