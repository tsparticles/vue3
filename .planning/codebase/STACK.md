# Technology Stack

**Analysis Date:** 2026-04-10

## Languages

**Primary:**
- TypeScript 5.x - Library and demo app source in `components/vue3/src/components/index.ts`, `components/vue3/src/components/vue-particles.vue`, `apps/vue3/src/main.ts`, `apps/nuxt3/plugins/vue3-particles.client.ts`
- Vue Single-File Components (`.vue`) - UI/component and demo integration in `components/vue3/src/components/vue-particles.vue`, `apps/vue3/src/App.vue`, `apps/nuxt3/app.vue`

**Secondary:**
- JavaScript (Node/CommonJS + config scripts) - Tooling/config in `apps/nuxt3/.eslintrc.js`, `apps/vue3/.eslintrc.cjs`, `components/vue3/.eslintrc.cjs`
- YAML - Workspace and CI configuration in `pnpm-workspace.yaml`, `.github/workflows/nodejs.yml`, `apps/nuxt3/.github/workflows/ci.yml`

## Runtime

**Environment:**
- Node.js (version not pinned in repo-level version file; CI uses Node 16 in `.github/workflows/nodejs.yml` and Node 14 in `apps/nuxt3/.github/workflows/ci.yml`)

**Package Manager:**
- pnpm `10.33.0` declared in `package.json` (`packageManager` field)
- Lockfile: present (`pnpm-lock.yaml`)
- Additional package manager usage: Yarn in Nuxt app scripts and CI (`apps/nuxt3/package.json`, `apps/nuxt3/.github/workflows/ci.yml`)

## Frameworks

**Core:**
- Vue 3 (`^3.3.13`) - Component runtime and app framework in `components/vue3/package.json`, `apps/vue3/package.json`, `apps/nuxt3/package.json`
- Nuxt 3 (`^3.8.2`) - SSR-capable demo app framework in `apps/nuxt3/package.json`, configured in `apps/nuxt3/nuxt.config.ts`
- tsParticles engine (`@tsparticles/engine` `^3.9.1` / `^3.0.2`) - Particle engine consumed by Vue plugin and demos in `components/vue3/package.json`, `components/vue3/src/components/vue-particles.vue`, `apps/vue3/src/main.ts`, `apps/nuxt3/plugins/vue3-particles.client.ts`

**Testing:**
- Not detected (no Jest/Vitest/Cypress/Playwright config files found in workspace)

**Build/Dev:**
- Vite 5 (`^5.0.10`) - Build/dev server for package and Vue demo in `components/vue3/vite.config.ts`, `apps/vue3/vite.config.ts`
- Nuxt CLI (`nuxt dev/build/generate/preview`) - Build/dev pipeline for Nuxt demo in `apps/nuxt3/package.json`
- Type checking: `vue-tsc` (`^1.8.27`) in `components/vue3/package.json`, `apps/vue3/package.json`
- Monorepo orchestration: Lerna 8 + Nx (`lerna`, `nx`) in root `package.json`, configured in `lerna.json`, `nx.json`

## Key Dependencies

**Critical:**
- `@tsparticles/engine` - Core rendering/particle engine used directly by plugin component (`components/vue3/src/components/vue-particles.vue`) and initialization flow (`components/vue3/src/components/index.ts`)
- `@tsparticles/vue3` - Published Vue plugin package and workspace dependency used by demos (`components/vue3/package.json`, `apps/vue3/package.json`, `apps/nuxt3/package.json`)
- `tsparticles` - Full loader (`loadFull`) used to register all features in demos (`apps/vue3/src/main.ts`, `apps/nuxt3/plugins/vue3-particles.client.ts`)

**Infrastructure:**
- `vite-plugin-dts` - Type declaration generation for library build in `components/vue3/vite.config.ts`
- `@vitejs/plugin-vue` / `@vitejs/plugin-vue-jsx` - Vue and JSX build pipeline in `components/vue3/vite.config.ts`, `apps/vue3/vite.config.ts`
- `eslint`, `prettier`, Vue ESLint configs - Static analysis and formatting in `components/vue3/package.json`, `apps/vue3/package.json`, `apps/nuxt3/package.json`
- `husky`, `@commitlint/*` - Commit hooks and commit message enforcement declared at root in `package.json`

## Configuration

**Environment:**
- No runtime environment-variable contract detected in source (`process.env`, `import.meta.env`, `runtimeConfig` not detected across `apps/` and `components/`)
- `.env` files: Not detected in workspace root/apps/components
- Nuxt runtime config file exists but has no custom config (`apps/nuxt3/nuxt.config.ts`)

**Build:**
- Workspace/package manager config: `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `lerna.json`, `nx.json`
- TypeScript config: `components/vue3/tsconfig.json`, `apps/vue3/tsconfig.json`, `apps/nuxt3/tsconfig.json`
- Bundler config: `components/vue3/vite.config.ts`, `apps/vue3/vite.config.ts`
- CI config: `.github/workflows/nodejs.yml`, `apps/nuxt3/.github/workflows/ci.yml`

## Platform Requirements

**Development:**
- Node.js + pnpm required for workspace scripts in root `package.json` and `pnpm-workspace.yaml`
- Vue/Nuxt toolchains required per package (`apps/vue3/package.json`, `apps/nuxt3/package.json`, `components/vue3/package.json`)

**Production:**
- Primary production artifact is an npm library package (`@tsparticles/vue3`) built to `dist` (`components/vue3/package.json`, `components/vue3/vite.config.ts`)
- Demo app deployment targets are static/client builds for Vite and Nuxt demo execution (`apps/vue3/package.json`, `apps/nuxt3/package.json`)

---

*Stack analysis: 2026-04-10*
