import { defineConfig, TinaField } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const title: TinaField = {
  type: "string",
  name: "title",
  label: "Title",
  isTitle: true,
  required: true,
};

const body: TinaField = {
  type: "rich-text",
  name: "body",
  label: "Body",
  isBody: true,
};

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "_site",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "_site",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "src",
        templates: [
          {
            name: "content",
            label: "Content Page",
            fields: [
              title,
              {
                type: "string",
                name: "layout",
                label: "Layout",
                ui: {
                  component: "radio-group",
                  options: [{ label: "Default", value: "default" }],
                },
              },
              body,
            ],
          },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "src/posts",
        fields: [
          title,
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            required: true,
            list: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          body,
        ],
      },
    ],
  },
});
