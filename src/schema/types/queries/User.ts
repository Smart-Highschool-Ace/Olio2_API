import { User } from "@prisma/client";
import { intArg } from "nexus";
import { UserService } from "service";

export const allUser = {
  type: "User",
  resolve: async (): Promise<User[]> => UserService.getUsers(),
};

export const user = {
  type: "User",
  args: { id: intArg() },
  resolve: (_: any, { id }: { id: number }, __: any): Promise<User | null> =>
    UserService.getUser(id),
};
