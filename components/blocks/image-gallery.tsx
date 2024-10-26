"use client";
import * as React from "react";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import type { Template } from "tinacms";
import { PageBlocksImageGallery } from "../../tina/__generated__/types";

// The ImageGallery component
export const ImageGallery: React.FC<{ data: PageBlocksImageGallery }> = ({ data }) => {
  return (
    <Section>
      <Container className="py-16">
        <div className="text-center mb-12">
          {data.title && (
            <h2
              data-tina-field={tinaField(data, "title")}
              className="text-3xl font-bold mb-4"
            >
              {data.title}
            </h2>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data.images?.map((image, index) => (
            <div key={index} className="relative">
              {image?.src && (
                <img
                  src={image.src}
                  alt={image.alt ?? "תמונה"}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-lg"
                />
              )}
              {image?.caption && (
                <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-75 text-white p-2 text-center text-sm rounded-b-lg">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export const imageGalleryBlockSchema: Template = {
  name: "imageGallery",
  label: "Image Gallery",
  ui: {
    defaultItem: {
      title: "Our Photo Gallery",
      images: [
        {
          src: "/default-image.jpg",
          alt: "Default Image",
          caption: "Sample Caption 1",
        },
        {
          src: "/default-image.jpg",
          alt: "Default Image",
          caption: "Sample Caption 2",
        },
      ],
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "object",
      label: "Images",
      name: "images",
      list: true,
      fields: [
        {
          type: "image",
          label: "Image Source",
          name: "src",
          required: true, // Mark src as required
        },
        {
          type: "string",
          label: "Alt Text",
          name: "alt",
        },
        {
          type: "string",
          label: "Caption",
          name: "caption",
        },
      ],
    },
  ],
};

