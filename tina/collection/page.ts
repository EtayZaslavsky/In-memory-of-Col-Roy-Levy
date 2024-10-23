import type { Collection } from "tinacms";
import { testimonialBlockSchema } from "../../components/blocks/testimonial";
import { featureBlockSchema } from "../../components/blocks/features";
import { imageGalleryBlockSchema } from "../../components/blocks/image-gallery";
import { videoBlockSchema } from "../../components/blocks/video-card";
import { imageBlockSchema } from "../../components/blocks/image-card";
import { timeframeBlockSchema } from "../../components/blocks/timeline";
import { storyFormBlockSchema } from "../../components/blocks/story-form";
import { storiesBlockSchema } from "../../components/blocks/stories";
import { defaultSeoPageProps, seoPageProps } from "@pcode-at/tinacms-seo";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      switch (document._sys.filename) {
        case "home":
          return `/`;
        case "about":
          return `/about`;
        case "from-the-media":
          return `/from-the-media`;
        case "friends-stories":
          return `/friends-stories`;
        case "gallery":
          return `/gallery`;
        case "memorial":
          return `/memorial`;
        default:
          return undefined;
      }
    },
  },
  fields: [
    seoPageProps,
    {
      type: "string",
      label: "Title",
      name: "title",
      description:
        "The title of the page. This is used to display the title in the CMS",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      description:
        "The description of the page. This is used to display the description in the CMS",
    },
    {
      type: "image",
      label: "Hero Image",
      name: "hero",
      description:
        "The Hero Image. This is used as the background image for the header",
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        //@ts-ignore
        featureBlockSchema,
        testimonialBlockSchema,
        imageGalleryBlockSchema,
        videoBlockSchema,
        imageBlockSchema,
        //@ts-ignore
        timeframeBlockSchema,
        //@ts-ignore
        storyFormBlockSchema,
        //@ts-ignore
        storiesBlockSchema,
      ],
    },
  ],
};

export default Page;
