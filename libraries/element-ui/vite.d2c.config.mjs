/// <reference types="vitest" />
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: 'ide/d2c',
        name: 'd2c',
        formats: ['cjs'],
        fileName: 'd2c',
      },
      outDir: 'dist-theme/ide',
      emptyOutDir: false,
    },
  };
});
