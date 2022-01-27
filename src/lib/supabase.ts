import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_DATABASE_URL;
const key = process.env.SUPABASE_PUBLIC_KEY;

const supabase = createClient(url, key);

export default supabase;