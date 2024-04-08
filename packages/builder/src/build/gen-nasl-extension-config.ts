import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import genNaslComponentConfig from './gen-nasl-component-config';

export interface GenNaslExtensionConfigProps {
  // cwd
  rootPath: string;
  framework?: string;
  assetsPublicPath?: string;
}

const getFrameWorkKind = (pkgInfo: any) => {
  if (pkgInfo.peerDependencies && Object.keys(pkgInfo.peerDependencies).includes('@tarojs/taro')) {
    return 'taro';
  }

  if (pkgInfo.peerDependencies && Object.keys(pkgInfo.peerDependencies).includes('react')) {
    return 'react';
  }

  if (
    pkgInfo.peerDependencies
    && pkgInfo.peerDependencies.vue
    && (pkgInfo.peerDependencies.vue.startsWith('3.') || pkgInfo.peerDependencies.vue.startsWith('^3.'))
  ) {
    return 'vue3';
  }

  if (
    pkgInfo.peerDependencies
    && pkgInfo.peerDependencies.vue
    && (pkgInfo.peerDependencies.vue.startsWith('2.') || pkgInfo.peerDependencies.vue.startsWith('^2.'))
  ) {
    return 'vue2';
  }

  return '';
};

function getPeerDependencies(pkgInfo) {
  if (!pkgInfo.peerDependencies) {
    return [];
  }

  return Object.keys(pkgInfo.peerDependencies).map((name) => {
    return {
      name,
      version: pkgInfo.peerDependencies[name],
    };
  });
}

export default async function getNaslExtensionConfig({
  rootPath,
  assetsPublicPath,
  framework,
}: GenNaslExtensionConfigProps) {
  const componentPath = path.join(rootPath, 'src/components');
  const pkgInfo = fs.readJSONSync(path.join(rootPath, 'package.json'));
  const frameworkKind = framework || getFrameWorkKind(pkgInfo);
  const libInfo = [pkgInfo.name, '@', pkgInfo.version].join('');
  const viewComponents = glob.sync(`${componentPath}/**/api.ts`).map((tsPath) => {
    const componentConfig = genNaslComponentConfig({
      apiPath: tsPath,
      assetsPublicPath,
      rootPath,
      libInfo,
      framework,
    });

    return componentConfig;
  });

  return {
    name: pkgInfo.name,
    title: pkgInfo.title,
    description: pkgInfo.description,
    specVersion: '1.0.0',
    type: 'module',
    subType: 'extension',
    version: pkgInfo.version,
    frontends: [{
      concept: 'FrontendLibrary',
      name: 'pc',
      type: 'pc',
      frameworkKind,
      viewComponents,
      logics: [],
    }],
    externalDependencyMap: {
      npm: getPeerDependencies(pkgInfo),
    },
    summary: {
      name: pkgInfo.name,
      title: pkgInfo.title,
      version: pkgInfo.version,
      description: pkgInfo.description,
      frontends: [{
        type: 'pc',
        frameworkKind,
        viewComponents: viewComponents.map((item) => ({
          name: item.name,
          title: item.title,
        })),
        logics: [],
      }],
    },
    compilerInfoMap: {
      js: {
        prefix: 'extension',
      },
    },
    ideVersion: pkgInfo.lcapIdeVersion || '3.8',
  };
}
