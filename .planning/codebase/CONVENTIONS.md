# Coding Conventions

**Analysis Date:** 2026-04-10

## Naming Patterns

**Files:**
- Use kebab-case for Vue SFC component filenames in the library: `components/vue3/src/components/vue-particles.vue`.
- Use `index.ts` as barrel/entry files for module exports and plugin setup: `components/vue3/src/components/index.ts`.
- Use framework-default names for app entry files: `apps/vue3/src/main.ts`, `apps/vue3/src/App.vue`, `apps/nuxt3/app.vue`.

**Functions:**
- Use `camelCase` for local functions and callbacks: `loadParticles`, `initEventHandler`, `particlesLoaded` in `components/vue3/src/components/vue-particles.vue` and `apps/vue3/src/App.vue`.
- Use `PascalCase` for plugin factory identifiers: `VueParticles` in `components/vue3/src/components/index.ts`.

**Variables:**
- Use `camelCase` for mutable variables and constants: `container`, `engine`, `options`, `app` in `components/vue3/src/components/vue-particles.vue` and `apps/vue3/src/main.ts`.
- Prefer explicit optional typing for runtime-managed values: `let container: Container | undefined` in `components/vue3/src/components/vue-particles.vue`.

**Types:**
- Use `I*` prefix for interface/type aliases tied to tsParticles options: `IParticlesProps`, `ISourceOptions` in `components/vue3/src/components/vue-particles.vue` and `apps/nuxt3/app.vue`.
- Use `type`-only imports where possible to keep runtime bundles clean: `import type { App } from "vue"` in `components/vue3/src/components/index.ts`.

## Code Style

**Formatting:**
- Use Prettier as the formatting source of truth in package scripts.
- Library package delegates to shared config via `"prettier": "@tsparticles/prettier-config"` in `components/vue3/package.json`.
- Nuxt demo has local Prettier overrides in `apps/nuxt3/.prettierrc` (`semi: false`, `singleQuote: true`).
- Run formatting through scripts before build/check:
  - `components/vue3/package.json` → `prettify:src`, `prettify:readme`, `prettify:ci:*`
  - `apps/nuxt3/package.json` → `lint:prettier`, `lintfix`

**Linting:**
- Use ESLint with framework presets:
  - Vue app/library: `plugin:vue/vue3-essential`, `eslint:recommended`, `@vue/eslint-config-typescript/recommended`, `@vue/eslint-config-prettier` in `apps/vue3/.eslintrc.cjs` and `components/vue3/.eslintrc.cjs`.
  - Nuxt app: `@nuxtjs`, `plugin:nuxt/recommended`, `prettier` in `apps/nuxt3/.eslintrc.js`.
- Keep lint scripts package-local in `package.json` files under `apps/vue3`, `components/vue3`, `apps/nuxt3`.

## Import Organization

**Order:**
1. Framework/core imports (`vue`, `nuxt/config`, `vite`) in files like `apps/vue3/src/main.ts`, `apps/nuxt3/nuxt.config.ts`, `components/vue3/vite.config.ts`.
2. External library imports (`@tsparticles/*`, `tsparticles`) in `components/vue3/src/components/index.ts`, `apps/nuxt3/plugins/vue3-particles.client.ts`.
3. Local module/style imports (`./App.vue`, `./assets/main.css`) in `apps/vue3/src/main.ts`.

**Path Aliases:**
- Use `@/*` → `./src/*` in TypeScript and Vite config:
  - `components/vue3/tsconfig.json`
  - `components/vue3/vite.config.ts`
  - `apps/vue3/tsconfig.json`
  - `apps/vue3/vite.config.ts`

## Error Handling

**Patterns:**
- Fail fast for required props: throw explicit error when `id` is missing in `components/vue3/src/components/vue-particles.vue`.
- Use guard clauses before cleanup logic to avoid invalid operations:
  - `if (!container) { return; }` before `container.destroy()` in `components/vue3/src/components/vue-particles.vue`.
- Use optional chaining for non-critical operations: `container?.loadTheme(props.theme)` in `components/vue3/src/components/vue-particles.vue`.

## Logging

**Framework:** console

**Patterns:**
- Keep `console.log` usage in demo apps for visibility during sample integration:
  - `apps/vue3/src/App.vue`
  - `apps/nuxt3/app.vue`
- Avoid logging in core library plugin flow (`components/vue3/src/components/index.ts`, `components/vue3/src/components/vue-particles.vue`).

## Comments

**When to Comment:**
- Add concise comments only for non-obvious build/runtime behavior:
  - Rollup external/global rationale in `components/vue3/vite.config.ts`.
  - Nuxt plugin placeholder note in `apps/nuxt3/plugins/vue3-particles.client.ts`.

**JSDoc/TSDoc:**
- Not detected in analyzed source files (`components/vue3/src/components/*.ts`, `components/vue3/src/components/*.vue`, `apps/vue3/src/*.ts`, `apps/nuxt3/*.ts`).

## Function Design

**Size:**
- Keep functions small and single-purpose; most functions span only setup/load/cleanup behavior (for example `loadParticles` and `particlesLoaded` in `components/vue3/src/components/vue-particles.vue`).

**Parameters:**
- Use typed object params for plugin configuration: `options: { init: (engine: Engine) => Promise<void> }` in `components/vue3/src/components/index.ts`.
- Use optional parameters for lifecycle callbacks where runtime may omit data: `particlesLoaded(container?: Container)` in `apps/nuxt3/app.vue`.

**Return Values:**
- Favor async side-effect functions returning `Promise<void>` in initialization flows (`init` callbacks in `apps/vue3/src/main.ts` and `apps/nuxt3/plugins/vue3-particles.client.ts`).
- Use event emission instead of direct returns for cross-component communication (`emit("particlesLoaded", container)` in `components/vue3/src/components/vue-particles.vue`).

## Module Design

**Exports:**
- Export plugin as default export from module entry: `export default VueParticles` in `components/vue3/src/components/index.ts`.
- Export shared type aliases from SFC script where needed (`export type IParticlesProps = ISourceOptions` in `components/vue3/src/components/vue-particles.vue`).

**Barrel Files:**
- Use `index.ts` as the package-level entry for registration/init logic in `components/vue3/src/components/index.ts`.
- No multi-file barrel hierarchy detected beyond this entry point.

---

*Convention analysis: 2026-04-10*
