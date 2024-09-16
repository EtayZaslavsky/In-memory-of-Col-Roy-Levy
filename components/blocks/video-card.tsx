"use client";
import * as React from "react";
import type { Template } from "tinacms";
import { PageBlocksVideo } from "../../tina/__generated__/types";
import { MediaCard, mediaCardBlockSchema } from "../media-card";


// The Video component
export const Video: React.FC<{ data: PageBlocksVideo }> = ({ data }) => {
    return (
        // @ts-ignore
        <MediaCard mediaType="video" mediaSide={data.mediaSide} mediaSrc={data.mediaSrc} title={data.title} description={data.description} articleLink={data.articleLink} />
    );
};


export const videoBlockSchema: Template = {
    ...mediaCardBlockSchema, // Inherit the fields from mediaCardBlockSchema
    name: "video", // Override the name to "video"
    label: "Video Card",
    ui: {
        ...mediaCardBlockSchema.ui, // Inherit UI settings
        defaultItem: {
            ...mediaCardBlockSchema?.ui?.defaultItem,
            mediaSrc: "https://www.youtube-nocookie.com/watch?v=hRF4y5AHo_s",
            title: "Sample Video Title",
            description: "<p>Sample Video Description</p>",
            articleLink: "https://www.example.com/video-article",
            linkText: "Watch Video",
        },
    },
    // Optionally, you can add more fields specific to the video schema here
};