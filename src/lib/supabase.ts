import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY;

const supabase = createClient(url, key);

export default supabase;