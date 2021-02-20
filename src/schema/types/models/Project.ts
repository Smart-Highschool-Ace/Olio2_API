import { objectType } from "nexus";

export const Project = objectType({
    name: "Project",
    definition(t) {
      t.int("id");
      t.field("owner", {
        type: 'User',
        resolve: () => {
          return "I am a owner";
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
        type: 'Skill',
        resolve: () => {
          return "these are used in this project";
        },
      });
      t.list.field("members", {
        type: 'ProjectMember',
        resolve: () => {
          return "they participated in this project";
        },
      });
      t.list.field("fields", {
        type: 'ProjectField',
        resolve: () => {
          return "this is web project";
        },
      });
      t.list.field("images", {
        type: 'ProjectImage',
        resolve: () => {
          return "here are some images";
        },
      });
      t.list.field("likes", {
        type: 'User',
        resolve: () => {
          return "they liked this project";
        },
      });
      t.boolean("liked", {
        resolve: (_, __, ctx) => {
          return false;
        },
      });
    },
  });
  
  export const ProjectMember = objectType({
    name: "ProjectMember",
    definition(t) {
      t.field("member", {
        type: 'User',
        resolve: () => {
          return "I am user";
        },
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
  