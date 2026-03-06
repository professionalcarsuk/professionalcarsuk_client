import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://professionalcars.co.uk').replace(/\/$/, '');
const API_BASE = (process.env.SITEMAP_API_URL || process.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
const robotsPath = path.resolve(process.cwd(), 'public', 'robots.txt');

const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/search', changefreq: 'daily', priority: '0.9' },
  { path: '/showroom', changefreq: 'daily', priority: '0.9' },
  { path: '/used-cars', changefreq: 'daily', priority: '0.8' },
  { path: '/used-vans', changefreq: 'daily', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/finance', changefreq: 'monthly', priority: '0.7' },
  { path: '/part-exchange', changefreq: 'monthly', priority: '0.7' },
  { path: '/sellcar', changefreq: 'monthly', priority: '0.7' },
  { path: '/delivery', changefreq: 'monthly', priority: '0.6' },
  { path: '/warranty', changefreq: 'monthly', priority: '0.6' },
  { path: '/complaints', changefreq: 'monthly', priority: '0.5' },
  { path: '/terms-of-use', changefreq: 'yearly', priority: '0.4' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.4' },
  { path: '/cookie-policy', changefreq: 'yearly', priority: '0.4' },
  { path: '/sitemap', changefreq: 'monthly', priority: '0.3' },
];

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const safeJson = async (url) => {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const getBrandsForType = async (typeValue) => {
  const queryOptions = [typeValue, typeValue === 'cars' ? 'car' : 'van'];

  for (const queryType of queryOptions) {
    const data = await safeJson(`${API_BASE}/api/client/brands?type=${queryType}`);
    if (data?.success && Array.isArray(data.data)) {
      return data.data;
    }
  }

  return [];
};

const getAllRecentVehicles = async () => {
  const all = [];
  const pageSize = 200;
  const maxPages = 20;

  for (let page = 1; page <= maxPages; page += 1) {
    const data = await safeJson(`${API_BASE}/api/client/vehicles/recent?page=${page}&pageSize=${pageSize}`);
    const batch = data?.success && Array.isArray(data.data) ? data.data : [];

    if (!batch.length) break;

    all.push(...batch);

    if (batch.length < pageSize) break;
  }

  return all;
};

const addUrl = (map, pathName, { changefreq = 'monthly', priority = '0.5', lastmod } = {}) => {
  if (!pathName || pathName.includes(':') || pathName === '*') return;

  const normalizedPath = pathName.startsWith('/') ? pathName : `/${pathName}`;
  const loc = `${SITE_URL}${normalizedPath}`;

  if (!map.has(loc)) {
    map.set(loc, { loc, changefreq, priority, lastmod });
  }
};

const buildXml = (entries) => {
  const urls = entries
    .map(({ loc, changefreq, priority, lastmod }) => {
      const parts = [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : '',
        changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
        priority ? `    <priority>${priority}</priority>` : '',
        '  </url>',
      ].filter(Boolean);

      return parts.join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const run = async () => {
  const urls = new Map();

  // Static pages (canonical URLs only)
  for (const route of staticRoutes) {
    addUrl(urls, route.path, route);
  }

  // Dynamic brand pages
  const [carBrands, vanBrands] = await Promise.all([
    getBrandsForType('cars'),
    getBrandsForType('vans'),
  ]);

  if (!carBrands.length && !vanBrands.length) {
    console.warn('No dynamic brand slugs were fetched. Check SITEMAP_API_URL/VITE_API_URL and backend availability.');
  }

  for (const brand of carBrands) {
    const slug = slugify(brand?.name);
    if (!slug) continue;
    addUrl(urls, `/used/cars/${slug}`, { changefreq: 'daily', priority: '0.7' });
    addUrl(urls, `/showroom/${slug}`, { changefreq: 'daily', priority: '0.6' });
  }

  for (const brand of vanBrands) {
    const slug = slugify(brand?.name);
    if (!slug) continue;
    addUrl(urls, `/used/vans/${slug}`, { changefreq: 'daily', priority: '0.7' });
  }

  // Dynamic vehicle detail pages
  const vehicles = await getAllRecentVehicles();
  if (!vehicles.length) {
    console.warn('No dynamic vehicle slugs were fetched. Check API connectivity or vehicle availability.');
  }
  for (const vehicle of vehicles) {
    const id = vehicle?.id || vehicle?._id;
    const brandSlug = slugify(vehicle?.brand || 'vehicle');
    if (!id) continue;

    const lastmod = vehicle?.updatedAt ? new Date(vehicle.updatedAt).toISOString() : undefined;

    addUrl(urls, `/vehicle/${brandSlug}/${id}`, {
      changefreq: 'weekly',
      priority: '0.8',
      lastmod,
    });
  }

  const entries = Array.from(urls.values());
  const xml = buildXml(entries);
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, xml, 'utf8');
  await fs.writeFile(robotsPath, robots, 'utf8');

  console.log(`Generated sitemap with ${entries.length} URLs at ${outputPath}`);
  console.log(`Generated robots.txt at ${robotsPath}`);
};

run().catch((error) => {
  console.error('Failed to generate sitemap:', error);
  process.exit(1);
});
