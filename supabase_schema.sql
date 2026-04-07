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

-- 2. Optional: Enable Row Level Security (RLS)
-- Note: Your current frontend architecture uses the public 'anon' key to read and insert data
-- without Supabase user authentication. To ensure your current frontend code functions 
-- correctly as written, you can disable RLS for this table or create public policies.

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 3. Create policies to allow public inserts (Allows people to contact you)
CREATE POLICY "Enable public insert" 
ON public.messages 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 4. Create policies to allow public reads (Required for your current Admin Portal to fetch data using anon key)
-- WARNING: This means anyone with some technical knowledge could potentially read your messages. 
-- In the future, you may want to integrate Supabase Auth to secure your Admin portal properly!
CREATE POLICY "Enable public select" 
ON public.messages 
FOR SELECT 
TO public 
USING (true);

-- 5. Create policies to allow public deletion (If you plan to add delete functionality later)
CREATE POLICY "Enable public delete" 
ON public.messages 
FOR DELETE 
TO public 
USING (true);
