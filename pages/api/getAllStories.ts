import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import passwordProtected from '../../lib/passwordProtected';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { data, error } = await supabase
        .from('stories')
        .select('*')

    if (error) {
        return res.status(401).json({ error: error.message });
    }

    return res.status(200).json(data);
}

export default passwordProtected(handler);