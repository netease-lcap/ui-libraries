import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/vue2/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  minify: false,
  external: [],
  clean: true,
  outExtension({ format }) {
    if (format === 'cjs') {
      return {
        js: '.js',
      };
    }

    return {
      js: `.${format}.js`,
    };
  },
  dts: {
    resolve: true,
    // build types for `src/index.ts` only
    // otherwise `Options` will not be exported by `tsup`, not sure how this happens, probably a bug in rollup-plugin-dts
    entry: './src/index.ts',
  },
  skipNodeModulesBundle: true,
});
