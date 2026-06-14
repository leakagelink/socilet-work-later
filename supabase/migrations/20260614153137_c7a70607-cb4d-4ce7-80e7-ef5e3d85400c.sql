
DROP POLICY IF EXISTS "anyone_can_insert_leads" ON public.leads;
CREATE POLICY "anyone_can_insert_leads"
  ON public.leads FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(coalesce(name,'')) BETWEEN 1 AND 100
    AND char_length(coalesce(email,'')) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

DROP POLICY IF EXISTS "anyone_can_insert_estimates" ON public.estimates;
CREATE POLICY "anyone_can_insert_estimates"
  ON public.estimates FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(coalesce(project_type,'')) BETWEEN 1 AND 100
  );

DROP POLICY IF EXISTS "anyone_can_insert_tickets" ON public.support_tickets;
CREATE POLICY "anyone_can_insert_tickets"
  ON public.support_tickets FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(coalesce(subject,'')) BETWEEN 1 AND 200
    AND char_length(coalesce(message,'')) BETWEEN 1 AND 5000
  );
