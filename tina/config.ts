import { defineConfig, TinaField } from "tinacms";
import type { Template } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

////////////////////////////////////////////////////////////
// Fields
////////////////////////////////////////////////////////////
const className: TinaField = {
  type: "string",
  name: "className",
  label: "CSS Classes",
};

const title: TinaField = {
  type: "string",
  name: "title",
  label: "Title",
  isTitle: true,
  required: true,
};

const richText: TinaField = {
  type: "rich-text",
  name: "richText",
  label: "Rich Text",
};

const body: TinaField = {
  type: "rich-text",
  name: "body",
  label: "Body",
  isBody: true,
};

////////////////////////////////////////////////////////////
// Blocks / Templates
////////////////////////////////////////////////////////////
const heroTemplate: Template = {
  name: "hero",
  label: "Hero",
  fields: [
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Text",
      name: "text",
      ui: {
        component: "textarea",
      },
    },
  ],
};

const featureBlock: Template = {
  name: "features",
  label: "Features",
  fields: [
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Text",
          name: "text",
        },
      ],
    },
  ],
};

const contentTemplate: Template = {
  name: "content",
  label: "Content",
  fields: [className, richText],
};

const containerTemplate: Template = {
  name: "container",
  label: "Container",
  fields: [
    className,
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      templates: [heroTemplate, featureBlock, contentTemplate],
    },
  ],
};
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

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
        label: "Site Settings",
        name: "siteSettings",
        path: "src/_data/",
        match: {
          include: "**/settings",
        },
        format: "yaml",
        fields: [
          {
            type: "string",
            label: "Name",
            name: "name",
          },
          {
            type: "string",
            label: "URL",
            name: "url",
          },
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
      },
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
                name: "layout",
                label: "Layout",
                default: "default",
                type: "string",
                ui: {
                  component: "radio-group",
                  options: [{ label: "Default", value: "default" }],
                },
              },
              {
                type: "object",
                list: true,
                name: "blocks",
                label: "Sections",
                templates: [containerTemplate],
              },
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
