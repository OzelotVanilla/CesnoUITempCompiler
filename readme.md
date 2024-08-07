Building
====

This project uses [`tsup`](https://tsup.egoist.dev/) for building NPM package.
To build this project, run the NPM script `build`.
The configuration file is `/tsup.config.ts`,
which defines files-to-compile, some options & env settings, and so on.

The `/tsconfig.json` **exists only** for the favour of IDE (e.g., providing auto-complete).
The `include` in that file does not stands for the file to be compile.
Please refer to `/tsup.config.ts` if any compilation need to be changed.

Test & Debugging
====

For testing unit, please name it with the suffix `.test.ts` or `.test.tsx` in the `/test` folder.
File just ends in `.ts` or `.tsx` will not be treated as testing unit.
To run the test, run the NPM script `test`.

For debugging , [`tsx`](https://tsx.is/) can be used.
To setup debugging environment in VSCode, see [this](https://tsx.is/vscode).

About `packageManager` field in `package.json`
====

No package manager version is specified in this project (usually the latest stable version of `pnpm` is used).
Please set `COREPACK_ENABLE_AUTO_PIN` to `0` in your environment variable
to avoid the package manager adding this field to the file.