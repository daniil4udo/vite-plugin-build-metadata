import { defineConfig } from 'tsup';

export default defineConfig({
    entry: [ 'lib/index.ts' ],
    format: [ 'cjs', 'esm' ], // generate cjs and esm files
    // entryPoints: [ 'lib/index.ts' ],
    clean: true, // rimraf dis
    dts: true, // generate dts file for main module
    skipNodeModulesBundle: true,
    splitting: true,
    target: 'es2020',
    cjsInterop: true,
});
