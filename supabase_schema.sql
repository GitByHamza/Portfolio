-- SQL script to set up the 'messages' table in Supabase
-- You can run this directly in the Supabase SQL Editor.

-- 1. Create the messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT,
    message TEXT NOT NULL
);

-- Public contact submissions; message reads/deletes require a trusted admin claim.
-- For existing databases apply supabase/migrations/20261105_private_messages.up.sql.
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable public insert" ON public.messages FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Portfolio admin reads messages" ON public.messages FOR SELECT TO authenticated
USING (auth.jwt() -> 'app_metadata' ->> 'portfolio_admin' = 'true');
CREATE POLICY "Portfolio admin deletes messages" ON public.messages FOR DELETE TO authenticated
USING (auth.jwt() -> 'app_metadata' ->> 'portfolio_admin' = 'true');
