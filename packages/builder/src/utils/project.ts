import fs from 'fs-extra';
import path from 'path';

function getFrameWorkKind(pkgInfo, rootPath) {
  if (!pkgInfo) {
    pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'));
  }

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
}

export interface ProjectMetaInfo {
  framework: 'vue2' | 'react' | 'vue3' | 'taro';
  name: string;
  version: string;
}

export function getExtensionProjectMeta(rootPath: string) {
  const pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'));
  const framework = getFrameWorkKind(pkgInfo, rootPath);

  return {
    framework,
    name: pkgInfo.name,
    version: pkgInfo.version,
  } as ProjectMetaInfo;
}
