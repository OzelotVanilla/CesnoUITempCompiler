import type { Options } from 'tsup';

const tsup_config: Options = {
    splitting: true,
    clean: true,
    dts: true,
    format: ["esm", "cjs"],
    bundle: false,
    skipNodeModulesBundle: true,
    target: 'esnext',
    outDir: 'dist',
    entry: [
        "src/**/*.ts",
        "!src/**/*.d.ts",
        "src/**/*.js"
    ]
};

export default tsup_config