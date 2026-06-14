
-- 1) user_roles: prevent privilege escalation
CREATE POLICY "Only admins can insert roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2) user_push_tokens: restrict to authenticated role only
DROP POLICY IF EXISTS "Users manage own push tokens" ON public.user_push_tokens;
CREATE POLICY "Users manage own push tokens"
  ON public.user_push_tokens FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3) referrals: require auth + match own email + let users see their own
DROP POLICY IF EXISTS "anyone_can_insert_referrals" ON public.referrals;
CREATE POLICY "authenticated_insert_own_referrals"
  ON public.referrals FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND lower(referrer_email) = lower((auth.jwt() ->> 'email'))
  );

CREATE POLICY "users_view_own_referrals"
  ON public.referrals FOR SELECT TO authenticated
  USING (lower(referrer_email) = lower((auth.jwt() ->> 'email')));
