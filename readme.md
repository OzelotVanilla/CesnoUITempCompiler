Test
====

For testing unit, please name it with the suffix `.test.ts` or `.test.tsx` in the `/test` folder.
File just ends in `.ts` or `.tsx` will not be treated as testing unit.

About `packageManager` field in `package.json`
====

No package manager version is specified in this project (usually the latest stable version of `pnpm` is used).
Please set `COREPACK_ENABLE_AUTO_PIN` to `0` in your environment variable
to avoid the package manager adding this field to the file.