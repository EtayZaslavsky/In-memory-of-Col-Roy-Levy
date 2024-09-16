"use client";
import {
  PageBlocksTimeline,
  PageBlocksTimelineItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";

export const Timeframe = ({
  data,
  index,
}: {
  data: PageBlocksTimelineItems;
  index: number;
}) => {
  // Determine alignment and margin based on the index
  const alignmentClass = index % 2 === 0 ? 'lg:pr-8 lg:mr-auto' : 'lg:pl-8 lg:ml-auto';
  return (
    <div
      data-tina-field={tinaField(data)}
      className={`relative w-full lg:w-1/2 mb-48 ${alignmentClass}`}
    >
      <div className={`absolute h-16 top-0 w-full -translate-y-1/2 left-0`}>
        {/* Dot on the timeline */}
        <div
          className={`absolute z-10 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center right-0 translate-x-1/2 ${index % 2 !== 0 ? 'lg:left-0 lg:right-auto lg:-translate-x-1/2' : ''}`}
        >
          {data.year && (
            <p
              data-tina-field={tinaField(data, "year")}
              className="text-sm text-gray-900"
            >
              {data.year}
            </p>
          )}
        </div>
        {/* Line stretching from the dot to the side */}
        <div
          className={`absolute top-0 w-full ${index % 2 === 0 ? 'left-0' : 'right-0'}`}
        >
          {data.title && (
            <h3
              data-tina-field={tinaField(data, "title")}
              className="text-xl font-semibold title-font -translate-y-1 text-center"
            >
              {data.title}
            </h3>
          )}
          <div className="w-full h-0.5 -translate-y-1 bg-yellow-300"></div>
        </div>
      </div>


      <div className="border border-gray-300 border-[1px] rounded-lg shadow-md p-4">


        {data.image && (
          <div className="w-full flex justify-center items-center">
            <img src={data.image} className="" alt={data.title || "Timeline image"} />
          </div>
        )}
        {data.description && (
          <p
            data-tina-field={tinaField(data, "description")}
            className="text-base"
          >
            {data.description}
          </p>
        )}
      </div>
    </div>
  );
};

export const Timeline = ({ data }: { data: PageBlocksTimeline }) => {
  return (
    <Section>
      <Container className="relative flex flex-col items-center">
        {/* Timeline line */}
        <div className="absolute w-1 bg-black dark:bg-gray-200 h-full right-[10%] lg:right-1/2 transform translate-x-1/2 lg:translate-x-0"></div>

        {/* Timeframes */}
        <div className="flex flex-col items-center w-4/5 lg:w-full">
          {data.items &&
            data.items.map((block, i) => (
              <Timeframe key={i} data={block as any} index={i} />
            ))}
        </div>
      </Container>


    </Section>
  );
};

const defaultTimeframe = {
  title: "Here's Another Feature",
  image: "",
  description: "",
  year: "1979",
};

export const timeframeBlockSchema = {
  name: "timeline",
  label: "Timeline",
  ui: {
    previewSrc: "",
    defaultItem: {
      items: [defaultTimeframe, defaultTimeframe, defaultTimeframe],
    },
  },
  fields: [
    {
      type: "object",
      label: "Time Frames",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultTimeframe,
        },
      },
      fields: [
        {
          type: "image",
          label: "Image",
          name: "image",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
        },
        {
          type: "string",
          name: "year",
          label: "Year",
        },
      ],
    },
  ],
};
