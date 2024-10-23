"use client";
import React, { useState, useEffect } from "react";

export const Cover = ({
    image,
    title = "",
    description = "",
}: {
    image: string;
    title?: string;
    description?: string;
}) => {
    const [isLoading, setIsLoading] = useState(true); // Internal loading state

    const handleImageLoad = () => {
        setIsLoading(false); // Stop loading once the image is loaded
    };

    useEffect(() => {
        // Preload the image to trigger the handleImageLoad correctly
        const img = new Image();
        img.src = image;
        img.onload = handleImageLoad;
    }, [image]);

    return (
        <div className="relative">
            {isLoading ? (
                // Loading skeleton while the image is loading
                <div className="w-full rounded-lg shadow-lg pb-[68%] flex items-center justify-center">
                    {/* Skeleton Placeholder */}
                </div>
            ) : (
                <>
                    <img className="w-full" src={image} alt="Background" />
                    {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"> */}
                    <div className="bg-white text-center bg-opacity-50 px-4 py-2 rounded">
                        <h1 className="text-xl tracking-normal leading-tight title-font text-black mb-4">
                            {description}
                        </h1>
                        {/* <p className="text-white text-lg">
                            {description}
                        </p> */}
                    </div>
                    {/* </div> */}
                </>
            )}
        </div>
    );
};
