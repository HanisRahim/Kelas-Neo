-- ============================================
-- SUPABASE DELETE POLICY FOR FOOD HISTORY
-- ============================================
-- Run this in Supabase SQL Editor to enable delete functionality
-- (Dashboard → SQL Editor → New Query → Run)

-- Add delete policy to allow public delete access
CREATE POLICY "Allow public delete access" ON food_history
  FOR DELETE USING (true);

-- ============================================
-- VERIFY THE POLICY
-- ============================================
-- You can verify all policies by running:
-- SELECT * FROM pg_policies WHERE tablename = 'food_history';

-- ============================================
-- OPTIONAL: Restrict to authenticated users only
-- ============================================
-- If you want only authenticated users to delete their own history:
-- 
-- First, drop the public delete policy:
-- DROP POLICY "Allow public delete access" ON food_history;
-- 
-- Then create a user-specific policy:
-- CREATE POLICY "Users can delete own history" ON food_history
--   FOR DELETE USING (auth.uid() = user_id);
-- 
-- Note: This requires adding a user_id column and authentication setup

