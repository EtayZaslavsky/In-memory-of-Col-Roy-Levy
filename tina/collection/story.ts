import type { Collection } from "tinacms";

const Story: Collection = {
    label: "Stories",
    name: "story",
    path: "content/stories",

    fields: [
        {
            type: 'string',
            name: 'title',
            label: 'Title',
        },
        {
            type: 'string',
            name: 'content',
            label: 'Content',
            ui: {
                component: 'textarea', // Optional rich text editor
            },
        },
        {
            type: 'datetime',
            name: 'createdAt',
            label: 'Created At',
        }
    ],
};

export default Story;
