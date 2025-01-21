import fs from 'fs-extra';
import path from 'path';
import { cloneDeep } from 'lodash';

const DefaultFrameWorkOutputConfig: Record<string, { external: string[]; globals: Record<string, string>;}> = {
  vue2: {
    external: ['vue', 'vue-router', 'vue-i18n', '@vue/composition-api'],
    globals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'vue-i18n': 'VueI18n',
      '@vue/composition-api': 'VueCompositionAPI',
    },
  },
  react: {
    external: ['react', 'react-dom'],
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  vue3: {
    external: ['vue', 'vue-i18n', 'vuex', 'pinia', 'vue-router'],
    globals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'vue-i18n': 'VueI18n',
      vuex: 'Vuex',
      pinia: 'Pinia',
    },
  },
};

export interface BuildOutputConfig {
  external: (string | RegExp)[];
  globals: Record<string, string>;
}

export interface GetBuildOutputConifgOptions {
  rootPath: string;
  framework: string;
  type: 'nasl.ui' | 'extension',
  addDepExternal?: boolean;
}

export function getBuildOutputConifg({ rootPath, framework, addDepExternal }: GetBuildOutputConifgOptions) {
  const { external, globals } = cloneDeep(DefaultFrameWorkOutputConfig[framework] || { external: [], globals: {} }) as BuildOutputConfig;

  if (addDepExternal) {
    const pkgInfo = fs.readJsonSync(path.resolve(rootPath, 'package.json'));
    const depExternal = Object.keys(pkgInfo.dependencies).concat(Object.keys(pkgInfo.peerDependencies)).map((str) => new RegExp(`^${str}`));

    external.push(...depExternal);
  }

  return {
    external,
    globals,
  };
}
