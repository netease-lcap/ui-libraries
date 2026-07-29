import { defineConfig } from 'vite';
import path from 'node:path';
import dts from 'vite-plugin-dts';
import { libraryName } from './src/const';

const rootDir = __dirname;
const entry = path.resolve(rootDir, 'src/index.ts');

export default defineConfig({
  build: {
    lib: {
      entry,
      name: libraryName,
      formats: ['umd'],
      fileName: () => 'index.js',
    },
    target: 'es2015',
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [
    dts({
      entryRoot: path.resolve(rootDir, 'src'),
      tsconfigPath: path.resolve(rootDir, 'tsconfig.json'),
      outDir: path.resolve(rootDir, 'dist'),
      insertTypesEntry: true,
    }),
  ],
});
