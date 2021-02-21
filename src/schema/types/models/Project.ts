import { objectType } from "nexus";
import { ProjectService } from "service";

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.int("id");
    t.field("owner", {
      type: "User",
      resolve: async (root, _, __) => {
        return (await ProjectService.getProject(root.id)).owner;
      },
    });
    t.string("name");
    t.string("introduction");
    t.string("description");
    t.string("link");
    t.string("logo");
    t.string("start_at");
    t.string("end_at");
    t.string("created_at");
    t.string("updated_at");
    t.int("view", {
      resolve: () => {
        return 999;
      },
    });
    t.list.field("skills", {
      type: "Skill",
      resolve: async (root, _, __) => {
        return (await ProjectService.getProject(root.id)).ProjectSkill;
      },
    });
    t.list.field("members", {
      type: "ProjectMember",
      resolve: async (root, _, __) => {
        return (await ProjectService.getProject(root.id)).ProjectMember;
      },
    });
    t.list.field("fields", {
      type: "ProjectField",
      resolve: async (root, _, __) => {
        return (await ProjectService.getProject(root.id)).ProjectField;
      },
    });
    t.list.field("images", {
      type: "ProjectImage",
      resolve: async (root, _, __) => {
        return (await ProjectService.getProject(root.id)).ProjectImage;
      },
    });
    t.list.field("likes", {
      type: "User",
      resolve: async (root, _, __) => {
        return (await ProjectService.getProject(root.id)).ProejctLike;
      },
    });
    t.boolean("liked", {
      resolve: async (root, _, ctx) => {
        if (ctx.userId) {
          return await ProjectService.isLikedByUser(root.id, ctx.userId);
        }
        return false;
      },
    });
  },
});

export const ProjectMember = objectType({
  name: "ProjectMember",
  definition(t) {
    t.field("member", {
      type: "User",
    });
    t.string("role");
  },
});

export const ProjectField = objectType({
  name: "ProjectField",
  definition(t) {
    t.string("name");
  },
});

export const ProjectImage = objectType({
  name: "ProjectImage",
  definition(t) {
    t.string("image");
    t.int("order");
  },
});
