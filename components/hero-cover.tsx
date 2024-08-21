"use client";
import React from "react";

export const Cover = ({
    image,
    title = "",
    description = "",
}) => {
    return (
        <div className="relative">
            <img className="w-full" src={image} alt="Background" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-5xl font-extrabold tracking-normal leading-tight title-font text-white mb-4">
                    {title}
                </h1>
                <p className="text-white text-lg">
                    {description}
                </p>
            </div>
        </div>

    );
};
