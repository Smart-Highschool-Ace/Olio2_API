import { PrismaClient } from "@prisma/client";
import { intArg } from "nexus";

const prisma = new PrismaClient();

export const project = {
  type: "Project",
  args: { id: intArg() },
  resolve: async (_: any, args: any, __: any) => {
    return await prisma.project.findFirst({
      where: {
        id: args.id,
      },
    });
  },
};

export const allProject = {
  type: "Project",
  resolve: async () => {
    return await prisma.project.findMany();
  },
};

export const myProjects = {
  type: "Project",
  resolve: async () => {
    // TODO : 토큰의 user_id를 받아서 찾는 로직 구현
    const mock_user_id = 1;
    return await prisma.projectMember.findMany({
      where: {
        member_id: mock_user_id,
      },
    });
  },
};
