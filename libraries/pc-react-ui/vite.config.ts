/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';

// 设置测试运行的时区
process.env.TZ = 'Asia/Shanghai';

// https://vitejs.dev/config/

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              '> 1%',
              'last 2 versions',
              'ie >= 9',
            ],
            grid: true,
          }) as any,
        ],
      },
    },
    define: {
      'process.env': {
        NODE_ENV: command === 'build' ? 'production' : 'development',
      },
    },
    build: {
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      lib: {
        entry: 'src/index.ts',
        name: 'antd',
        formats: ['umd'],
        fileName: () => 'index.js',
      },
      minify: false,
      outDir: 'dist-theme',
      sourcemap: true,
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['react', 'react-dom'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') {
              return 'index.css';
            }

            return '[name][extname]';
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        reportsDirectory: './test/coverage',
        include: ['src/**/*.?(c|m)[jt]s?(x)'],
        exclude: ['**/stories/**'],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 把 src 的别名设置为 @
        '@components': path.resolve(__dirname, './src/components'), // 把 src 的别名设置为 @
        '@plugins': path.resolve(__dirname, './src/plugins'), // 把 src 的别名设置为 @
      },
    },
  };
});
