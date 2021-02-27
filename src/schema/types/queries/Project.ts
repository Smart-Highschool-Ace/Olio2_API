import { PrismaClient } from "@prisma/client";
import { intArg } from "nexus";
import { ProjectService } from "service";

const prisma = new PrismaClient();

export const project = {
  type: "Project",
  args: { id: intArg() },
  resolve: async (_: any, args: any, __: any) => {
    return await ProjectService.getProject(args.id);
  },
};

export const allProject = {
  type: "Project",
  resolve: async () => {
    return await prisma.project.findMany();
  },
};
