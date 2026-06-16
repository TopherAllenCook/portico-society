-- VerveMD pivoted from medical/longevity to home services.
--
-- Production drift: audit_jobs.specialty had been changed (outside these
-- migrations) into a medical-era enum `clinic_specialty`
-- (longevity | concierge | aesthetic | mixed). That enum REJECTED the
-- home-services trades the pivoted app now sends
-- (plumbing | hvac | electrical | roofing | other), so every audit insert
-- failed with create_failed and the audit tool was effectively dead.
--
-- The rest of the schema (outbound_*, mockup_*) already models specialty as
-- free text, and the API validates it with Zod (SpecialtySchema), so the DB
-- enum was redundant enforcement. Convert the column back to text to match the
-- repo's declared schema, future-proof against new trades, and drop the dead
-- enum.
--
-- Idempotent. Safe to re-run.

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'audit_jobs'
      and column_name = 'specialty'
      and udt_name = 'clinic_specialty'
  ) then
    alter table public.audit_jobs
      alter column specialty type text using specialty::text;
  end if;
end $$;

drop type if exists public.clinic_specialty;
