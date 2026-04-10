# tsParticles Vue3 v4 Modernization

## What This Is

This project evolves the `@tsparticles/vue3` monorepo to align with the new tsParticles 4.0.0 beta ecosystem and modern Vue/TypeScript tooling patterns. It covers the Vue 3 library package plus its Vite and Nuxt integration apps used for validation and examples. The target users are maintainers and developers who consume the Vue wrapper and expect compatibility with the latest tsParticles stack.

## Core Value

The Vue 3 wrapper must stay fully compatible with the latest tsParticles v4 beta packages while adopting modern syntax/tooling without breaking integration flows.

## Requirements

### Validated

- ✓ Vue 3 plugin installation and component registration for particle rendering — existing
- ✓ Runtime initialization flow through `init(engine)` and container loaded callbacks — existing
- ✓ Demo integrations for Vue (Vite) and Nuxt 3 usage patterns — existing
- ✓ Monorepo-based package build and release workflow — existing

### Active

- [ ] Update all relevant dependencies/tooling to latest compatible versions, keeping tsParticles packages on the intended v4 beta line.
- [ ] Migrate package and app code to modern Vue/TypeScript syntax and current best-practice patterns.
- [ ] Preserve API behavior and integration ergonomics for current consumers during migration.
- [ ] Ensure build/check workflows are green after migration and version updates.

### Out of Scope

- New product features unrelated to migration/modernization — focus is compatibility and technical modernization.
- Re-architecting non-Vue wrappers in other repositories — this initiative is scoped to this Vue3 monorepo.

## Context

The repository already contains a working Vue 3 particles wrapper, demo apps, and a codebase map under `.planning/codebase/`. The maintainer is actively developing tsParticles 4.0.0 beta packages, so this project must track that line rather than waiting for stable final release tags. The immediate goal is reducing technical drift and avoiding outdated syntax/tooling while keeping current integration patterns reliable.

## Constraints

- **Tech stack**: Keep Vue 3 + tsParticles integration model and existing package purpose — avoid breaking core plugin responsibilities.
- **Versioning**: Use latest compatible versions, but tsParticles dependencies should stay on the maintainer's 4.0.0 beta track — this is the migration target.
- **Compatibility**: Existing documented usage in demo apps and README should remain valid or receive coordinated updates — prevents consumer friction.
- **Scope**: Prioritize modernization/refactor and dependency updates over net-new feature expansion — keeps execution focused.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Adopt tsParticles 4.0.0 beta line as migration baseline | Maintainer is actively developing beta packages and needs wrapper alignment now | — Pending |
| Run initialization in auto YOLO planning mode with research/checkers/verifier enabled | Fast execution with guardrails for planning quality and requirement verification | — Pending |
| Treat this as brownfield modernization with existing capabilities preserved | Package is already functional and used; migration should improve internals without regressions | — Pending |

---
*Last updated: 2026-04-10 after initialization*
