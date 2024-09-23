import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('is_confirmed', true);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
}
