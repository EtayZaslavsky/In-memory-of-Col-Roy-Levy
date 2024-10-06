"use client";
import * as React from "react";
import { tinaField } from "tinacms/dist/react";
import { Section } from "./layout/section";
import { Container } from "./layout/container";
import type { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

type MediaCardProps = {
    mediaType: "video" | "image";
    mediaSrc: string;
    title?: string;
    imageSrc?: string;
    description?: TinaMarkdownContent;
    articleLink?: string;
    linkText?: string;
    mediaSide?: "left" | "right";
};

export const MediaCard: React.FC<MediaCardProps> = ({
    mediaType,
    mediaSrc,
    title,
    description,
    articleLink,
    imageSrc,
    linkText,
    mediaSide,
}) => {
    return (
        <Section>
            <Container className="py-16">
                <div className={`flex flex-col items-start ${mediaSide === "left" ? "md:flex-row-reverse" : "md:flex-row"} md:gap-x-4 lg:gap-x-6 xl:gap-x-8`}>
                    {mediaType === "video" && (
                        <div className="w-full md:w-1/2 mb-8 md:mb-0">
                            <div className="relative" style={{ paddingBottom: "56.25%" }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                                    src={mediaSrc}
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                    )}

                    {mediaType === "image" && (
                        <img
                            className="m-auto p-x-8 md:w-auto h-auto sm:max-h-[16rem] md:max-h-[24rem] lg:max-h-[32rem] rounded-lg shadow-lg"
                            src={imageSrc}
                            alt={title ?? "Media Image"}
                        />
                    )}

                    {mediaType === "video" && (
                        <div className="w-full md:w-1/2">
                            {title && (
                                <h2 className="text-2xl font-bold mb-4" data-tina-field={tinaField({ title }, "title")}>
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <TinaMarkdown content={description} />
                            )}
                            {articleLink && (
                                <p className="text-lg text-gray-700" data-tina-field={tinaField({ articleLink }, "articleLink")}>
                                    <a
                                        href={articleLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center text-gray-50 hover:text-white-600 font-semibold transition-colors duration-300"
                                    >
                                        <span className="mr-2">{linkText || "קרא עוד"}</span>
                                    </a>
                                </p>
                            )}
                        </div>
                    )}

                    {mediaType === "image" && (
                        <div className="w-full md:w-1/2">

                            {title && (
                                <h2 className="text-2xl font-bold mb-4" data-tina-field={tinaField({ title }, "title")}>
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <TinaMarkdown content={description} />
                            )}
                            {articleLink && (
                                <p className="text-lg text-gray-700" data-tina-field={tinaField({ articleLink }, "articleLink")}>
                                    <a
                                        href={articleLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center text-gray-50 hover:text-white-600 font-semibold transition-colors duration-300"
                                    >
                                        <span className="mr-2">{linkText || "קרא עוד"}</span>
                                    </a>
                                </p>
                            )}
                        </div>
                    )}
                </div>

            </Container>
        </Section>
    );
};

export const mediaCardBlockSchema: Template = {
    name: "mediaCard",
    label: "Media Card",
    ui: {
        defaultItem: {
            mediaSide: "right",
            mediaSrc: "https://www.youtube-nocookie.com/watch?v=hRF4y5AHo_s",
            title: "Sample Card Title",
            description: "<p>This is a sample description for the media content.</p>",
            articleLink: "https://www.example.com/article",
            linkText: "Read More",
        },
    },
    fields: [
        {
            type: "string",
            label: "Media Side",
            name: "mediaSide",
            options: ["left", "right"], // Allow selection between "left" and "right"
            required: false,
            ui: {
                defaultValue: "left", // Set "left" as the default value
            },
        },
        {
            type: "string",
            label: "Media Type",
            name: "mediaType",
            options: ["video", "image"], // Allow selection between "video" and "image"
            required: true,
        },
        {
            type: "image",
            label: "Image Source",
            name: "imageSrc",
        },
        {
            type: "string",
            label: "Media Source",
            name: "mediaSrc",
        },
        {
            type: "string",
            label: "Title",
            name: "title",
        },
        {
            type: "rich-text",
            label: "Description",
            name: "description",
        },
        {
            type: "string",
            label: "Article Link",
            name: "articleLink",
        },
        {
            type: "string",
            label: "Link Text",
            name: "linkText",
        },
    ],
};
