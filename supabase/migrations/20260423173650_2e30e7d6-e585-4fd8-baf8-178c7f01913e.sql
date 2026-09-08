create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Anyone can submit (public contact form)
create policy "Anyone can submit contact messages"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (
    char_length(name) between 1 and 100
    and char_length(email) between 3 and 255
    and char_length(message) between 5 and 1000
  );

-- Only admins can read
create policy "Admins can view submissions"
  on public.contact_submissions for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete submissions"
  on public.contact_submissions for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index contact_submissions_created_at_idx on public.contact_submissions (created_at desc);