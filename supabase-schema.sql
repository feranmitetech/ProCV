-- Run this in your Supabase SQL Editor
-- Go to: supabase.com → your project → SQL Editor → New Query → paste and run

create table if not exists payments (
  id uuid default gen_random_uuid() primary key,
  reference text unique not null,
  email text not null,
  amount integer not null,         -- in kobo (150000 = ₦1,500)
  status text default 'pending',   -- pending | success | failed
  created_at timestamptz default now(),
  paid_at timestamptz
);

-- Index for fast lookups by reference
create index if not exists payments_reference_idx on payments (reference);

-- Index for lookups by email (to find all CVs by a user)
create index if not exists payments_email_idx on payments (email);

-- Enable Row Level Security
alter table payments enable row level security;

-- Only allow server-side access via service role key (no public reads)
create policy "Service role only" on payments
  using (false);
