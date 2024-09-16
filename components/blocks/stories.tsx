"use client";
import React, { useEffect, useState } from 'react';
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { motion } from 'framer-motion';

// Define the type for the Story data
type StoryType = {
    id: string;
    title: string;
    content: string;
};

const storyVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const typingVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
        opacity: 1,
        transition: {
            delay: i * 0.05
        }
    })
};

export const Stories: React.FC = () => {
    const [stories, setStories] = useState<StoryType[]>([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('/api/getStories');
                const data = await response.json();
                setStories(data);
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };

        fetchStories();
    }, []);

    return (
        <Section>
            <Container className="flex relative flex-col items-center">
                <div className="story-block flex flex-col items-center justify-center w-full">
                    {stories.map((story, index) => (
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
                <div className='fixed bg-black bottom-0 p-8 w-full text-center'>
                    הכרת את רועי? <a className='underline' href={`/add-story`}>הוסף סיפור כאן</a>
                </div>
            </Container>
        </Section>
    );
};

const Story: React.FC<{ data: StoryType; index: number }> = ({ data, index }) => {
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
                onAnimationComplete={() => setContentVisible(true)}
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
                animate={contentVisible ? "visible" : "hidden"}
                variants={typingVariants}
            >
                {data.content.split("").map((char, i) => (
                    <motion.span key={i} variants={typingVariants} custom={i}>
                        {char}
                    </motion.span>
                ))}
            </motion.p>
            <motion.hr></motion.hr>
        </div >
    );
};

// TinaCMS schema for Stories block
export const storiesBlockSchema = {
    name: "stories",
    label: "בלוק סיפורים",
    fields: [
        {
            type: "object",
            label: "סיפורים",
            name: "stories",
            list: true,
            ui: {
                itemProps: (item) => {
                    return {
                        label: item?.title || "סיפור חדש",
                    };
                },
            },
            fields: [
                {
                    name: "title",
                    label: "כותרת",
                    type: "string",
                },
                {
                    name: "content",
                    label: "תוכן",
                    type: "string",
                },
            ],
        },
    ],
};