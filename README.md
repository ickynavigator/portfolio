# Obi Fortune Portfolio

My new portfolio site.

## Tools Used

- [Next.js](https://nextjs.org/)
- [Sanity CMS](https://sanity.io/)
- [Mantine](https://mantine.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [Biome](https://biomejs.dev/)

## Scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `start` – start bundled application
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types across the project
- `test` – runs application tests **NOT SETUP YET**
- `test:ci` – runs application tests in CI mode **NOT SETUP YET**
- `lint` – runs Biome linter
- `lint:ci` – runs Biome linter in CI mode (no fixes)
- `lint:fix` – runs Biome linter with `--fix` flag so the linter can fix issues automatically

### Sanity scripts

- `typegen` – run all typegen scripts
- `typegen:extract` – generate sanity schema from sanity studio
- `typegen:generate` – generate types from extracted sanity schema
- `typegen:lint` – lint generated types
