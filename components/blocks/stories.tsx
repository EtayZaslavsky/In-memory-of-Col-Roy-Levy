"use client";
import { useState } from 'react';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { motion } from 'framer-motion';

const storyVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const typingVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
        opacity: 1,
        transition: {
            delay: i * 0.05
        }
    })
};

export const Stories = ({ data }) => (
    <Section>
        <Container className="flex flex-col items-center">
            <div className="story-block flex flex-col items-center justify-center w-full">
                {data.stories &&
                    data.stories.map((story, index) => (
                        <motion.div
                            key={index}
                            className="h-screen w-full flex items-center justify-center p-4"
                            initial="hidden"
                            whileInView="visible"
                            variants={storyVariants}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <Story data={story} index={index} />
                        </motion.div>
                    ))}
            </div>
        </Container>
    </Section>
);

const Story = ({ data, index }) => {
    const [contentVisible, setContentVisible] = useState(false);

    return (
        <div
            data-tina-field={tinaField(data)}
            className="mb-8 w-full lg:w-2/3 flex flex-col items-center"
        >
            <motion.h2
                data-tina-field={tinaField(data, "title")}
                className="text-2xl font-bold"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                onAnimationComplete={() => setContentVisible(true)} // Trigger content animation
            >

                {data.title.split("").map((char, i) => (
                    <motion.span key={i} variants={typingVariants} custom={i}>
                        {char}
                    </motion.span>
                ))}
            </motion.h2>
            <motion.p
                data-tina-field={tinaField(data, "content")}
                className="mt-4 text-base text-center"
                initial="hidden"
                animate={contentVisible ? "visible" : "hidden"} // Start animation only if contentVisible is true
                variants={typingVariants}
            >

                {data.content.split("").map((char, i) => (
                    <motion.span key={i} variants={typingVariants} custom={i}>
                        {char}
                    </motion.span>
                ))}
            </motion.p>
        </div>
    );
};


// TinaCMS schema for Stories block
export const storiesBlockSchema = {
    name: "stories",
    label: "Stories Block",
    fields: [
        {
            type: "object",
            label: "Stories",
            name: "stories",
            list: true,
            ui: {
                itemProps: (item) => {
                    return {
                        label: item?.title || "New Story",
                    };
                },
            },
            fields: [
                {
                    name: "title",
                    label: "Title",
                    type: "string",
                },
                {
                    name: "content",
                    label: "Content",
                    type: "string",
                },
            ],
        },
    ],
};
