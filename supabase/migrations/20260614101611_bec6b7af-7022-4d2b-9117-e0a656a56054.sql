ALTER TABLE public.estimates
  ADD COLUMN IF NOT EXISTS referral_code text,
  ADD COLUMN IF NOT EXISTS discount_amount integer;