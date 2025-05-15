import { defineConfig, TinaField, Field } from "tinacms";
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
  // The 'default' property is not accepted directly on a field
  // Instead, we need to use the 'ui.defaultValue' property
  ui: {
    defaultValue: "container",
  },
};

const title: TinaField = {
  type: "string",
  name: "title",
  label: "Title",
};

const titleRequired: TinaField = {
  ...title,
  isTitle: true,
  required: true,
};

const richText: TinaField = {
  type: "rich-text",
  name: "richText",
  label: "Rich Text",
};

const contentText: TinaField = {
  label: "Content",
  name: "content",
  type: "string",
  ui: {
    component: "textarea",
  },
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

const callToAction: TinaField = {
  type: "object",
  name: "callToAction",
  label: "Call to Action",
  fields: [
    className,
    {
      type: "string",
      label: "Text",
      name: "text",
    },
    {
      type: "string",
      label: "Link",
      name: "link",
    },
  ],
};

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
  fields: [className, richText, contentText],
};

const listItemProps = (item) => {
  return { label: `(${item._template}) ${item?.title ?? "-"} ` };
};

const containerTemplate: Template = {
  name: "container",
  label: "Container",
  ui: {
    itemProps: listItemProps,
  },
  fields: [
    title,
    className,
    {
      type: "boolean",
      label: "Grid",
      name: "grid",
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      templates: [heroTemplate, featureBlock, contentTemplate, callToAction],
    },
  ],
};

const wrapperTemplate: Template = {
  name: "wrapper",
  label: "Wrapper",
  ui: {
    itemProps: listItemProps,
  },
  fields: [
    title,
    className,
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      templates: [containerTemplate],
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
              titleRequired,
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
                templates: [wrapperTemplate, containerTemplate],
              },
            ],
          },
          {
            name: "funnel",
            label: "Funnel Page",
            fields: [
              titleRequired,
              {
                name: "layout",
                label: "Layout",
                default: "funnel",
                type: "string",
                ui: {
                  component: "radio-group",
                  options: [{ label: "Funnel", value: "funnel" }],
                },
              },
              {
                type: "object",
                list: true,
                name: "blocks",
                label: "Sections",
                templates: [wrapperTemplate, containerTemplate],
                ui: {
                  itemProps: listItemProps,
                },
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
          titleRequired,
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
