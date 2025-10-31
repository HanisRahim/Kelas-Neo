-- ============================================
-- SUPABASE TABLE SCHEMA FOR "WHAT SHOULD I EAT?"
-- ============================================
-- Copy and paste this into Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query → Run)

-- Create food_history table
CREATE TABLE food_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  food_name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  meal_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index for faster queries on created_at
CREATE INDEX idx_food_history_created_at ON food_history(created_at DESC);

-- Enable Row Level Security (recommended for security)
ALTER TABLE food_history ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read and insert access
-- (Change these policies if you want to add authentication later)
CREATE POLICY "Allow public read access" ON food_history
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON food_history
  FOR INSERT WITH CHECK (true);

-- ============================================
-- OPTIONAL: If you want to add user authentication later
-- ============================================
-- Uncomment and run this after setting up Supabase Auth:

-- -- Add user_id column
-- ALTER TABLE food_history ADD COLUMN user_id UUID REFERENCES auth.users(id);
-- 
-- -- Drop public policies
-- DROP POLICY "Allow public read access" ON food_history;
-- DROP POLICY "Allow public insert access" ON food_history;
-- 
-- -- Create authenticated user policies
-- CREATE POLICY "Users can read own history" ON food_history
--   FOR SELECT USING (auth.uid() = user_id);
-- 
-- CREATE POLICY "Users can insert own history" ON food_history
--   FOR INSERT WITH CHECK (auth.uid() = user_id);
-- 
-- -- Create index on user_id
-- CREATE INDEX idx_food_history_user_id ON food_history(user_id);

-- ============================================
-- TEST QUERIES (Run these to verify setup)
-- ============================================

-- View all records
-- SELECT * FROM food_history ORDER BY created_at DESC;

-- Count total records
-- SELECT COUNT(*) as total_choices FROM food_history;

-- Most popular foods
-- SELECT food_name, COUNT(*) as times_chosen 
-- FROM food_history 
-- GROUP BY food_name 
-- ORDER BY times_chosen DESC 
-- LIMIT 10;

-- Most popular cuisine
-- SELECT cuisine, COUNT(*) as times_chosen 
-- FROM food_history 
-- GROUP BY cuisine 
-- ORDER BY times_chosen DESC;

