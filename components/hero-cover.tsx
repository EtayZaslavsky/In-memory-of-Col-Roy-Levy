"use client";
import React from "react";
import { useState } from "react";

export const Cover = ({
    image,
    title = "",
    description = "",
}: {
    image: string;
    title?: string;
    description?: string;
    isLoading?: boolean;
}) => {
    const [isLoading, setIsLoading] = useState(true); // Internal loading state

    const handleImageLoad = () => {
        setIsLoading(false); // Stop loading once the image is loaded
    };

    return (
        <div className="relative">
            {isLoading ? (
                <div className="animate-pulse bg-gray-300 w-full pb-[68%] flex items-center justify-center">
                    <img className="w-full" src={image} alt="Background" onLoad={handleImageLoad} />

                    {/* Skeleton Placeholder */}
                    <div className="text-center">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                            <div className="bg-black bg-opacity-50 px-4 py-2 rounded">
                                <h1 className="text-5xl font-extrabold tracking-normal leading-tight title-font text-white mb-4">
                                    {title}
                                </h1>
                                <p className="text-white text-lg">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <img className="w-full" src={image} alt="Background" onLoad={handleImageLoad} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <div className="bg-black bg-opacity-50 px-4 py-2 rounded">
                            <h1 className="text-5xl font-extrabold tracking-normal leading-tight title-font text-white mb-4">
                                {title}
                            </h1>
                            <p className="text-white text-lg">
                                {description}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
