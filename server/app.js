'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { pipeline } = require('node:stream/promises');
const { decode } = require('he');

const DEFAULT_SITE_URL = 'https://www.nuevofoundation.org';
const WORDPRESS_ENDPOINT = 'https://public-api.wordpress.com/rest/v1.1/sites/nuevofoundationblog.wordpress.com';
const WORDPRESS_SITE = 'https://nuevofoundationblog.wordpress.com';
const FALLBACK_IMAGE = '/favicons/mstile-310x150.png';
const POST_FIELDS = 'ID,status,title,excerpt,featured_image,post_thumbnail,date,modified';
const MAX_RESPONSE_BYTES = 256 * 1024;
const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function canonicalOrigin(value = DEFAULT_SITE_URL, production = false) {
  const url = new URL(value);
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (url.username || url.password || url.pathname !== '/' || url.search || url.hash ||
      (url.protocol !== 'https:' && !(url.protocol === 'http:' && loopback && !production)) ||
      (production && loopback)) {
    throw new Error('NF_SITE_URL must be an HTTPS site origin (HTTP loopback is allowed only for local preview).');
  }
  return url.origin;
}

function wordpressEndpoint(value = WORDPRESS_ENDPOINT) {
  if (value.replace(/\/$/, '') !== WORDPRESS_ENDPOINT) {
    throw new Error('NF_WORDPRESS_ENDPOINT must be the public Nuevo Foundation WordPress REST endpoint.');
  }
  return WORDPRESS_ENDPOINT;
}

function validPostId(value) {
  return typeof value === 'string' && /^[1-9]\d{0,15}$/.test(value) && Number.isSafeInteger(Number(value));
}

function plainText(value, limit) {
  if (typeof value !== 'string') return '';
  // This is text extraction, not an HTML sanitizer; every result is escaped at output.
  const text = decode(value.replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  return Array.from(text).slice(0, limit).join('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[character]));
}

function imageUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(decode(value.trim()), WORDPRESS_SITE);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
    url.hash = '';
    return url.href;
  } catch {
    return null;
  }
}

function sameImageFile(a, b) {
  try {
    return new URL(a).pathname === new URL(b).pathname;
  } catch {
    return false;
  }
}

function imageDimensions(thumbnail, image) {
  if (!thumbnail || typeof thumbnail !== 'object') return {};
  const thumbUrl = imageUrl(thumbnail.URL);
  if (!thumbUrl || !sameImageFile(thumbUrl, image)) return {};
  const width = Math.round(Number(thumbnail.width));
  const height = Math.round(Number(thumbnail.height));
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) return {};
  const dimensions = { imageWidth: String(width), imageHeight: String(height) };
  if (typeof thumbnail.mime_type === 'string' && /^image\/[a-z0-9.+-]+$/i.test(thumbnail.mime_type)) {
    dimensions.imageType = thumbnail.mime_type;
  }
  return dimensions;
}

function articleDate(value) {
  if (typeof value !== 'string') return null;
  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  // Anchor to noon UTC of the WordPress publication day so social crawlers render the
  // same calendar date the site shows (WordpressContentHelper.formatPublicationDate
  // formats date.slice(0, 10) in UTC). Noon avoids a day-earlier shift for west-of-UTC readers.
  const iso = `${match[1]}-${match[2]}-${match[3]}T12:00:00.000Z`;
  return Number.isFinite(Date.parse(iso)) ? iso : null;
}

function postMetadata(post, id, siteUrl) {
  if (!post || typeof post !== 'object' || String(post.ID) !== id || typeof post.status !== 'string') {
    throw new HttpError(502, 'WordPress returned an invalid post response.');
  }
  if (post.status !== 'publish') throw new HttpError(404, 'Article not found.');
  const title = plainText(post.title, 200);
  if (!title) throw new HttpError(502, 'WordPress returned an article without a title.');
  const image = imageUrl(post.featured_image) || imageUrl(post.post_thumbnail && post.post_thumbnail.URL) ||
    new URL(FALLBACK_IMAGE, siteUrl).href;
  const metadata = {
    title,
    description: plainText(post.excerpt, 240) || 'Read this article from Nuevo Foundation.',
    image,
    ...imageDimensions(post.post_thumbnail, image),
    canonical: `${siteUrl}/blog/post/${id}`,
  };
  const published = articleDate(post.date);
  if (published) metadata.published = published;
  const modified = articleDate(post.modified);
  if (modified) metadata.modified = modified;
  return metadata;
}

function cleanTemplate(template) {
  return template.replace(/<title\b[^>]*>[\s\S]*?<\/title\s*>/gi, '')
    .replace(/<meta\b[^>]*>/gi, tag =>
      /\b(?:name|property)\s*=\s*["'](?:description|robots|author|og:[^"']*|twitter:[^"']*|article:[^"']*)["']/i.test(tag) ? '' : tag)
    .replace(/<link\b[^>]*>/gi, tag => /\brel\s*=\s*["']canonical["']/i.test(tag) ? '' : tag);
}

function renderArticle(template, metadata) {
  const secure = /^https:/i.test(metadata.image || '');
  const { title, description, image, canonical, imageWidth, imageHeight, imageType, published, modified } = Object.fromEntries(
    Object.entries(metadata).map(([key, value]) => [key, escapeHtml(value)]));
  const tags = [
    `<title>${title} | Nuevo Foundation</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:image" content="${image}">`,
    secure ? `<meta property="og:image:secure_url" content="${image}">` : null,
    imageType ? `<meta property="og:image:type" content="${imageType}">` : null,
    imageWidth ? `<meta property="og:image:width" content="${imageWidth}">` : null,
    imageHeight ? `<meta property="og:image:height" content="${imageHeight}">` : null,
    `<meta property="og:image:alt" content="${title}">`,
    '<meta property="og:type" content="article">',
    '<meta property="article:author" content="Nuevo Foundation">',
    published ? `<meta property="article:published_time" content="${published}">` : null,
    modified ? `<meta property="article:modified_time" content="${modified}">` : null,
    '<meta name="author" content="Nuevo Foundation">',
    `<meta property="og:url" content="${canonical}">`,
    '<meta property="og:site_name" content="Nuevo Foundation">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<meta name="twitter:image:alt" content="${title}">`,
    `<meta name="twitter:url" content="${canonical}">`,
  ].filter(Boolean).join('\n');
  return cleanTemplate(template).replace(/<\/head\s*>/i, () => `${tags}\n</head>`);
}

function renderError(template, status) {
  const title = status === 404 ? 'Article not found' : 'Article temporarily unavailable';
  return cleanTemplate(template).replace(/<\/head\s*>/i,
    `<title>${title} | Nuevo Foundation</title>\n<meta name="robots" content="noindex, nofollow">\n</head>`);
}

async function readPostResponse(response) {
  if (Number(response.headers && response.headers.get('content-length')) > MAX_RESPONSE_BYTES) {
    throw new HttpError(502, 'WordPress metadata exceeded the response size limit.');
  }
  let text;
  if (response.body) {
    const chunks = [];
    let size = 0;
    for await (const chunk of response.body) {
      size += chunk.length;
      if (size > MAX_RESPONSE_BYTES) throw new HttpError(502, 'WordPress metadata exceeded the response size limit.');
      chunks.push(Buffer.from(chunk));
    }
    text = Buffer.concat(chunks).toString('utf8');
  } else {
    text = await response.text();
    if (Buffer.byteLength(text) > MAX_RESPONSE_BYTES) {
      throw new HttpError(502, 'WordPress metadata exceeded the response size limit.');
    }
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(502, 'WordPress returned invalid JSON.');
  }
}

function createPostLoader({
  fetchImpl = globalThis.fetch, siteUrl = DEFAULT_SITE_URL, endpoint = WORDPRESS_ENDPOINT,
  ttlMs = 60000, maxEntries = 128, maxConcurrent = 8, timeoutMs = 4000, now = Date.now,
} = {}) {
  if (typeof fetchImpl !== 'function') throw new Error('The metadata server requires Node.js 22 or newer with built-in fetch.');
  if (![ttlMs, maxEntries, maxConcurrent, timeoutMs].every(value => Number.isInteger(value) && value > 0)) {
    throw new Error('Cache and request limits must be positive integers.');
  }
  endpoint = wordpressEndpoint(endpoint);
  siteUrl = canonicalOrigin(siteUrl);
  const cache = new Map();
  const pending = new Map();

  async function fetchPost(id) {
    const controller = new AbortController();
    let timer;
    try {
      const timeout = new Promise((resolve, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new HttpError(504, 'WordPress metadata request timed out.'));
        }, timeoutMs);
      });
      const request = (async () => {
        const url = new URL(`${endpoint}/posts/${id}`);
        url.searchParams.set('fields', POST_FIELDS);
        const response = await fetchImpl(url.href, {
          signal: controller.signal, redirect: 'error', headers: { Accept: 'application/json' },
        });
        if (response.status === 404 || response.status === 403) throw new HttpError(404, 'Article not found.');
        if (!response.ok) throw new HttpError(502, `WordPress returned HTTP ${response.status}.`);
        return postMetadata(await readPostResponse(response), id, siteUrl);
      })();
      return await Promise.race([request, timeout]);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      if (controller.signal.aborted) throw new HttpError(504, 'WordPress metadata request timed out.');
      throw new HttpError(502, 'Unable to fetch public WordPress metadata.');
    } finally {
      clearTimeout(timer);
      controller.abort();
    }
  }

  async function load(id) {
    if (!validPostId(id)) throw new HttpError(404, 'Article not found.');
    const cached = cache.get(id);
    if (cached && cached.expiresAt > now()) {
      cache.delete(id);
      cache.set(id, cached);
      return cached.metadata;
    }
    cache.delete(id);
    if (pending.has(id)) return pending.get(id);
    if (pending.size >= maxConcurrent) throw new HttpError(503, 'WordPress metadata request capacity reached; retry shortly.');
    const request = fetchPost(id).then(metadata => {
      for (const [key, entry] of cache) {
        if (entry.expiresAt <= now()) cache.delete(key);
      }
      while (cache.size >= maxEntries) cache.delete(cache.keys().next().value);
      cache.set(id, { metadata, expiresAt: now() + ttlMs });
      return metadata;
    }).finally(() => pending.delete(id));
    pending.set(id, request);
    return request;
  }
  return { load, cacheSize: () => cache.size, pendingSize: () => pending.size };
}

function forbiddenPath(pathname) {
  return pathname.split(/[\\/]/).some(part =>
    part.startsWith('.') || ['runtime', 'server', 'src', 'node_modules', '__tests__'].includes(part.toLowerCase())) ||
    /(?:^|\/)(?:package(?:-lock)?\.json|web\.config)$/i.test(pathname);
}

function insideRoot(root, target) {
  const relative = path.relative(root, target);
  return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function indexStaticFiles(root) {
  const files = new Map();
  function visit(directory, prefix = '') {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const pathname = `${prefix}/${entry.name}`;
      if (forbiddenPath(pathname)) continue;
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(filename, pathname);
      else if (entry.isFile() && CONTENT_TYPES[path.extname(filename).toLowerCase()]) {
        files.set(pathname, filename);
      }
    }
  }
  visit(root);
  return files;
}

function createHandler({
  buildDir, template, siteUrl = DEFAULT_SITE_URL, endpoint = WORDPRESS_ENDPOINT,
  fetchImpl = globalThis.fetch, logger = console, ...loaderOptions
}) {
  // Match the native resolver used below; Azure's C: and D: paths can alias.
  const root = fs.realpathSync.native(buildDir);
  template = template || fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  if (!/<\/head\s*>/i.test(template)) throw new Error('The CRA index.html template is missing its closing head tag.');
  siteUrl = canonicalOrigin(siteUrl, process.env.NODE_ENV === 'production');
  const posts = createPostLoader({ ...loaderOptions, fetchImpl, siteUrl, endpoint });
  // Request URLs select packaged assets; they never construct filesystem paths.
  const staticFiles = indexStaticFiles(root);

  function send(req, res, status, content, contentType = 'text/html; charset=utf-8') {
    res.writeHead(status, {
      'Content-Type': contentType,
      'Content-Length': Buffer.byteLength(content),
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...(status >= 400 ? { 'X-Robots-Tag': 'noindex, nofollow' } : {}),
    });
    res.end(req.method === 'HEAD' ? undefined : content);
  }

  return async (req, res) => {
    try {
      if (!['GET', 'HEAD'].includes(req.method)) {
        res.setHeader('Allow', 'GET, HEAD');
        return send(req, res, 405, 'Method not allowed.', 'text/plain; charset=utf-8');
      }
      let pathname;
      try {
        if (!req.url.startsWith('/') || req.url.startsWith('//')) throw new Error('Invalid request path.');
        pathname = decodeURIComponent(req.url.split(/[?#]/, 1)[0]);
        if (/[\\:%\u0000-\u001f\u007f]/.test(pathname) ||
            pathname.split('/').some(part => part === '.' || part === '..')) throw new Error('Invalid request path.');
      } catch {
        return send(req, res, 400, 'Invalid request path.', 'text/plain; charset=utf-8');
      }
      if (forbiddenPath(pathname) || /^\/api(?:\/|$)/i.test(pathname)) {
        return send(req, res, 404, 'Not found.', 'text/plain; charset=utf-8');
      }
      if (/^\/blog\/post(?:\/|$)/.test(pathname)) {
        const match = /^\/blog\/post\/([^/]+)\/?$/.exec(pathname);
        try {
          const metadata = await posts.load(match ? match[1] : '');
          return send(req, res, 200, renderArticle(template, metadata));
        } catch (error) {
          if (!(error instanceof HttpError)) throw error;
          if (error.status >= 500) {
            logger.warn(`Blog metadata ${error.status} for post ${match ? match[1] : '(invalid)'}: ${error.message}`);
            res.setHeader('Retry-After', '5');
          }
          return send(req, res, error.status, renderError(template, error.status));
        }
      }
      if (pathname === '/' || pathname === '/index.html') return send(req, res, 200, template);
      const filename = staticFiles.get(pathname);
      if (filename) {
        const contentType = CONTENT_TYPES[path.extname(filename).toLowerCase()];
        let real;
        let stat;
        try {
          real = await fs.promises.realpath(filename);
          stat = await fs.promises.stat(real);
        } catch (error) {
          if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error;
        }
        if (stat && stat.isFile() && insideRoot(root, real) && !forbiddenPath(path.relative(root, real))) {
          res.writeHead(200, {
            'Content-Type': contentType, 'Content-Length': stat.size,
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': /^\/static\//.test(pathname) ? 'public, max-age=31536000, immutable' : 'public, max-age=3600',
          });
          if (req.method === 'HEAD') return res.end();
          await pipeline(fs.createReadStream(real), res);
          return;
        }
      }
      const documentRequest = /(?:text\/html|application\/xhtml\+xml)/i.test(req.headers.accept || '') ||
        req.headers['sec-fetch-dest'] === 'document';
      if (!path.extname(pathname) && !pathname.startsWith('/static/') && documentRequest) {
        return send(req, res, 200, template);
      }
      return send(req, res, 404, 'Not found.', 'text/plain; charset=utf-8');
    } catch (error) {
      logger.error('Preview server request failed:', error);
      if (!res.headersSent) send(req, res, 500, 'The website is temporarily unavailable.', 'text/plain; charset=utf-8');
      else res.destroy();
    }
  };
}

module.exports = {
  DEFAULT_SITE_URL, WORDPRESS_ENDPOINT, FALLBACK_IMAGE, HttpError,
  canonicalOrigin, validPostId, plainText, postMetadata, renderArticle, renderError,
  createPostLoader, createHandler, wordpressEndpoint,
};
