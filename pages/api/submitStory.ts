// pages/api/submitStory.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch'; // Import fetch for server-side requests

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const HCAPTCHA_SECRET_KEY = process.env.HCAPTCHA_SECRET_KEY!; // Add your secret key to environment variables

// Define a type for the hCaptcha response
type HCaptchaResponseType = {
    success: boolean;
    challenge_ts?: string; // Timestamp of the challenge
    hostname?: string; // The hostname of the site where the challenge was solved
    'error-codes'?: string[]; // Optional error codes returned by hCaptcha
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title, content, author_email, author_phone, hcaptchaToken } = req.body;

        try {
            if (process.env.NODE_ENV === 'production') {



                // Verify hCaptcha token
                const hcaptchaResponse = await fetch(`https://hcaptcha.com/siteverify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `response=${hcaptchaToken}&secret=${HCAPTCHA_SECRET_KEY}`,
                });

                // Cast the response to the defined type
                const hcaptchaData: HCaptchaResponseType = await hcaptchaResponse.json() as HCaptchaResponseType;

                if (!hcaptchaData.success) {
                    return res.status(400).json({ error: 'Captcha verification failed', details: hcaptchaData['error-codes'] });
                }
            }
            // If captcha verification succeeds, continue processing the story submission
            const { error } = await supabase.from('stories').insert([{ title, content, author_email, author_phone }]);

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json({ message: 'Story submitted successfully' });
        } catch (error) {
            console.error('Error during request processing:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
