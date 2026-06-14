ALTER TABLE public.estimates
  ADD COLUMN IF NOT EXISTS design_status text,
  ADD COLUMN IF NOT EXISTS pages_count integer,
  ADD COLUMN IF NOT EXISTS tech_preference text,
  ADD COLUMN IF NOT EXISTS reference_links text,
  ADD COLUMN IF NOT EXISTS referral_source text;