// pages/api/confirmStory.ts
import { NextApiRequest, NextApiResponse } from 'next';
import passwordProtected from '../../lib/passwordProtected';

const confirmStoryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { storyId } = req.body;

    // Your logic to confirm the story goes here
    if (!storyId) {
        return res.status(400).json({ message: 'Story ID is required' });
    }

    // Example confirmation logic
    const isConfirmed = true; // Assume the story is confirmed for example purposes

    res.status(200).json({ message: isConfirmed ? 'Story confirmed' : 'Failed to confirm story' });
};

export default passwordProtected(confirmStoryHandler);
