import { PrismaClient, Skill } from "@prisma/client";

export const getSkillByName: Function = (
  name: string,
): Promise<Skill | null> => {
  const prisma = new PrismaClient();

  return prisma.skill.findFirst({
    where: {
      name: name,
    },
  });
};

export const findSkillByName: Function = (name: string): Promise<Skill[]> => {
  const prisma = new PrismaClient();

  return prisma.skill.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export const getSkillByID: Function = (id: number): Promise<Skill | null> => {
  const prisma = new PrismaClient();
  return prisma.skill.findFirst({
    where: {
      id: id,
    },
  });
};
export const AddSkill: Function = (name: string): Promise<Skill> => {
  const prisma = new PrismaClient();
  return prisma.skill.create({
    data: {
      name: name,
    },
  });
};
