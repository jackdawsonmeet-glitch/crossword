-- Run once in Supabase > SQL Editor before using the new email field.
alter table public.player_profiles
  add column if not exists email text;

create unique index if not exists player_profiles_email_unique
  on public.player_profiles (lower(email))
  where email is not null;
