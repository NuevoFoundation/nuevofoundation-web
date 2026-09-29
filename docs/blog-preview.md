# On-demand blog social metadata (local-first)

The React article URL remains `/blog/post/:id`. A small Node.js 22+ HTTP server
reads a public WordPress post **when that URL is requested**, adds metadata to the
CRA HTML head, and serves the same initial HTML to browsers and crawlers. It does
not redirect readers to WordPress or use user-agent detection. React still renders
the article body; this is metadata rendering, not full article SSR.

## Local validation

```powershell
npm run test-ci -- --runInBand BlogMetadataServer.test.js
npm run build
npm run preview
```

Open `http://127.0.0.1:3001/blog/post/1841`. Inspect **View Source**, not only the
JavaScript-updated DOM, or use:

```powershell
curl.exe -i http://127.0.0.1:3001/blog/post/1841
curl.exe -I http://127.0.0.1:3001/blog/post/not-an-id
```

`npm start` is unchanged: it runs CRA development mode and **does not inject social
metadata**. `npm run preview` runs the self-contained server from `build\runtime`.
The default TCP listener is loopback-only, port 3001. `PORT` can choose another
port. No background server is required by the regression tests: they use
short-lived loopback HTTP listeners with injected WordPress responses.

Metadata defaults to `https://www.nuevofoundation.org`, never the HTTP Host header.
Staging and production builds record their explicit `NF_SITE_URL` values from
`.env.staging` and `.env.production`. For local-only canonical links:

```powershell
$env:NF_SITE_URL = 'http://localhost:3001'
npm run preview
```

Remove that override with `Remove-Item Env:NF_SITE_URL` when finished. A production
process rejects loopback canonical origins. Build packaging always requires a
public HTTPS canonical origin; use the loopback override only while previewing.
`NF_SITE_URL` is server/public metadata configuration, not a secret or client
`REACT_APP_*` setting.

## What is packaged

The normal `npm run build` has a `postbuild` hook that copies the runtime into
`build\runtime`, including its declared `he` entity-decoder dependency and license.
The resulting server does **not** need root `node_modules`, repository source, an
on-server `npm install`, or environment files. CRA assets remain at their existing
root-relative URLs. Only the public canonical origin and public WordPress endpoint
are recorded in `runtime\config.json`.

The WordPress endpoint is restricted to the existing Nuevo Foundation public REST
API. No authentication tokens, cookies, or request headers are forwarded. The
selected fields are `ID,status,title,excerpt,featured_image,post_thumbnail`.

- Published articles: decoded/plain-text/escaped title and description; canonical,
  Open Graph article tags, site name, image, and Twitter large-image-card tags.
- Images: featured image, then thumbnail, then the existing packaged NF Nuvi raster
  `favicons\mstile-310x150.png`. Relative WordPress images resolve against the blog.
- Missing, invalid, private, or draft articles: HTTP 404 and `noindex, nofollow`.
- WordPress/network/malformed-response failures: HTTP 502; timeout: 504; capacity:
  503. These are not cached as successes, include noindex, and retain React's root
  so its article error UI can render. Server failures log an actionable reason.
- Successful metadata has a 60-second in-memory TTL, a 128-entry LRU bound, at most
  eight concurrent upstream requests, same-ID request deduplication, a four-second
  timeout, and a 256-KiB response limit. There is no stale-success fallback for
  failed refreshes. HTML uses `Cache-Control: no-store`; newly published articles
  do not need a frontend rebuild. Each Node worker maintains its own cache.
- GET and HEAD are supported. Missing assets are 404s, not SPA HTML. SPA fallbacks
  require document requests. `/api` is not proxied or rewritten into React. The
  server rejects traversal and blocks runtime, environment, source, test,
  dependency, configuration, and source-map files.

Static assets are indexed from the packaged build at startup, without following
symbolic links. Request URLs can only select an indexed asset, never construct a
filesystem path. Restart the Node process after replacing a deployed build;
publishing or editing WordPress articles still needs no restart or rebuild.

## Windows Azure App Service: explicit opt-in only

**Nothing here deploys or changes Azure settings. The default `public\web.config`
continues to use static IIS hosting**, with `runtime` hidden from HTTP access.
Deploying a normal build to that configuration alone does not enable on-demand
metadata. The pipeline currently copies only `build`; all needed runtime files
therefore live inside that artifact.

The reviewable candidate `server\iisnode.web.config` is also packaged as
`build\runtime\iisnode.web.config`. Only after local validation and an explicit
deployment decision, select it in a **local** artifact:

```powershell
npm run build:staging
npm run runtime:enable-staging
```

This verifies that the packaged canonical origin is the staging site before
copying the candidate over **only** `build\web.config`. It refuses a production
or other non-staging artifact. A subsequent normal build restores the static
configuration. The candidate rewrites non-API requests
to Node (including static assets, so Node's confinement checks apply), preserves
`/api`, and passes Node's error status/body through IIS. Runtime URLs themselves
are denied by the Node handler. Production IIS diagnostic output is disabled.

**Prerequisites still requiring a hosting-owner review and staging verification:**

1. Windows App Service must have working **iisnode** and IIS URL Rewrite modules.
2. The selected Node runtime/`WEBSITE_NODE_DEFAULT_VERSION` and iisnode process
   configuration must actually launch **Node.js 22+ with native fetch**. Neither
   installed modules nor the live Node setting has been verified by this change.
3. Configure `NODE_ENV=production`; verify the packaged or runtime `NF_SITE_URL`
   matches that site's public origin. An explicit `NF_SITE_URL` application
   setting overrides the packaged value. The runtime accepts iisnode's **string
   named-pipe `PORT`**, not just numeric local ports.
4. Verify outgoing HTTPS access to the public WordPress API, original article
   paths reaching Node, static assets, custom domains/TLS, error status/noindex,
   and unrelated `/api` behavior in staging before any production rollout.
5. The deployment/release pipeline must select the reviewed staging artifact.
   Existing build scripts intentionally do not silently switch the hosting runtime.

### Existing GitHub and Azure DevOps flow

GitHub continues to host the code and run its existing checks. The Azure DevOps
pipeline in `azure-pipelines.yml` continues to build and publish separate `stage`
and `production` artifacts for the existing release process; it does not deploy
directly from GitHub Actions.

The build pipeline has a boolean **`enableStagingBlogMetadata`** run parameter,
defaulting to **false**. Once the staging App Service prerequisites above have
been confirmed, queue the Azure DevOps pipeline with this parameter enabled.
It runs `npm run runtime:enable-staging` after the staging build and before
publishing the `stage` artifact. Existing master-branch artifact restrictions
remain in place.

The production build runs separately afterwards and restores the static
`web.config`. The staging parameter never selects the Node handler in the
`production` artifact. Existing release approvals stay in control. This change
does not activate production social metadata; that requires a separately
reviewed production runtime rollout after staging succeeds.

For the staging handoff, confirm the release uses the artifact from the build
where the parameter was enabled (not an older build). Open an article URL on
staging and inspect the original response for `og:image`, `og:title`, and a
staging canonical URL. Then use LinkedIn Post Inspector with that public staging
article URL. If IIS cannot launch Node, redeploy the previous known-good staging
artifact; do not promote that release to production.

Signing into the Azure Portal in a browser does not authenticate local Azure CLI
commands or expose Azure DevOps release settings to the repository. No Azure
account settings, resources, builds, releases, or approvals are changed by
packaging these files locally.

If that Windows hosting setup cannot run this server, an equivalent server/edge
integration that handles existing NF article URLs is required. A static CRA
deployment or client-side meta tags alone cannot supply fresh social previews.
Social platforms can independently cache cards; their re-scrape tools may be
needed after an update even though this server refreshes metadata within its TTL.
