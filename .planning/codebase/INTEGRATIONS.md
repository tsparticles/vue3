# External Integrations

**Analysis Date:** 2026-04-10

## APIs & External Services

**Particle Engine Ecosystem:**
- tsParticles ecosystem packages - Rendering engine and feature loaders for particle effects
  - SDK/Client: `@tsparticles/engine`, `tsparticles`, `@tsparticles/configs` in `components/vue3/package.json`, `apps/vue3/package.json`, `apps/nuxt3/package.json`
  - Auth: Not applicable (local library integration)

**Package Registry/Distribution:**
- npm registry - Package publication target for `@tsparticles/vue3`
  - SDK/Client: npm/pnpm/yarn CLI via scripts in `components/vue3/package.json`, root `package.json`
  - Auth: Not declared in repo files (credentials not stored in source)

## Data Storage

**Databases:**
- Not detected
  - Connection: Not applicable
  - Client: Not applicable

**File Storage:**
- Local filesystem only (source/config/build artifacts)
- Optional remote JSON input can be consumed by `vue-particles` via `url` prop in `components/vue3/src/components/vue-particles.vue` and usage docs in `README.md`

**Caching:**
- CI dependency cache via GitHub Actions cache steps in `.github/workflows/nodejs.yml` and `apps/nuxt3/.github/workflows/ci.yml`
- No application runtime cache service detected (Redis/Memcached not used directly in source)

## Authentication & Identity

**Auth Provider:**
- None
  - Implementation: Not applicable (no auth flows in `apps/` or `components/` source)

## Monitoring & Observability

**Error Tracking:**
- None detected (no Sentry/Bugsnag/Rollbar integration)

**Logs:**
- Console logging in demo callbacks (`apps/vue3/src/App.vue`, `apps/nuxt3/app.vue`)
- No centralized log pipeline detected

## CI/CD & Deployment

**Hosting:**
- Not explicitly configured for deployment platform in repo
- Library distribution is via package publishing metadata in `components/vue3/package.json` (`publishConfig.access: public`)

**CI Pipeline:**
- GitHub Actions workflows:
  - Workspace CI using pnpm + lerna build in `.github/workflows/nodejs.yml`
  - Nuxt app lint workflow using yarn in `apps/nuxt3/.github/workflows/ci.yml`

## Environment Configuration

**Required env vars:**
- Not detected (no `process.env`, `import.meta.env`, `runtimeConfig`, or `NUXT_`/`VITE_` usage in application/library source)

**Secrets location:**
- GitHub Actions secrets referenced in comments only (`NX_CLOUD_ACCESS_TOKEN`) in `.github/workflows/nodejs.yml`
- No committed secret files detected in scanned workspace paths

## Webhooks & Callbacks

**Incoming:**
- None detected (no webhook/server endpoint handlers)

**Outgoing:**
- Browser-side callback event emission from plugin init (`dispatchEvent("particlesInit")`) in `components/vue3/src/components/index.ts`
- Optional client HTTP retrieval of particle config when `url` prop is supplied to engine load in `components/vue3/src/components/vue-particles.vue`

---

*Integration audit: 2026-04-10*
