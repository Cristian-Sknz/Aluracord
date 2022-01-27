import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from 'src/lib/supabase';

function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.from('messages').select('*').then((response) => {
    res.status(response.status).json(response.data);
  });
}

export default handler;