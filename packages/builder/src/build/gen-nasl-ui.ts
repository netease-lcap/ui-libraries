import path from 'path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import genNaslComponentConfig from './gen-nasl-component-config';
import { getComponentPathInfo } from '../utils/component-path';
import logger from '../utils/logger';

export interface GenNaslUIConfigProps {
  // cwd
  rootPath: string;
  framework?: string;
  assetsPublicPath?: string;
  components?: Array<{ group: string, title: string, name: string, [key: string]: any }>,
}

export default function genNaslUIConfig({
  rootPath,
  assetsPublicPath,
  components,
  framework,
}: GenNaslUIConfigProps): any[] {
  const packageInfo = fs.readJSONSync(path.join(rootPath, 'package.json'));
  const libInfo = [packageInfo.name, '@', packageInfo.version].join('');

  const waitParseList: any[] = [];

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
    glob.sync(`${rootPath}/**/api.ts`).forEach((apiPath) => {
      waitParseList.push({
        apiPath,
        extConfig: {},
      });
    });
  }

  const componentConfigs: any[] = [];

  waitParseList.forEach(({ apiPath, extConfig }) => {
    const componentConfig = genNaslComponentConfig({
      apiPath,
      assetsPublicPath,
      rootPath,
      extraConfig: extConfig,
      libInfo,
      framework,
      components: componentConfigs,
    });

    if (componentConfig) {
      componentConfigs.push(componentConfig);
    }
  });

  return componentConfigs;
}
