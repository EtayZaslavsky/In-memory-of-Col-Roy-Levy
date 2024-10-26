
"use client";
import * as React from "react";
import type { Template } from "tinacms";
import { PageBlocksVideoLocal } from "../../tina/__generated__/types";

export const VideoLocal: React.FC<{ data: PageBlocksVideoLocal }> = ({ data }) => {
    return (
        <video className="mx-auto" src={data?.videoSrc ?? ""} controls autoPlay>
        </video>
    );
};

export const videoLocalBlockSchema: Template = {
    name: "videoLocal",
    label: "Video Local",
    fields: [
        {
            label: "Video Source",
            type: "string",
            name: "videoSrc",
        },
    ],
    ui: {
        defaultItem: {
            videoSrc: "https://www.youtube-nocookie.com/watch?v=hRF4y5AHo_s",
        },
    },
}