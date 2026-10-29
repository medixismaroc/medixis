-- Medixis — schéma initial de l'espace admin
-- À coller dans Supabase Dashboard → SQL Editor → New query → Run (une seule fois).

create extension if not exists "pgcrypto";

-- ── Administrateurs autorisés ───────────────────────────────
-- Seuls les e-mails listés ici peuvent modifier le contenu, même si quelqu'un
-- parvenait à créer un compte. Ajouter les e-mails en bas de ce fichier.
create table admins (
  email text primary key
);

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where lower(email) = lower(auth.jwt() ->> 'email'));
$$;

-- ── Gammes ──────────────────────────────────────────────────
create table ranges (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_fr text not null,
  name_en text not null,
  summary_fr text not null default '',
  summary_en text not null default '',
  body_fr text not null default '',
  body_en text not null default '',
  image_url text,
  order_index int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Produits ────────────────────────────────────────────────
create table products (
  id uuid primary key default gen_random_uuid(),
  range_id uuid not null references ranges(id) on delete cascade,
  name text not null,
  brand text,
  description_fr text not null default '',
  description_en text not null default '',
  image_url text,
  datasheet_url text,
  order_index int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index products_range_idx on products(range_id);

-- ── Marques partenaires ─────────────────────────────────────
create table brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  note_fr text,
  note_en text,
  logo_url text,
  order_index int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Réglages ────────────────────────────────────────────────
create table settings (
  key text primary key,
  value text
);

-- ── Mise à jour automatique de updated_at ───────────────────
create or replace function touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger ranges_touch before update on ranges for each row execute function touch_updated_at();
create trigger products_touch before update on products for each row execute function touch_updated_at();
create trigger brands_touch before update on brands for each row execute function touch_updated_at();

-- ── Sécurité (RLS) ──────────────────────────────────────────
alter table admins enable row level security;
alter table ranges enable row level security;
alter table products enable row level security;
alter table brands enable row level security;
alter table settings enable row level security;

create policy "admins read self" on admins for select using (is_admin());

create policy "public read active ranges" on ranges for select using (active = true or is_admin());
create policy "admin manage ranges" on ranges for all using (is_admin()) with check (is_admin());

create policy "public read active products" on products for select using (active = true or is_admin());
create policy "admin manage products" on products for all using (is_admin()) with check (is_admin());

create policy "public read active brands" on brands for select using (active = true or is_admin());
create policy "admin manage brands" on brands for all using (is_admin()) with check (is_admin());

create policy "public read settings" on settings for select using (true);
create policy "admin manage settings" on settings for all using (is_admin()) with check (is_admin());

-- ── Stockage des images ─────────────────────────────────────
insert into storage.buckets (id, name, public) values ('medixis-images', 'medixis-images', true)
on conflict (id) do nothing;

create policy "public read medixis images" on storage.objects
  for select using (bucket_id = 'medixis-images');
create policy "admin write medixis images" on storage.objects
  for insert with check (bucket_id = 'medixis-images' and is_admin());
create policy "admin update medixis images" on storage.objects
  for update using (bucket_id = 'medixis-images' and is_admin());
create policy "admin delete medixis images" on storage.objects
  for delete using (bucket_id = 'medixis-images' and is_admin());

-- ── Contenu de départ ───────────────────────────────────────
insert into settings (key, value) values ('maintenance_mode', 'false');

insert into ranges (slug, name_fr, name_en, summary_fr, summary_en, body_fr, body_en, order_index) values
('gamme-1', 'Gamme 1 [À COMPLÉTER]', 'Range 1 [TO COMPLETE]', 'Courte description de la gamme.', 'Short description of the range.', 'Présentation détaillée de la gamme.', 'Detailed presentation of the range.', 1),
('gamme-2', 'Gamme 2 [À COMPLÉTER]', 'Range 2 [TO COMPLETE]', 'Courte description de la gamme.', 'Short description of the range.', 'Présentation détaillée de la gamme.', 'Detailed presentation of the range.', 2),
('gamme-3', 'Gamme 3 [À COMPLÉTER]', 'Range 3 [TO COMPLETE]', 'Courte description de la gamme.', 'Short description of the range.', 'Présentation détaillée de la gamme.', 'Detailed presentation of the range.', 3);

-- ── À MODIFIER : e-mail(s) autorisé(s) à se connecter à l'admin ──
insert into admins (email) values ('edhemrombhot@gmail.com');
