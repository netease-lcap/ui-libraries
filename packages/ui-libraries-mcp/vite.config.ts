import { defineConfig } from 'vite';
import path from 'node:path';
import dts from 'vite-plugin-dts';

const rootDir = __dirname;
const entry = path.resolve(rootDir, 'src/index.ts');

export default defineConfig({
  build: {
    lib: {
      entry,
      name: 'UiLibrariesMcp',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['mitt'],
      output: {
        exports: 'named',
      },
    },
    target: 'es2019',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [
    dts({
      entryRoot: path.resolve(rootDir, 'src'),
      tsconfigPath: path.resolve(rootDir, 'tsconfig.json'),
      outputDir: path.resolve(rootDir, 'dist'),
      insertTypesEntry: true,
    }),
  ],
});
