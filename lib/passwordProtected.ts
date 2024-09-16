// lib/passwordProtected.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const passwordProtected = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const providedPassword = req.headers['x-api-password'];
    const storedPassword = process.env.NEXT_PUBLIC_PAGE_PASSWORD; // Password stored in environment variable

    if (!providedPassword || providedPassword !== storedPassword) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    return handler(req, res);
};

export default passwordProtected;
