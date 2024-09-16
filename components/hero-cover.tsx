"use client";
import React from "react";

export const Cover = ({
    image,
    title = "",
    description = "",
    isLoading = false, // New prop to handle loading state
}: {
    image: string;
    title?: string;
    description?: string;
    isLoading?: boolean;
}) => {
    return (
        <div className="relative">
            {isLoading ? (
                <div className="animate-pulse bg-gray-300 w-full h-[400px] flex items-center justify-center">
                    {/* Skeleton Placeholder */}
                    <div className="text-center">
                        <div className="bg-gray-400 h-10 w-48 mb-4 rounded"></div>
                        <div className="bg-gray-400 h-6 w-64 rounded"></div>
                    </div>
                </div>
            ) : (
                <>
                    <img className="w-full" src={image} alt="Background" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <h1 className="text-5xl font-extrabold tracking-normal leading-tight title-font text-white mb-4">
                            {title}
                        </h1>
                        <p className="text-white text-lg">
                            {description}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};
