# Codebase Concerns

**Analysis Date:** 2026-04-10

## Tech Debt

**Workspace build and tooling drift:**
- Issue: Runtime and package-manager definitions are inconsistent across workspace and CI (`pnpm@10.33.0` in `package.json`, `pnpm@8` in `.github/workflows/nodejs.yml`, Yarn-only Nuxt scripts in `apps/nuxt3/package.json`, Node 14 in `apps/nuxt3/.github/workflows/ci.yml`, Node 16 in `.github/workflows/nodejs.yml`).
- Files: `package.json`, `.github/workflows/nodejs.yml`, `apps/nuxt3/package.json`, `apps/nuxt3/.github/workflows/ci.yml`
- Impact: Reproducibility is fragile between local and CI environments; install/build/lint outcomes can diverge by executor.
- Fix approach: Standardize on one package manager and one supported Node range across all workflows and package scripts; align CI definitions with workspace declarations.

**Library lint script is effectively disabled:**
- Issue: The library lint command prints an ESLint command instead of running it.
- Files: `components/vue3/package.json`
- Impact: Static-analysis regressions in `components/vue3/src/components/` pass unnoticed in routine lint runs.
- Fix approach: Replace the `echo eslint ...` command with direct `eslint ...` execution and include lint in CI.

**No automated test harness in workspace:**
- Issue: No `*.test.*`/`*.spec.*` files are present and no test runner config is detected.
- Files: `components/vue3/src/components/index.ts`, `components/vue3/src/components/vue-particles.vue`, `apps/vue3/src/App.vue`, `apps/nuxt3/app.vue`
- Impact: Behavior changes in lifecycle/event integration are validated manually only.
- Fix approach: Add unit/integration tests for plugin install flow, event handling, lifecycle cleanup, and prop-driven behavior.

## Known Bugs

**Event listener can remain attached after component unmount:**
- Symptoms: Global `particlesInit` listener is registered, but removal is skipped when `container` is undefined during unmount.
- Files: `components/vue3/src/components/vue-particles.vue`
- Trigger: Component unmounts before `engine.load(...)` produces a container (or if load never completes successfully).
- Workaround: Ensure listener cleanup runs unconditionally in `onUnmounted`, independent of container state.

**Particle load path can execute multiple times for one component instance:**
- Symptoms: `loadParticles()` is called in `onMounted` and also from `particlesInit` event handler, with no idempotency guard.
- Files: `components/vue3/src/components/vue-particles.vue`, `components/vue3/src/components/index.ts`
- Trigger: Plugin dispatches `particlesInit` while/after component mount lifecycle runs.
- Workaround: Gate `loadParticles()` with a loading/initialized flag or consolidate to a single initialization path.

## Security Considerations

**Global custom event trust boundary:**
- Risk: Any script in the same browser context can dispatch `particlesInit` with arbitrary payload; handler trusts `evt.detail` as an engine object.
- Files: `components/vue3/src/components/index.ts`, `components/vue3/src/components/vue-particles.vue`
- Current mitigation: TypeScript typing only (`CustomEvent<Engine>`), no runtime validation of event source/payload.
- Recommendations: Use a private integration channel (e.g., plugin-level provide/inject), or validate event detail shape before invoking load logic.

## Performance Bottlenecks

**Redundant initialization work per component instance:**
- Problem: Multiple execution paths can call `engine.load(...)` for the same component, increasing unnecessary setup work.
- Files: `components/vue3/src/components/vue-particles.vue`, `components/vue3/src/components/index.ts`
- Cause: Parallel initialization triggers (`onMounted` and global event callback) with no deduplication.
- Improvement path: Add initialization state guard and skip duplicate calls when a container already exists or load is in progress.

**Demo integration defaults to full engine loading:**
- Problem: Demo bootstraps load the full tsParticles feature set, increasing startup and bundle overhead.
- Files: `apps/vue3/src/main.ts`, `apps/nuxt3/plugins/vue3-particles.client.ts`
- Cause: `loadFull(engine)` is used instead of selective loaders.
- Improvement path: Use scoped loaders (`@tsparticles/slim` or feature-specific packages) in demos that target minimal baseline examples.

## Fragile Areas

**Plugin/component coupling via browser-global events:**
- Files: `components/vue3/src/components/index.ts`, `components/vue3/src/components/vue-particles.vue`
- Why fragile: Coordination depends on stringly-typed global event name (`"particlesInit"`) and execution timing across plugin install and component mount.
- Safe modification: Preserve event contract exactly or replace both sides together; add regression tests around mount-before-init and init-before-mount scenarios.
- Test coverage: Gaps; no automated tests are detected for this lifecycle contract.

**Nuxt integration path has minimal configuration safeguards:**
- Files: `apps/nuxt3/plugins/vue3-particles.client.ts`, `apps/nuxt3/nuxt.config.ts`, `apps/nuxt3/app.vue`
- Why fragile: Integration relies on client-only plugin behavior and manual plugin logic without explicit Nuxt runtime config checks.
- Safe modification: Keep plugin client-only semantics and validate plugin behavior during SSR/client hydration boundaries.
- Test coverage: Gaps; no Nuxt integration tests are detected.

## Scaling Limits

**Multiple particle instances rely on caller-managed unique IDs:**
- Current capacity: Component API requires external `id` assignment and passes it directly to `engine.load(...)`.
- Limit: Duplicate IDs in larger pages can cause container collisions or undefined behavior in engine targeting.
- Scaling path: Add internal ID generation fallback or runtime duplicate-ID detection with explicit error messaging.

**Per-instance global listener registration:**
- Current capacity: Each mounted `<vue-particles>` instance attaches a global `particlesInit` listener.
- Limit: Larger instance counts amplify listener churn and sensitivity to cleanup correctness.
- Scaling path: Replace per-instance global listener pattern with shared plugin state or composable-based dependency injection.

## Dependencies at Risk

**Divergent tsParticles dependency ranges between packages:**
- Risk: Demo packages use different major/minor ranges from library package (`^3.9.1` in `components/vue3/package.json` and `apps/vue3/package.json` vs `^3.0.2` in `apps/nuxt3/package.json`).
- Impact: Cross-package behavior and examples can drift from the published package’s effective compatibility matrix.
- Migration plan: Align all workspace packages on a single supported tsParticles range and enforce via workspace policy.

**Legacy CI actions and deprecated workflow patterns:**
- Risk: `apps/nuxt3/.github/workflows/ci.yml` uses `actions/checkout@master` and deprecated `::set-output` syntax; root workflow also uses `::set-output`.
- Impact: CI reliability degrades as GitHub Actions platform deprecations advance.
- Migration plan: Pin to current action versions and migrate to `$GITHUB_OUTPUT` environment file writes.

## Missing Critical Features

**Automated regression testing for core plugin lifecycle:**
- Problem: Plugin install flow, event bridge, and unmount cleanup are not protected by automated tests.
- Blocks: Safe refactoring of `components/vue3/src/components/index.ts` and `components/vue3/src/components/vue-particles.vue` without manual verification.

**Reactive option/url update behavior contract:**
- Problem: Component watches only `theme`; changes to `options`/`url` after mount have no explicit update/reload behavior.
- Blocks: Predictable dynamic configuration updates in advanced host applications.

## Test Coverage Gaps

**Core wrapper component behavior is untested:**
- What's not tested: Mount/unmount lifecycle, listener registration/removal, duplicate-load prevention, error path for missing `id`, theme-change behavior.
- Files: `components/vue3/src/components/vue-particles.vue`
- Risk: Regressions in initialization and cleanup semantics can ship unnoticed.
- Priority: High

**Plugin installer contract is untested:**
- What's not tested: `app.component("vue-particles", ...)` registration, `tsParticles.init()` invocation, optional `options.init` callback timing, `particlesInit` dispatch.
- Files: `components/vue3/src/components/index.ts`
- Risk: Consumer integration can break silently across framework setups.
- Priority: High

**Framework demo integrations are untested:**
- What's not tested: Vue app bootstrap path and Nuxt client-only plugin path.
- Files: `apps/vue3/src/main.ts`, `apps/vue3/src/App.vue`, `apps/nuxt3/plugins/vue3-particles.client.ts`, `apps/nuxt3/app.vue`
- Risk: Example integrations drift from real package behavior and fail to catch compatibility issues.
- Priority: Medium

---

*Concerns audit: 2026-04-10*
