import { objectType } from "nexus";
import { ProjectService, SkillService, UserService } from "../../../service";

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.int("id");
    t.field("owner", {
      type: "User",
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
    t.list.field("ProjectView", {
      type: "ProjectView",
    });
    t.int("view", {
      resolve: (root, _, __) => {
        return root.ProjectView.length;
      },
    });
    t.list.field("ProjectSkill", {
      type: "ProjectSkill",
    });
    t.list.field("ProjectMember", {
      type: "ProjectMember",
    });
    t.list.field("ProjectField", {
      type: "ProjectField",
    });
    t.list.field("ProjectImage", {
      type: "ProjectImage",
    });
    t.list.field("ProjectLike", {
      type: "ProjectLike",
    });
    t.int("like", {
      resolve: (root, _, __) => {
        return root.ProjectLike.length;
      },
    });
    t.boolean("liked", {
      resolve: (root, _, ctx) => {
        if (ctx.userId) {
          return ProjectService.isLikedByUser(root.id, ctx.userId);
        }
        return Promise.resolve(false);
      },
    });
  },
});

export const ProjectLike = objectType({
  name: "ProjectLike",
  definition(t) {
    t.int("id");
    t.int("user_id");
    t.int("project_id");
    t.field("user", {
      type: "User",
      resolve: (root, _, __) => {
        return UserService.getUser(root.user_id);
      },
    });
  },
});
export const ProjectSkill = objectType({
  name: "ProjectSkill",
  definition(t) {
    t.nonNull.int("skill_id");
    t.field("skill", {
      type: "Skill",
      resolve: (root, _, __) => {
        return SkillService.getSkillByID(root.skill_id);
      },
    });
    t.int("project_id");
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

export const MyProjectsQueryType = objectType({
  name: "MyProjectsQueryType",
  definition(t) {
    t.field("projects", {
      type: "Project",
    });
    t.int("order");
  },
});

export const ProjectView = objectType({
  name: "ProjectView",
  definition(t) {
    t.int("id");
    t.int("portfolio_id");
    t.int("user_id");
    t.string("source_ip");
  },
});
