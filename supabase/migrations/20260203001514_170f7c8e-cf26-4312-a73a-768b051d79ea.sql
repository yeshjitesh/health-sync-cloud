-- Add language column to profiles table for multi-language support
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS language text DEFAULT 'en';

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.language IS 'User preferred language: en (English), gu (Gujarati), pt (Portuguese)';