"use client";
import * as React from "react";
import type { Template } from "tinacms";
import { PageBlocksVideo } from "../../tina/__generated__/types";
import { MediaCard, mediaCardBlockSchema } from "../media-card";


// The Video component
export const Image: React.FC<{ data: PageBlocksVideo }> = ({ data }) => {
    return (
        // @ts-ignore
        <MediaCard mediaType="image" mediaSide={data.mediaSide} imageSrc={data.imageSrc} mediaSrc={data.mediaSrc} title={data.title} description={data.description} articleLink={data.articleLink} linkText={data.linkText} />
    );
};


export const imageBlockSchema: Template = {
    ...mediaCardBlockSchema, // Inherit the fields from mediaCardBlockSchema
    name: "image", // Override the name to "video"
    label: "Image Card",
    ui: {
        ...mediaCardBlockSchema.ui, // Inherit UI settings
        defaultItem: {
            ...mediaCardBlockSchema.ui.defaultItem,
            mediaSrc: "https://www.youtube.com/watch?v=hRF4y5AHo_s",
            title: "Sample Image Title",
            description: "<p>Sample Video Description</p>",
            articleLink: "https://www.example.com/video-article",
            linkText: "Watch Video",
        },
    },
    // Optionally, you can add more fields specific to the video schema here
};