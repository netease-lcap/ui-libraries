/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import genNaslComponentConfig, { processComponentConfigExtends } from './gen-nasl-component-config';
import { getComponentPathInfo } from '../../utils/component-path';
import logger from '../../utils/logger';

export interface GenNaslUIConfigProps {
  // cwd
  rootPath: string;
  framework?: string;
  assetsPublicPath?: string;
  components?: Array<{ group: string, title: string, name: string, [key: string]: any }>,
  dependency?: boolean;
}

export interface ParseOption {
  apiPath: string,
  extConfig: Record<string, any>;
}

export default async function genNaslUIConfig({
  rootPath,
  assetsPublicPath,
  components,
  framework,
}: GenNaslUIConfigProps): Promise<any[]> {
  const packageInfo = fs.readJSONSync(path.join(rootPath, 'package.json'));
  const libInfo = [packageInfo.name, '@', packageInfo.version].join('');

  const waitParseList: ParseOption[] = [];

  if (components && components.length > 0) {
    components.forEach((extConfig) => {
      const componentRootDir = packageInfo.name === '@lcap/mobile-ui' ? 'src-vusion/components' : 'src/components';
      const { componentDir } = getComponentPathInfo(extConfig.name, rootPath, componentRootDir);
      const apiPath = extConfig.apiPath ? path.join(rootPath, componentRootDir, extConfig.apiPath) : path.join(componentDir, 'api.ts');
      if (!fs.existsSync(apiPath)) {
        logger.error(`未找到组件 ${extConfig.name} 的描述文件（api.ts）`);
        return;
      }

      waitParseList.push({
        apiPath,
        extConfig,
      });
    });
  } else {
    glob.sync('src/**/api.ts', { cwd: rootPath, absolute: true }).forEach((apiPath) => {
      waitParseList.push({
        apiPath,
        extConfig: {},
      });
    });
  }

  const componentConfigs: any[] = [];

  for (const { apiPath, extConfig } of waitParseList) {
    const componentConfig = await genNaslComponentConfig({
      apiPath,
      assetsPublicPath: assetsPublicPath || '',
      rootPath,
      extraConfig: extConfig,
      libInfo,
      framework: framework as any,
    });

    const projectAssetPath = 'assets';
    if (componentConfig.icon && componentConfig.icon.indexOf('.') !== -1 && fs.existsSync(path.join(rootPath, projectAssetPath, componentConfig.icon))) {
      componentConfig.icon = `${assetsPublicPath}/${libInfo}/${projectAssetPath}/${componentConfig.icon}`;
    }

    if (componentConfig) {
      componentConfigs.push(componentConfig);
    }
  }

  processComponentConfigExtends(componentConfigs);

  return componentConfigs;
}
