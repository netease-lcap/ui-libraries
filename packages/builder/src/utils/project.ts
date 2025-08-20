import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import * as YAML from 'yaml';
import {
  getProjectInfo as getExtensionProjectMeta,
  getSourceSchema,
  getLcapUIComponentList,
  type ExtensionProjectInfo as ProjectMetaInfo,
  type ProjectLibUIInfo,
} from '../shared';

export { getExtensionProjectMeta, getSourceSchema, getLcapUIComponentList };

export type { ProjectMetaInfo, ProjectLibUIInfo };

export function getLcapConfig() {
  const lcapConfigPath = path.resolve(os.homedir(), '.lcaprc');

  if (!fs.existsSync(lcapConfigPath)) {
    return null;
  }

  const yaml = fs.readFileSync(lcapConfigPath, 'utf-8');
  const config = YAML.parse(yaml);

  return config;
}

export function updateLcapConfg(config) {
  const lcapConfig = getLcapConfig();
  Object.keys(config).forEach((key) => {
    if (lcapConfig[key]) {
      lcapConfig[key] = config[key];
    }
  });

  const yaml = YAML.stringify(lcapConfig);
  fs.writeFileSync(path.resolve(os.homedir(), '.lcaprc'), yaml);
}

export function updatePackageInfo(rootPath: string, pkgInfo: any) {
  const pkgPath = path.resolve(rootPath, 'package.json');
  const pkg = fs.readJSONSync(pkgPath);
  Object.keys(pkgInfo).forEach((key) => {
    if (pkg[key]) {
      pkg[key] = pkgInfo[key];
    }
  });

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}
