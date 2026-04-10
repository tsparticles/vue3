# Codebase Structure

**Analysis Date:** 2026-04-10

## Directory Layout

```
vue3/
├── apps/                    # Consumer/demo applications for integration scenarios
│   ├── vue3/                # Vite + Vue demo app consuming @tsparticles/vue3
│   └── nuxt3/               # Nuxt 3 demo app consuming @tsparticles/vue3
├── components/              # Publishable packages
│   └── vue3/                # Source package for @tsparticles/vue3
├── .github/workflows/       # Root CI pipeline definitions
├── .husky/                  # Git hook scripts (commit validation)
├── .planning/codebase/      # Generated mapping documents for GSD workflows
├── package.json             # Root workspace scripts and orchestration entry
├── pnpm-workspace.yaml      # Workspace package globs
├── lerna.json               # Lerna package orchestration config
└── nx.json                  # Nx task caching defaults
```

## Directory Purposes

**`apps/`:**
- Purpose: Host runnable consumer implementations that exercise the package in real app contexts.
- Contains: Framework-specific app bootstrap, demo UI, framework build configs.
- Key files: `apps/vue3/src/main.ts`, `apps/vue3/src/App.vue`, `apps/nuxt3/plugins/vue3-particles.client.ts`, `apps/nuxt3/app.vue`, `apps/nuxt3/nuxt.config.ts`.

**`components/vue3/`:**
- Purpose: Contain the production library distributed as `@tsparticles/vue3`.
- Contains: Vue plugin installer, SFC component, library Vite config, TypeScript configs, package metadata.
- Key files: `components/vue3/src/components/index.ts`, `components/vue3/src/components/vue-particles.vue`, `components/vue3/vite.config.ts`, `components/vue3/package.json`.

**`.github/workflows/`:**
- Purpose: Define repository-level CI execution.
- Contains: GitHub Actions workflows.
- Key files: `.github/workflows/nodejs.yml`.

**`.husky/`:**
- Purpose: Enforce commit-time checks.
- Contains: Hook scripts.
- Key files: `.husky/commit-msg`.

**Repository root configs:**
- Purpose: Define workspace package boundaries and build orchestration.
- Contains: pnpm, Lerna, Nx configuration.
- Key files: `package.json`, `pnpm-workspace.yaml`, `lerna.json`, `nx.json`.

## Key File Locations

**Entry Points:**
- `components/vue3/src/components/index.ts`: Package runtime entry used by consumers.
- `apps/vue3/src/main.ts`: Vue demo bootstrap entry.
- `apps/nuxt3/plugins/vue3-particles.client.ts`: Nuxt client plugin registration entry.
- `apps/nuxt3/app.vue`: Nuxt root component using `vue-particles`.
- `package.json`: Monorepo build command entry.

**Configuration:**
- `pnpm-workspace.yaml`: Workspace package discovery (`apps/*`, `components/*`).
- `lerna.json`: Lerna package scope and conventional commit versioning.
- `nx.json`: Nx named inputs and cache defaults for build targets.
- `components/vue3/vite.config.ts`: Library-mode Vite bundle config.
- `apps/vue3/vite.config.ts`: App-mode Vite config for Vue demo.
- `apps/nuxt3/nuxt.config.ts`: Nuxt app config.
- `apps/vue3/tsconfig.json`, `components/vue3/tsconfig.json`, `apps/nuxt3/tsconfig.json`: TypeScript boundaries per package.

**Core Logic:**
- `components/vue3/src/components/index.ts`: Plugin install flow + engine init event dispatch.
- `components/vue3/src/components/vue-particles.vue`: Props-to-engine load flow, lifecycle cleanup, emits.

**Testing:**
- Not detected (`*.test.*` / `*.spec.*` files are not present in `apps/` or `components/`).

## Naming Conventions

**Files:**
- Vue single-file components use kebab-case: `components/vue3/src/components/vue-particles.vue`.
- Package source entry uses `index.ts`: `components/vue3/src/components/index.ts`.
- Framework config files use conventional names: `vite.config.ts`, `nuxt.config.ts`, `tsconfig.json`.

**Directories:**
- Top-level grouping by role: `apps/` for consumers, `components/` for publishable package.
- Package directory names align with framework/version target: `apps/vue3/`, `apps/nuxt3/`, `components/vue3/`.

## Where to Add New Code

**New Feature:**
- Primary code: `components/vue3/src/components/` for library behavior changes.
- Tests: Not applicable (no current test harness detected); introduce under `components/vue3/src/` or `components/vue3/tests/` only if adding a new test setup.

**New Component/Module:**
- Implementation: Add new SFC/module in `components/vue3/src/components/` and export/register from `components/vue3/src/components/index.ts`.

**Utilities:**
- Shared helpers: Create a dedicated utility module under `components/vue3/src/` (for example `components/vue3/src/utils/`) and import into component/plugin files.

## Special Directories

**`apps/vue3/dist/`:**
- Purpose: Built static assets for Vue demo.
- Generated: Yes
- Committed: No (`dist` ignored in `apps/vue3/.gitignore`)

**`apps/nuxt3/.nuxt/` and `apps/nuxt3/.output/`:**
- Purpose: Nuxt generated build artifacts and runtime output.
- Generated: Yes
- Committed: No (`.nuxt` and `.output` ignored in `apps/nuxt3/.gitignore`)

**`components/vue3/dist/`:**
- Purpose: Built package artifacts referenced by `main`/`module`/`types` in `components/vue3/package.json`.
- Generated: Yes
- Committed: No (`dist` ignored in `components/vue3/.gitignore`)

**`node_modules/` (root and package-local):**
- Purpose: Installed dependencies.
- Generated: Yes
- Committed: No (ignored in root `.gitignore` and package `.gitignore` files)

**`.planning/codebase/`:**
- Purpose: Generated architecture/quality/stack concern documents consumed by GSD commands.
- Generated: Yes (by mapping commands)
- Committed: Yes (intended project documentation output)

---

*Structure analysis: 2026-04-10*
