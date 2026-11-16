// Imports the legacy apsad.net CMS through its public read API (api.apsad.net):
// every page, news item, event (with its photo set), gallery plate, affiliation
// and slider image. Images land in public/legacy, sanitized content in
// src/data/legacy. Documents the old HTML linked to on www.apsad.net are gone
// from the live server, so they are recovered from the Wayback Machine when
// possible and the link is dropped (text kept) when not.
//
// Re-runnable: files already on disk are not downloaded again.
// Usage: node scripts/import-legacy.mjs

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';
import sanitizeHtml from 'sanitize-html';

const API = 'https://api.apsad.net';
const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const DATA = path.join(ROOT, 'src/data/legacy');
const FOLDER = {
  news: 'D8BD5E14',
  event: 'B5F4EB72',
  eventGallery: 'DF6A5ABA',
  gallery: 'D44F6FCC',
  affiliation: '8546D2F9',
  slider: 'BCBFAFF7',
};
// Plates are shown near native size (DESIGN.md, The Plate Rule); anything wider is camera originals.
const MAX_WIDTH = 1600;
const THUMB_WIDTH = 480;
const MAX_DOC_BYTES = 40 * 1024 * 1024;

const missing = [];

async function fetchRetry(url, { attempts = 3, timeout = 60_000 } = {}) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(timeout) });
      if (res.ok) return res;
      if (res.status === 404) return null;
      if (i === attempts) return null;
    } catch (error) {
      if (i === attempts) {
        console.warn(`  ! ${url}: ${error.message}`);
        return null;
      }
    }
    await new Promise((r) => setTimeout(r, 1000 * i));
  }
  return null;
}

async function api(endpoint) {
  const res = await fetchRetry(`${API}/api/${endpoint}`);
  if (!res) throw new Error(`API request failed: ${endpoint}`);
  return res.json();
}

async function paged(controller, perPage) {
  const count = await api(`${controller}/GetCount`);
  const rows = [];
  for (let page = 1; page <= Math.ceil(count / perPage); page++) {
    rows.push(...(await api(`${controller}?pageNumber=${page}`)));
  }
  const unique = [...new Map(rows.map((row) => [row.id, row])).values()];
  if (unique.length !== count) throw new Error(`${controller}: expected ${count}, got ${unique.length}`);
  return unique;
}

async function pool(items, size, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i], i);
      }
    }),
  );
  return out;
}

const extOf = (name) => (path.extname(name).toLowerCase() || '.jpg').replace('.jpeg', '.jpg');

async function readOrNull(file) {
  try {
    return await readFile(file);
  } catch {
    return null;
  }
}

/** Downloads one image to public/<rel>, downscaling camera originals. Returns {src,thumb,width,height} or null. */
async function image(url, rel) {
  const file = path.join(PUBLIC, rel);
  let buf = await readOrNull(file);
  if (!buf) {
    const res = await fetchRetry(url);
    if (!res) {
      missing.push(url);
      return null;
    }
    buf = Buffer.from(await res.arrayBuffer());
    // A few originals on the old server are truncated; leave them out rather than show half a photograph.
    try {
      await sharp(buf, { failOn: 'truncated' }).stats();
    } catch {
      missing.push(`${url} (corrupt on the old server)`);
      return null;
    }
    const meta = await sharp(buf).metadata();
    const width = meta.orientation >= 5 ? meta.height : meta.width;
    if (meta.format === 'jpeg' && (width > MAX_WIDTH || buf.length > 900_000)) {
      buf = await sharp(buf)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();
    }
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, buf);
  }

  // Grids and ledgers use a pre-built thumbnail, so the site never depends on a host's image optimizer.
  const thumbRel = `legacy/thumbs/${rel.replace(/^legacy\//, '').replace(/\.\w+$/, '.webp')}`;
  const thumbFile = path.join(PUBLIC, thumbRel);
  if (!existsSync(thumbFile)) {
    await mkdir(path.dirname(thumbFile), { recursive: true });
    await sharp(buf).rotate().resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 72 }).toFile(thumbFile);
  }
  const meta = await sharp(buf).metadata();
  const swap = meta.orientation >= 5;
  return { src: `/${rel}`, thumb: `/${thumbRel}`, width: swap ? meta.height : meta.width, height: swap ? meta.width : meta.height };
}

const legacyUrl = (folder, name) => `${API}/${folder}/${encodeURIComponent(name)}`;

// ---------- legacy www.apsad.net documents referenced from content HTML ----------

const decodeAmp = (s) => s.replace(/&amp;/g, '&');
const isOldSite = (href) => /^https?:\/\/(www\.)?apsad\.net\//i.test(href);
const isOldAsset = (href) => isOldSite(href) && /\/(pictures|uploads)\//i.test(href);

function safeName(url) {
  const base = decodeURIComponent(new URL(url).pathname.split('/').pop());
  const ext = path.extname(base).toLowerCase();
  const slug = path
    .basename(base, path.extname(base))
    .normalize('NFKD')
    .replace(/[^\w-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  const hash = createHash('sha1').update(url).digest('hex').slice(0, 6);
  return `${slug || 'document'}-${hash}${ext}`;
}

async function recoverOldAsset(url) {
  const folder = /\.(jpe?g|png|gif)$/i.test(url) ? 'content' : 'docs';
  const rel = `legacy/${folder}/${safeName(url)}`;
  if (await readOrNull(path.join(PUBLIC, rel))) return `/${rel}`;

  const variants = [url, url.replace('://apsad.net', '://www.apsad.net'), url.replace('://www.apsad.net', '://apsad.net')];
  for (const candidate of [...new Set(variants)]) {
    const res = await fetchRetry(`https://web.archive.org/web/2018id_/${candidate}`, { attempts: 2, timeout: 90_000 });
    if (!res || (res.headers.get('content-type') ?? '').includes('text/html')) continue;
    const size = Number(res.headers.get('content-length') ?? 0);
    if (size > MAX_DOC_BYTES) {
      console.warn(`  ! skipped ${url} (${(size / 1e6).toFixed(0)} MB)`);
      break;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > MAX_DOC_BYTES) break;
    await mkdir(path.join(PUBLIC, 'legacy', folder), { recursive: true });
    await writeFile(path.join(PUBLIC, rel), buf);
    return `/${rel}`;
  }
  missing.push(url);
  return null;
}

// ---------- HTML cleanup ----------

const decodeEntities = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

function toText(html) {
  return decodeEntities(sanitizeHtml(html ?? '', { allowedTags: [], allowedAttributes: {} }))
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(text, max = 240) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:–-]+$/, '')}…`;
}

function makeCleaner(resolveLink) {
  const withDir = (tagName, attribs) => ({ tagName, attribs: { ...attribs, dir: 'auto' } });
  return (html) =>
    sanitizeHtml((html ?? '').replace(/&nbsp;| /g, ' '), {
      allowedTags: ['p', 'br', 'em', 'strong', 'b', 'i', 'u', 'a', 'ul', 'ol', 'li', 'h3', 'h4', 'img', 'blockquote'],
      allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt', 'loading'], '*': ['dir', 'style'] },
      allowedStyles: { '*': { 'text-align': [/^center$/] } },
      allowedSchemes: ['http', 'https', 'mailto'],
      transformTags: {
        p: withDir,
        li: withDir,
        h3: withDir,
        h4: withDir,
        a: (tagName, attribs) => {
          const href = resolveLink(decodeAmp(attribs.href ?? ''));
          // Renaming the tag here confuses sanitize-html's close-tag matching; unwrap after instead.
          if (!href) return { tagName, attribs: {} };
          const external = /^https?:/.test(href);
          return { tagName, attribs: external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href } };
        },
        img: (tagName, attribs) => {
          const src = resolveLink(decodeAmp(attribs.src ?? ''));
          return { tagName, attribs: src ? { src, alt: attribs.alt ?? '', loading: 'lazy' } : {} };
        },
      },
      exclusiveFilter: (frame) =>
        (frame.tag === 'img' && !frame.attribs.src) ||
        (['p', 'h3', 'h4', 'li'].includes(frame.tag) && !frame.text.trim() && !frame.mediaChildren.length),
    })
      .replace(/<a>\s*(read more|more|التفاصيل)\s*<\/a>/gi, '')
      .replace(/<a>([\s\S]*?)<\/a>/g, '$1')
      // The old editor used runs of <br> as spacing; keep at most a paragraph break.
      .replace(/(<br \/>\s*){3,}/g, '<br /><br />')
      .replace(/(<p dir="auto">)\s*(<br \/>\s*)+/g, '$1')
      .replace(/(<br \/>\s*)+<\/(p|li|h3|h4)>/g, '</$2>')
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/<p dir="auto">\s*<\/p>/g, '')
      .trim();
}

// ---------- affiliations ----------

// The CMS titles affiliations as sentences ("APSAD is member of EUROPA NOSTRA"); the site shows the body's name.
const AFFILIATION_NAMES = [
  [/monument fund/i, 'World Monuments Fund'],
  [/europa nostra/i, 'Europa Nostra'],
  [/patrimoine sans/i, 'Patrimoine Sans Frontières'],
  [/icomos/i, 'ICOMOS Lebanon'],
  [/civitas nostra/i, 'Civitas Nostra'],
];

function safeHttpUrl(value) {
  try {
    const url = new URL(String(value ?? '').trim());
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

// ---------- archive series ----------

// Gallery filenames keep the old archive's folder path: "Green Folders<Place><n>.<Subject>",
// "Region <letters><Place>", or a Beirut/Sofar series, followed by a plate code like "B-117".
function archiveSeries(source) {
  const stem = source
    .replace(/\.\w+$/, '')
    .replace(/\(\d+\)$/, '')
    .replace(/\d+\([IVX]+\)$/, '')
    .replace(/[A-Z]?-\d+$/, '')
    .trim();
  const firstWords = (s) => s.split(/[\d(]/)[0].replace(/([a-z'éè])([A-Z])/, '$1|$2').split('|')[0].replace(/[\s.-]+$/, '');

  if (stem.startsWith('Green Folders')) return { series: 'The Green Folders', place: firstWords(stem.slice(13)) };
  if (stem.startsWith('Region')) {
    let rest = stem.replace(/^Region\s*/, '');
    if (/\(\d\)/.test(rest)) rest = rest.split(/\(\d\)/).pop();
    rest = rest.replace(/^Jounieh [AB]/, '').replace(/^(?:[A-Z] )*[A-Z](?=[A-Z][a-z'])/, '');
    return { series: 'The Regional Survey', place: rest.trim() };
  }
  if (/sofar/i.test(stem)) return { series: 'Sofar', place: 'Sofar' };
  return { series: 'Beirut', place: 'Beyrouth' };
}

// ---------- main ----------

async function main() {
  console.log('Fetching content from', API);
  const codes = await api('Page/GetPageCodes');
  const pages = await Promise.all(codes.map((code) => api(`Page/GetPageContent/${code}`)));
  const newsList = await paged('News', 15);
  const news = await pool(newsList, 6, (n) => api(`News/GetByIdAsync?id=${n.id}`));
  const eventList = await paged('Event', 15);
  const events = await pool(eventList, 6, (e) => api(`Event/GetByIdAsync?id=${e.id}`));
  const gallery = await paged('Gallery', 21);
  const affiliations = await api('Affiliation');
  const slider = await api('Banner');
  console.log({ pages: pages.length, news: news.length, events: events.length, gallery: gallery.length, affiliations: affiliations.length });

  // Old ASP.NET event ids survive as the "(NN)" prefix on each event's photo files.
  const oldEventIds = new Map();
  for (const e of events) {
    for (const pic of e.eventGallery) {
      const m = pic.match(/^\((\d+)\)/);
      if (m) oldEventIds.set(m[1], e.id);
    }
  }

  const allHtml = [
    ...pages.map((p) => p.content),
    ...news.flatMap((n) => [n.content, n.summary]),
    ...events.flatMap((e) => [e.content, e.summary]),
    ...affiliations.map((a) => a.description),
  ].join('\n');
  const oldAssets = [...new Set([...allHtml.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => decodeAmp(m[1])).filter(isOldAsset))];
  console.log(`Recovering ${oldAssets.length} documents/images from the Wayback Machine…`);
  const recovered = new Map(await pool(oldAssets, 3, async (url) => [url, await recoverOldAsset(url)]));

  const resolveLink = (href) => {
    if (!href) return null;
    if (recovered.has(href)) return recovered.get(href);
    if (/znmregistration/i.test(href)) return '/work/zaki-nassif-museum#music-school';
    const oldEvent = href.match(/Event\.aspx\?id=(\d+)/i);
    if (oldEvent) return oldEventIds.has(oldEvent[1]) ? `/events/${oldEventIds.get(oldEvent[1])}` : '/events';
    if (isOldSite(href)) return null;
    return href;
  };
  const clean = makeCleaner(resolveLink);

  console.log('Downloading images…');
  const newsOut = await pool(news, 8, async (n) => {
    const content = clean(n.content);
    return {
      id: n.id,
      title: toText(n.title),
      date: n.date,
      summary: toText(n.summary) || excerpt(toText(content)),
      content,
      image: n.picture ? await image(legacyUrl(FOLDER.news, n.picture), `legacy/news/${n.id}${extOf(n.picture)}`) : null,
    };
  });

  const eventsOut = await pool(events, 4, async (e) => {
    const content = clean(e.content);
    return {
      id: e.id,
      legacyId: Number(e.eventGallery.map((pic) => pic.match(/^\((\d+)\)/)?.[1]).find(Boolean)) || null,
      title: toText(e.title),
      date: e.date,
      location: e.location ? toText(e.location) : null,
      summary: toText(e.summary) || excerpt(toText(content)),
      content,
      image: e.picture ? await image(legacyUrl(FOLDER.event, e.picture), `legacy/events/${e.id}${extOf(e.picture)}`) : null,
      gallery: (
        await pool(e.eventGallery, 6, (pic, i) =>
          image(legacyUrl(FOLDER.eventGallery, pic), `legacy/events/${e.id}/${String(i + 1).padStart(3, '0')}${extOf(pic)}`),
        )
      ).filter(Boolean),
    };
  });

  const galleryOut = (
    await pool(gallery, 8, async (g) => {
      const img = await image(legacyUrl(FOLDER.gallery, g.picture), `legacy/gallery/${g.id}${extOf(g.picture)}`);
      return img && { id: g.id, description: toText(g.description), ...archiveSeries(g.picture), ...img };
    })
  ).filter(Boolean);

  const affiliationsOut = await pool(affiliations, 4, async (a) => {
    const statement = toText(a.name);
    const name = AFFILIATION_NAMES.find(([pattern]) => pattern.test(statement))?.[1] ?? statement;
    let link = safeHttpUrl(a.link);
    // The old record links ICOMOS to Patrimoine Sans Frontières' site; drop it rather than repeat the error.
    if (/icomos/i.test(statement) && link?.includes('patrimsf')) link = null;
    return {
      id: a.id,
      name,
      statement,
      description: clean(a.description),
      link,
      image: a.picture ? await image(legacyUrl(FOLDER.affiliation, a.picture), `legacy/affiliations/${a.id}${extOf(a.picture)}`) : null,
    };
  });

  const sliderOut = (await pool(slider, 4, (name) => image(legacyUrl(FOLDER.slider, name), `legacy/slider/${name.toLowerCase()}`))).filter(Boolean);

  const pagesOut = Object.fromEntries(pages.map((p) => [p.code, { title: p.title ? toText(p.title) : null, content: clean(p.content) }]));

  const byDateDesc = (a, b) => b.date.localeCompare(a.date) || b.id - a.id;
  await mkdir(DATA, { recursive: true });
  const write = (name, data) => writeFile(path.join(DATA, `${name}.json`), `${JSON.stringify(data, null, 2)}\n`);
  await write('pages', pagesOut);
  await write('news', newsOut.sort(byDateDesc));
  await write('events', eventsOut.sort(byDateDesc));
  await write('gallery', galleryOut.sort((a, b) => a.id - b.id));
  await write('affiliations', affiliationsOut);
  await write('slider', sliderOut);

  const photos = newsOut.length + eventsOut.reduce((n, e) => n + 1 + e.gallery.length, 0) + galleryOut.length + affiliationsOut.length + sliderOut.length;
  console.log(`Done. ~${photos} images, ${[...recovered.values()].filter(Boolean).length}/${oldAssets.length} old documents recovered.`);
  if (missing.length) {
    console.log(`${missing.length} files could not be retrieved:`);
    for (const url of missing) console.log('  -', url);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
