# Architecture

**Analysis Date:** 2026-04-10

## Pattern Overview

**Overall:** Monorepo package-and-demo architecture (library core + consumer applications)

**Key Characteristics:**
- Workspace orchestration at repository root delegates builds to package-level tooling via `package.json`, `lerna.json`, and `nx.json`.
- One reusable Vue plugin/component package in `components/vue3/` is consumed by multiple demo applications in `apps/vue3/` and `apps/nuxt3/`.
- Runtime behavior is event-driven around tsParticles engine initialization using a global custom event bridge in `components/vue3/src/components/index.ts` and `components/vue3/src/components/vue-particles.vue`.

## Layers

**Workspace Orchestration Layer:**
- Purpose: Coordinate build and release workflows across all packages.
- Location: `package.json`, `pnpm-workspace.yaml`, `lerna.json`, `nx.json`, `.github/workflows/nodejs.yml`
- Contains: Workspace definitions, orchestrator scripts, CI execution rules.
- Depends on: pnpm, Lerna, Nx, GitHub Actions.
- Used by: All packages in `apps/*` and `components/*`.

**Library Layer (`@tsparticles/vue3`):**
- Purpose: Provide installable Vue 3 plugin and `vue-particles` component.
- Location: `components/vue3/src/components/`
- Contains: Plugin registration and init lifecycle (`index.ts`), component runtime (`vue-particles.vue`).
- Depends on: `vue`, `@tsparticles/engine`.
- Used by: `apps/vue3/src/main.ts` and `apps/nuxt3/plugins/vue3-particles.client.ts`.

**Application Integration Layer (Demo Consumers):**
- Purpose: Show integration patterns in plain Vue + Vite and Nuxt 3.
- Location: `apps/vue3/src/`, `apps/nuxt3/`
- Contains: App bootstrap, plugin installation, UI usage examples.
- Depends on: `@tsparticles/vue3`, `tsparticles`, framework-specific bootstrap APIs.
- Used by: Local development and validation of package behavior.

**Build/Distribution Layer:**
- Purpose: Produce distributable artifacts for package and demos.
- Location: `components/vue3/vite.config.ts`, `apps/vue3/vite.config.ts`, `apps/nuxt3/package.json` scripts
- Contains: Vite lib build config, app build config, Nuxt build scripts.
- Depends on: Vite/Nuxt toolchains.
- Used by: CI (`.github/workflows/nodejs.yml`) and local build commands.

## Data Flow

**Plugin Initialization and Particle Container Flow:**

1. Consumer app installs plugin with `app.use(Particles, { init })` in `apps/vue3/src/main.ts` or `nuxtApp.vueApp.use(...)` in `apps/nuxt3/plugins/vue3-particles.client.ts`.
2. Plugin in `components/vue3/src/components/index.ts` registers `vue-particles`, calls `tsParticles.init()`, runs optional `init(engine)` callback, then dispatches `particlesInit` with engine detail.
3. Component in `components/vue3/src/components/vue-particles.vue` listens for `particlesInit`, resolves engine, and calls `engine.load({ id, url, options })`.
4. Component emits `particlesLoaded` event to consumer after container creation.
5. Consumer handles `@particles-loaded` callback in `apps/vue3/src/App.vue` and `apps/nuxt3/app.vue`.
6. On unmount, component destroys container via `container.destroy()` in `components/vue3/src/components/vue-particles.vue`.

**State Management:**
- Local component-scoped state (`container`, `engine`) in `components/vue3/src/components/vue-particles.vue`.
- No centralized store (no Vuex/Pinia detected).

## Key Abstractions

**Vue Plugin Installer (`Particles`):**
- Purpose: Encapsulate one-time component registration and tsParticles engine startup.
- Examples: `components/vue3/src/components/index.ts`, usage in `apps/vue3/src/main.ts`.
- Pattern: Vue plugin function `(app, options) => void` with async bootstrap side effect.

**Render Component (`<vue-particles>`):**
- Purpose: Declarative wrapper that maps Vue props to tsParticles `engine.load` inputs.
- Examples: `components/vue3/src/components/vue-particles.vue`, usage in `apps/vue3/src/App.vue`, `apps/nuxt3/app.vue`.
- Pattern: `<script setup>` single-file component with typed props and emits.

**Engine Loader Callback:**
- Purpose: Let consumers choose runtime feature bundle (`loadFull`, `loadSlim`, etc.).
- Examples: `apps/vue3/src/main.ts`, `apps/nuxt3/plugins/vue3-particles.client.ts`, documented in `README.md`.
- Pattern: Dependency inversion through `init(engine)` callback.

## Entry Points

**Workspace Build Entry:**
- Location: `package.json`
- Triggers: `pnpm run build`, `pnpm run build:ci`, `pnpm run build:lerna`, `pnpm run build:nx`
- Responsibilities: Run package builds across monorepo through Lerna/Nx.

**Library Source Entry:**
- Location: `components/vue3/src/components/index.ts`
- Triggers: Imported by consumers as `@tsparticles/vue3` (declared in `components/vue3/package.json` main/module/types).
- Responsibilities: Register component and initialize tsParticles engine lifecycle.

**Library Bundle Entry (Build):**
- Location: `components/vue3/vite.config.ts`
- Triggers: `pnpm run build` in `components/vue3/package.json`.
- Responsibilities: Build library with entry `src/components/index.ts`, externalize `vue` and `@tsparticles/engine`, generate DTS.

**Vue Demo App Entry:**
- Location: `apps/vue3/src/main.ts`
- Triggers: `vite` dev/build commands from `apps/vue3/package.json`.
- Responsibilities: Create Vue app, install particles plugin, mount root app.

**Nuxt Demo App Entries:**
- Location: `apps/nuxt3/plugins/vue3-particles.client.ts`, `apps/nuxt3/app.vue`
- Triggers: Nuxt plugin auto-loading and app bootstrap via `nuxt` scripts in `apps/nuxt3/package.json`.
- Responsibilities: Client-only plugin registration and component usage.

## Error Handling

**Strategy:** Local fail-fast checks plus lifecycle cleanup; minimal centralized handling.

**Patterns:**
- Explicit required prop validation via thrown error (`if (!props.id) throw ...`) in `components/vue3/src/components/vue-particles.vue`.
- Defensive teardown with existence guards before destroy in `components/vue3/src/components/vue-particles.vue`.
- Async init is awaited in consumer callbacks (`loadFull`) in `apps/vue3/src/main.ts` and `apps/nuxt3/plugins/vue3-particles.client.ts`.

## Cross-Cutting Concerns

**Logging:**
- Debug-style console logging in demo consumers (`console.log(container)`) in `apps/vue3/src/App.vue` and `apps/nuxt3/app.vue`.

**Validation:**
- Runtime validation for required `id` prop in `components/vue3/src/components/vue-particles.vue`.
- Type-level validation through TypeScript config and `vue-tsc` in `components/vue3/package.json` and `apps/vue3/package.json`.

**Authentication:**
- Not applicable (no auth boundary detected in library or demos).

---

*Architecture analysis: 2026-04-10*
