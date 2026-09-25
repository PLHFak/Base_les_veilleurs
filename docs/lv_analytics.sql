-- Mesure d'audience des trois sites Les Veilleurs — à exécuter une fois dans l'éditeur SQL Supabase.
create table if not exists public.lv_hits (
  id bigserial primary key,
  ts timestamptz not null default now(),
  site text, ev text, lang text, page text, doc text, sid text, dur int, ref text,
  country text, city text, device text
);
create index if not exists lv_hits_ts on public.lv_hits (ts);
alter table public.lv_hits enable row level security;
drop policy if exists lv_hits_insert on public.lv_hits;
create policy lv_hits_insert on public.lv_hits for insert to anon with check (true);
-- pas de politique select : la clé anon ne peut rien lire.

create table if not exists public.lv_config (key text primary key, value text);
alter table public.lv_config enable row level security;   -- aucune politique : illisible avec la clé anon
insert into public.lv_config (key, value) values ('admin_code', 'PLH')
  on conflict (key) do update set value = excluded.value;

create or replace function public.lv_stats(p_code text, p_days int default 90)
returns json language plpgsql security definer set search_path = public as $$
declare ok boolean; since timestamptz := now() - make_interval(days => p_days); r json;
begin
  select value = p_code into ok from lv_config where key = 'admin_code';
  if not coalesce(ok, false) then return null; end if;
  select json_build_object(
    'days', p_days,
    'sessions', (select count(distinct sid) from lv_hits where ts > since and ev = 'view'),
    'views', (select count(*) from lv_hits where ts > since and ev = 'view'),
    'downloads', (select count(*) from lv_hits where ts > since and ev = 'dl'),
    'by_day', (select coalesce(json_agg(json_build_object('d', d, 'n', n) order by d), '[]'::json)
               from (select date(ts) d, count(distinct sid) n from lv_hits where ts > since and ev = 'view' group by 1) x),
    'by_site', (select coalesce(json_agg(json_build_object('k', site, 'n', n) order by n desc), '[]'::json)
                from (select site, count(distinct sid) n from lv_hits where ts > since and ev = 'view' group by 1) x),
    'by_lang', (select coalesce(json_agg(json_build_object('k', lang, 'n', n) order by n desc), '[]'::json)
                from (select coalesce(lang, '?') lang, count(distinct sid) n from lv_hits where ts > since and ev = 'view' group by 1) x),
    'by_country', (select coalesce(json_agg(json_build_object('k', k, 'n', n) order by n desc), '[]'::json)
                   from (select coalesce(country, '?') || coalesce(' · ' || city, '') k, count(distinct sid) n from lv_hits where ts > since and ev = 'view' group by 1 order by 2 desc limit 25) x),
    'by_device', (select coalesce(json_agg(json_build_object('k', device, 'n', n) order by n desc), '[]'::json)
                  from (select coalesce(device, '?') device, count(distinct sid) n from lv_hits where ts > since and ev = 'view' group by 1) x),
    'docs', (select coalesce(json_agg(json_build_object('k', doc, 'site', site, 'n', n) order by n desc), '[]'::json)
             from (select doc, site, count(*) n from lv_hits where ts > since and ev = 'dl' group by 1, 2 order by 3 desc limit 40) x),
    'recent', (select coalesce(json_agg(json_build_object('ts', ts, 'site', site, 'lang', lang, 'country', country, 'city', city, 'device', device, 'ref', ref, 'dur', dur, 'docs', docs, 'pages', pages) order by ts desc), '[]'::json)
               from (select min(ts) ts, min(site) site, min(lang) lang, min(country) country, min(city) city, min(device) device, min(ref) ref, max(dur) dur,
                            count(*) filter (where ev = 'dl') docs, count(*) filter (where ev = 'view') pages
                     from lv_hits where ts > since and sid is not null group by sid order by 1 desc limit 60) x)
  ) into r;
  return r;
end $$;
revoke all on function public.lv_stats(text, int) from public;
grant execute on function public.lv_stats(text, int) to anon;
