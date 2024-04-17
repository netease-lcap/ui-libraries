import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import genNaslComponentConfig from './gen-nasl-component-config';
import genNaslLogicsConfig from './gen-nasl-logics-config';

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

function getFrontEndLibray(frameworkKind, viewComponents, logics) {
  const pcFeLibrary: any = {
    concept: 'FrontendLibrary',
    name: 'pc',
    type: 'pc',
    frameworkKind,
    viewComponents: [],
    logics: [],
  };

  const mobileFeLibrary: any = {
    concept: 'FrontendLibrary',
    name: 'h5',
    type: 'h5',
    frameworkKind,
    viewComponents: [],
    logics: [],
  };

  viewComponents.forEach((c) => {
    const typeKind = ['both', 'pc', 'h5'].indexOf(c.type) !== -1 ? c.type : 'pc';
    if (typeKind === 'pc') {
      pcFeLibrary.viewComponents.push(c);
    } else if (typeKind === 'h5') {
      mobileFeLibrary.viewComponents.push(c);
    } else {
      pcFeLibrary.viewComponents.push(c);
      mobileFeLibrary.viewComponents.push(c);
    }
  });

  logics.forEach((c) => {
    const typeKind = ['both', 'pc', 'h5'].indexOf(c.type) !== -1 ? c.type : 'pc';
    if (typeKind === 'pc') {
      pcFeLibrary.logics.push(c);
    } else if (typeKind === 'h5') {
      mobileFeLibrary.logics.push(c);
    } else {
      pcFeLibrary.logics.push(c);
      mobileFeLibrary.logics.push(c);
    }
  });

  return [pcFeLibrary, mobileFeLibrary].filter((library) => {
    return library.viewComponents.length > 0 || library.logics.length > 0;
  });
}

export default async function getNaslExtensionConfig({
  rootPath,
  assetsPublicPath,
  framework,
}: GenNaslExtensionConfigProps) {
  const componentPath = 'src/components';
  const pkgInfo = fs.readJSONSync(path.join(rootPath, 'package.json'));
  const frameworkKind = framework || getFrameWorkKind(pkgInfo);
  const libInfo = [pkgInfo.name, '@', pkgInfo.version].join('');
  const viewComponents = glob.sync(`${componentPath}/**/api.ts`, { cwd: rootPath, absolute: true }).map((tsPath) => {
    const componentConfig = genNaslComponentConfig({
      apiPath: tsPath,
      assetsPublicPath,
      rootPath,
      libInfo,
      framework,
    });

    return componentConfig;
  });
  const logics = await genNaslLogicsConfig(rootPath);
  const feLibraries = getFrontEndLibray(frameworkKind, viewComponents, logics);

  return {
    name: pkgInfo.name,
    title: pkgInfo.title,
    description: pkgInfo.description,
    specVersion: '1.0.0',
    type: 'module',
    subType: 'extension',
    version: pkgInfo.version,
    frontends: feLibraries,
    externalDependencyMap: {
      npm: getPeerDependencies(pkgInfo),
    },
    summary: {
      name: pkgInfo.name,
      title: pkgInfo.title,
      version: pkgInfo.version,
      description: pkgInfo.description,
      frontends: feLibraries.map((library) => ({
        type: library.type,
        frameworkKind,
        viewComponents: library.viewComponents.map((item: any) => ({
          name: item.name,
          title: item.title,
        })),
        logics: library.logics.map((item: any) => ({
          name: item.name,
          description: item.title || item.description || item.name,
        })),
      })),
    },
    compilerInfoMap: {
      js: {
        prefix: 'extension',
      },
    },
    ideVersion: pkgInfo.lcapIdeVersion || '3.8',
  };
}
