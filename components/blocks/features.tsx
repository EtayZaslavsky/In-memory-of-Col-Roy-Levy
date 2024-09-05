"use client";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../icon";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { iconSchema } from "../../tina/fields/icon";

export const Feature = ({
  featuresColor,
  data,
}: {
  featuresColor: string;
  data: PageBlocksFeaturesItems;
}) => {
  return (
    <div
      data-tina-field={tinaField(data)}
      // className="flex-1 flex flex-col items-center max-w-xl mx-auto"
      className=""
      style={{ flexBasis: "8rem" }}
    ><a href={data.link}>
        {data.icon && (
          <div className="w-full flex justify-center items-center">
            <img src={data.icon} className="w-16 h-16" />
          </div>

          // <Icon
          //   tinaField={tinaField(data, "icon")}
          //   parentColor={featuresColor}
          //   data={{ size: "large", ...data.icon }}
          // />
        )}
        {data.title && (
          <h3
            data-tina-field={tinaField(data, "title")}
            className="text-xl font-semibold title-font"
          >
            {data.title}
          </h3>
        )}
      </a>
    </div>
  );
};

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`flex flex-wrap justify-around gap-x-10 gap-y-8 text-center`}
        size="large"
      >
        {data.items &&
          data.items.map(function (block, i) {
            return <Feature featuresColor={data.color} key={i} data={block} />;
          })}
      </Container>
    </Section>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  link: "/",
  icon: ""
};

export const featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        // iconSchema,
        {
          type: "image",
          label: "Icon",
          name: "icon",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
