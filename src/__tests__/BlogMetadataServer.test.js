/** @jest-environment node */

const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {
  DEFAULT_SITE_URL, FALLBACK_IMAGE, canonicalOrigin, createPostLoader,
  createHandler, postMetadata, renderArticle, validPostId,
} = require('../../server/app');
const { listenTarget } = require('../../server/index');

const template = '<!doctype html><html><head><title>Old title</title>' +
  '<meta name="description" content="Old description"><meta property="og:title" content="Old social">' +
  '<link rel="canonical" href="https://old.invalid/"></head><body><div id="root"></div>' +
  '<script defer src="/static/js/main.123.js"></script></body></html>';
const article = (id = '1841', overrides = {}) => ({
  ID: Number(id), status: 'publish', title: '<b>Nuevo &amp; students &#x1F680;</b>',
  excerpt: '<p>Learning &ldquo;together&rdquo; &amp; building.</p>',
  featured_image: 'https://nuevofoundationblog.wordpress.com/uploads/students.jpg',
  ...overrides,
});
const response = (post, status = 200) => ({
  ok: status >= 200 && status < 300, status, text: async () => JSON.stringify(post),
});

describe('Blog metadata extraction and cache', () => {
  it('decodes WordPress markup/entities and escapes every HTML context, including replacement tokens', () => {
    const metadata = postMetadata(article('1841', {
      title: '<b>A &amp; B</b> &quot;&gt;&lt;img src=x onerror=alert(1)&gt; $& $`',
      excerpt: '<script>evil()</script><p>&quot; onmouseover=&quot;bad &amp; text</p>',
      featured_image: 'https://images.example/a.jpg?x="><script>bad()</script>&y=1',
    }), '1841', DEFAULT_SITE_URL);
    const html = renderArticle(template, metadata);
    expect(metadata.title).toBe('A & B "><img src=x onerror=alert(1)> $& $`');
    expect(html).toContain('A &amp; B &quot;&gt;&lt;img src=x onerror=alert(1)&gt; $&amp; $`');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('<script>bad()');
    expect(html).not.toContain('evil()');
    expect(html).toContain('content="&quot; onmouseover=&quot;bad &amp; text"');
    expect(html.match(/<!doctype/g)).toHaveLength(1);
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html.match(/property="og:title"/g)).toHaveLength(1);
    expect(html.match(/rel="canonical"/g)).toHaveLength(1);
    expect(html).not.toContain('old.invalid');
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
  });

  it('uses featured image, thumbnail, then the existing packaged NF raster in order', () => {
    expect(postMetadata(article(), '1841', DEFAULT_SITE_URL).image).toContain('/uploads/students.jpg');
    expect(postMetadata(article('1841', {
      featured_image: 'javascript:alert(1)', post_thumbnail: { URL: '//images.example/thumb.png?a=1&amp;b=2' },
    }), '1841', DEFAULT_SITE_URL).image).toBe('https://images.example/thumb.png?a=1&b=2');
    expect(postMetadata(article('1841', {
      featured_image: '', post_thumbnail: { URL: 'data:image/png;base64,a' },
    }), '1841', DEFAULT_SITE_URL).image).toBe(`${DEFAULT_SITE_URL}${FALLBACK_IMAGE}`);
    const raster = fs.readFileSync(path.join(__dirname, '..', '..', 'public', FALLBACK_IMAGE));
    expect(raster.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(raster.readUInt32BE(16)).toBeGreaterThanOrEqual(300);
    expect(raster.readUInt32BE(20)).toBeGreaterThanOrEqual(157);
  });

  it('resolves relative image URLs against WordPress, not the NF article route', () => {
    expect(postMetadata(article('1841', { featured_image: '/uploads/a.jpg' }), '1841', DEFAULT_SITE_URL).image)
      .toBe('https://nuevofoundationblog.wordpress.com/uploads/a.jpg');
  });

  it.each(['0', '-1', '001', 'abc', '1e3', '1/2', '9007199254740992', ''])('rejects invalid ID %p', async id => {
    const fetchImpl = jest.fn();
    expect(validPostId(id)).toBe(false);
    await expect(createPostLoader({ fetchImpl }).load(id)).rejects.toMatchObject({ status: 404 });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it.each(['draft', 'private', 'pending', 'trash'])('never exposes %s posts', async status => {
    const fetchImpl = jest.fn().mockResolvedValue(response(article('1841', { status })));
    const posts = createPostLoader({ fetchImpl });
    await expect(posts.load('1841')).rejects.toMatchObject({ status: 404 });
    expect(posts.cacheSize()).toBe(0);
  });

  it('rejects incomplete or mismatched WordPress responses instead of creating success metadata', async () => {
    const fetchImpl = jest.fn()
      .mockResolvedValueOnce(response(article('22')))
      .mockResolvedValueOnce(response(article('1841', { status: undefined })))
      .mockResolvedValueOnce(response(article('1841', { title: '' })));
    const posts = createPostLoader({ fetchImpl });
    for (let i = 0; i < 3; i++) await expect(posts.load('1841')).rejects.toMatchObject({ status: 502 });
    expect(posts.cacheSize()).toBe(0);
  });

  it('fetches only public fields, deduplicates requests, and refreshes after the TTL without a rebuild', async () => {
    let time = 1000;
    const fetchImpl = jest.fn()
      .mockResolvedValueOnce(response(article()))
      .mockResolvedValueOnce(response(article('1841', { title: 'Fresh WordPress title' })));
    const posts = createPostLoader({ fetchImpl, now: () => time, ttlMs: 100 });
    const [first, duplicate] = await Promise.all([posts.load('1841'), posts.load('1841')]);
    expect(first).toEqual(duplicate);
    expect(first.title).toBe('Nuevo & students 🚀');
    await posts.load('1841');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, options] = fetchImpl.mock.calls[0];
    expect(new URL(url).searchParams.get('fields')).toBe('ID,status,title,excerpt,featured_image,post_thumbnail');
    expect(options.headers).toEqual({ Accept: 'application/json' });
    expect(options.redirect).toBe('error');
    time += 101;
    expect((await posts.load('1841')).title).toBe('Fresh WordPress title');
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('bounds cache entries with least-recently-used eviction', async () => {
    const fetchImpl = jest.fn(async url => response(article(new URL(url).pathname.split('/').pop())));
    const posts = createPostLoader({ fetchImpl, maxEntries: 2 });
    await posts.load('1');
    await posts.load('2');
    await posts.load('1');
    await posts.load('3');
    expect(posts.cacheSize()).toBe(2);
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    await posts.load('2');
    expect(fetchImpl).toHaveBeenCalledTimes(4);
    expect(posts.cacheSize()).toBe(2);
  });

  it('bounds in-flight WordPress calls while allowing same-article deduplication', async () => {
    let release;
    const fetchImpl = jest.fn(() => new Promise(resolve => { release = resolve; }));
    const posts = createPostLoader({ fetchImpl, maxConcurrent: 1 });
    const first = posts.load('1841');
    const duplicate = posts.load('1841');
    await expect(posts.load('2')).rejects.toMatchObject({ status: 503 });
    expect(posts.pendingSize()).toBe(1);
    release(response(article()));
    await Promise.all([first, duplicate]);
    expect(posts.pendingSize()).toBe(0);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('does not cache failed requests, so the next request can recover', async () => {
    const fetchImpl = jest.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(response(article()));
    const posts = createPostLoader({ fetchImpl });
    await expect(posts.load('1841')).rejects.toMatchObject({ status: 502 });
    expect(posts.cacheSize()).toBe(0);
    await expect(posts.load('1841')).resolves.toHaveProperty('title');
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('does not fall back to expired success metadata when a refresh fails', async () => {
    let time = 1000;
    const fetchImpl = jest.fn().mockResolvedValueOnce(response(article())).mockRejectedValueOnce(new Error('offline'));
    const posts = createPostLoader({ fetchImpl, now: () => time, ttlMs: 100 });
    await posts.load('1841');
    time += 101;
    await expect(posts.load('1841')).rejects.toMatchObject({ status: 502 });
    expect(posts.cacheSize()).toBe(0);
  });

  it('aborts slow upstream calls and reports a timeout rather than empty success HTML', async () => {
    const fetchImpl = jest.fn(() => new Promise(() => {}));
    const posts = createPostLoader({ fetchImpl, timeoutMs: 20 });
    await expect(posts.load('1841')).rejects.toMatchObject({ status: 504 });
    expect(fetchImpl.mock.calls[0][1].signal.aborted).toBe(true);
    expect(posts.pendingSize()).toBe(0);
    expect(posts.cacheSize()).toBe(0);
  });

  it('rejects invalid JSON and oversized upstream bodies', async () => {
    const fetchImpl = jest.fn()
      .mockResolvedValueOnce({ ok: true, status: 200, text: async () => '{broken' })
      .mockResolvedValueOnce({ ok: true, status: 200, text: async () => 'x'.repeat(300000) });
    const posts = createPostLoader({ fetchImpl });
    await expect(posts.load('1841')).rejects.toMatchObject({ status: 502 });
    await expect(posts.load('1841')).rejects.toMatchObject({ status: 502 });
  });

  it('reads native-fetch-style streamed response bodies and enforces their size limit', async () => {
    async function* body(value) {
      yield Buffer.from(value);
    }
    const fetchImpl = jest.fn()
      .mockResolvedValueOnce({ ok: true, status: 200, body: body(JSON.stringify(article())) })
      .mockResolvedValueOnce({ ok: true, status: 200, body: body('x'.repeat(300000)) });
    const posts = createPostLoader({ fetchImpl });
    await expect(posts.load('1841')).resolves.toHaveProperty('title', 'Nuevo & students 🚀');
    await expect(posts.load('2')).rejects.toMatchObject({ status: 502 });
  });
});

describe('Blog metadata server HTTP responses', () => {
  const fixture = path.join(__dirname, `.blog-server-fixture-${process.pid}`);
  const servers = [];
  const logger = { warn: jest.fn(), error: jest.fn() };
  let fetchImpl;

  beforeAll(() => {
    fs.mkdirSync(path.join(fixture, 'static', 'js'), { recursive: true });
    fs.mkdirSync(path.join(fixture, 'runtime'), { recursive: true });
    fs.writeFileSync(path.join(fixture, 'index.html'), template);
    fs.writeFileSync(path.join(fixture, 'static', 'js', 'main.123.js'), 'console.log("built");');
    fs.writeFileSync(path.join(fixture, 'runtime', 'config.json'), '{"not":"public"}');
    fs.writeFileSync(path.join(fixture, '.env'), 'NOT_PUBLIC=true');
    fs.writeFileSync(path.join(fixture, 'static', 'js', 'main.123.js.map'), '{"sourcesContent":["secret"]}');
  });
  beforeEach(() => {
    fetchImpl = jest.fn().mockResolvedValue(response(article()));
    logger.warn.mockClear();
    logger.error.mockClear();
  });
  afterEach(async () => {
    await Promise.all(servers.splice(0).map(server => new Promise((resolve, reject) => {
      server.close(error => error ? reject(error) : resolve());
      server.closeAllConnections();
    })));
  });
  afterAll(() => fs.rmSync(fixture, { recursive: true, force: true }));

  async function serve(options = {}) {
    const server = http.createServer(createHandler({ buildDir: fixture, fetchImpl, logger, ...options }));
    servers.push(server);
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    return (requestPath, requestOptions = {}) => new Promise((resolve, reject) => {
      const request = http.request({
        hostname: '127.0.0.1', port: server.address().port, path: requestPath, ...requestOptions,
      }, result => {
        const chunks = [];
        result.on('data', chunk => chunks.push(chunk));
        result.on('end', () => resolve({
          status: result.statusCode, headers: result.headers, body: Buffer.concat(chunks).toString('utf8'),
        }));
      });
      request.on('error', reject);
      request.end();
    });
  }

  it('serves complete initial metadata before JavaScript, identically for humans and crawlers', async () => {
    const request = await serve();
    const human = await request('/blog/post/1841?tracking=1', { headers: { Host: 'attacker.invalid', 'User-Agent': 'Browser' } });
    const crawler = await request('/blog/post/1841', { headers: { 'User-Agent': 'facebookexternalhit/1.1' } });
    expect(human.status).toBe(200);
    expect(human.body).toBe(crawler.body);
    expect(human.body).toContain('<meta property="og:type" content="article">');
    expect(human.body).toContain('<meta property="og:site_name" content="Nuevo Foundation">');
    expect(human.body).toContain('<meta property="og:description" content="Learning “together” &amp; building.">');
    expect(human.body).toContain('href="https://www.nuevofoundation.org/blog/post/1841"');
    expect(human.body).toContain('property="og:url" content="https://www.nuevofoundation.org/blog/post/1841"');
    expect(human.body).not.toContain('attacker.invalid');
    expect(human.body).not.toContain('tracking=1');
    expect(human.body).toContain('src="/static/js/main.123.js"');
    expect(human.headers['cache-control']).toBe('no-store');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it.each([
    [404, 404], [403, 404], [429, 502], [500, 502],
  ])('returns upstream HTTP %i as %i with noindex and no misleading social metadata', async (upstream, expected) => {
    fetchImpl.mockResolvedValue(response({}, upstream));
    const request = await serve();
    const result = await request('/blog/post/1841');
    expect(result.status).toBe(expected);
    expect(result.headers['x-robots-tag']).toBe('noindex, nofollow');
    expect(result.body).toContain('name="robots" content="noindex, nofollow"');
    expect(result.body).not.toContain('property="og:');
    expect(result.body).not.toContain('rel="canonical"');
    expect(result.body).toContain('<div id="root"></div>');
  });

  it('returns 404/noindex for draft and invalid IDs without caching either', async () => {
    fetchImpl.mockResolvedValue(response(article('1841', { status: 'draft' })));
    const request = await serve();
    const invalid = await request('/blog/post/not-a-number');
    expect(invalid.status).toBe(404);
    expect(invalid.headers['x-robots-tag']).toContain('noindex');
    expect(fetchImpl).not.toHaveBeenCalled();
    expect((await request('/blog/post/1841')).status).toBe(404);
  });

  it('returns 504/noindex for an unavailable upstream and logs the actionable failure', async () => {
    fetchImpl.mockImplementation(() => new Promise(() => {}));
    const request = await serve({ timeoutMs: 20 });
    const result = await request('/blog/post/1841');
    expect(result.status).toBe(504);
    expect(result.headers['x-robots-tag']).toContain('noindex');
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('timed out'));
  });

  it('serves HEAD metadata and static headers without a response body, and rejects unsupported methods', async () => {
    const request = await serve();
    const head = await request('/blog/post/1841', { method: 'HEAD' });
    expect(head.status).toBe(200);
    expect(head.body).toBe('');
    expect(Number(head.headers['content-length'])).toBeGreaterThan(0);
    const asset = await request('/static/js/main.123.js', { method: 'HEAD' });
    expect(asset.status).toBe(200);
    expect(asset.body).toBe('');
    expect(asset.headers['content-type']).toContain('javascript');
    const post = await request('/blog/post/1841', { method: 'POST' });
    expect(post.status).toBe(405);
    expect(post.headers.allow).toBe('GET, HEAD');
  });

  it('limits SPA fallbacks to document routes, preserving missing asset and API failures', async () => {
    const request = await serve();
    expect((await request('/about', { headers: { Accept: 'text/html' } })).status).toBe(200);
    expect((await request('/about', { headers: { Accept: 'application/json' } })).status).toBe(404);
    for (const requestPath of ['/static/js/missing.js', '/missing.png', '/api', '/api/member']) {
      const result = await request(requestPath, { headers: { Accept: 'text/html' } });
      expect(result.status).toBe(404);
      expect(result.headers['content-type']).not.toContain('text/html');
    }
    expect((await request('/static/js/main.123.js')).body).toBe('console.log("built");');
  });

  it('uses the native root path so Windows drive aliases do not reject public assets', async () => {
    const alias = path.join(fixture, 'drive-alias');
    const resolveNative = fs.realpathSync.native;
    const native = jest.spyOn(fs.realpathSync, 'native').mockImplementation(filename =>
      filename === alias ? fixture : resolveNative(filename));
    try {
      const request = await serve({ buildDir: alias });
      const result = await request('/static/js/main.123.js');
      expect(native).toHaveBeenCalledWith(alias);
      expect(result.status).toBe(200);
      expect(result.body).toBe('console.log("built");');
    } finally {
      native.mockRestore();
    }
  });

  it.each([
    '/runtime/config.json', '/RUNTIME/app.js', '/.env', '/package.json', '/web.config',
    '/src/test.tsx', '/static/js/main.123.js.map', '/node_modules/he/he.js',
    '/%2e%2e/package.json', '/%2eenv', '/runtime%5cconfig.json', '/%252e%252e/package.json',
    '/static/js/main.123.js:secret', '/bad%zz',
  ])('never serves protected or malformed path %s', async requestPath => {
    const request = await serve();
    const result = await request(requestPath, { headers: { Accept: 'text/html' } });
    expect(result.status).toBeGreaterThanOrEqual(400);
    expect(result.body).not.toContain('NOT_PUBLIC');
    expect(result.body).not.toContain('"not":"public"');
  });

  it('only serves assets indexed at startup, not paths supplied by later requests', async () => {
    const request = await serve();
    const unlisted = path.join(fixture, 'unlisted.json');
    fs.writeFileSync(unlisted, '{"not":"part of the deployed assets"}');
    try {
      const result = await request('/unlisted.json');
      expect(result.status).toBe(404);
      expect(result.body).not.toContain('part of the deployed assets');
    } finally {
      fs.unlinkSync(unlisted);
    }
  });

  it('matches decoded public asset URLs without using query strings as filesystem paths', async () => {
    const request = await serve();
    const result = await request('/static/js/%6Dain.123.js?cache=1');
    expect(result.status).toBe(200);
    expect(result.body).toBe('console.log("built");');
  });

  it('uses configured staging and local canonical origins instead of request headers', async () => {
    const staging = await serve({ siteUrl: 'https://nuevofoundation-web-staging.azurewebsites.net' });
    expect((await staging('/blog/post/1841')).body)
      .toContain('href="https://nuevofoundation-web-staging.azurewebsites.net/blog/post/1841"');
    const local = await serve({ siteUrl: 'http://localhost:3001' });
    expect((await local('/blog/post/1841')).body).toContain('href="http://localhost:3001/blog/post/1841"');
  });

  it('does not follow directory links into protected runtime files or outside the build', async () => {
    fs.symlinkSync(path.join(fixture, 'runtime'), path.join(fixture, 'linked-runtime'), 'junction');
    fs.symlinkSync(path.join(__dirname, '..', '..', 'server'), path.join(fixture, 'linked-outside'), 'junction');
    const request = await serve();
    expect((await request('/linked-runtime/config.json')).status).toBe(404);
    expect((await request('/linked-outside/app.js')).status).toBe(404);
  });
});

describe('Runtime configuration', () => {
  it('rejects unsafe canonical origins and localhost production metadata', () => {
    expect(canonicalOrigin()).toBe(DEFAULT_SITE_URL);
    for (const value of ['http://public.example', 'https://user:pass@public.example', 'https://public.example/path',
      'https://public.example?x=1', 'javascript:alert(1)']) {
      expect(() => canonicalOrigin(value)).toThrow();
    }
    expect(() => canonicalOrigin('http://localhost:3001', true)).toThrow();
    expect(() => canonicalOrigin('https://127.0.0.1', true)).toThrow();
  });

  it('supports both local TCP ports and iisnode named pipes without coercing pipes into numbers', () => {
    expect(listenTarget()).toBe(3001);
    expect(listenTarget('8080')).toBe(8080);
    expect(listenTarget('\\\\.\\pipe\\iisnode-example')).toBe('\\\\.\\pipe\\iisnode-example');
    expect(() => listenTarget('bad-port')).toThrow();
    expect(() => listenTarget('65536')).toThrow();
  });
});
