import {
  Alias, normalizePath, type Plugin, type UserConfig,
} from 'vite';
import fs from 'fs-extra';
import path from 'path';
import { parseImports } from 'parse-imports';
import MagicString from 'magic-string';
import { isNil } from 'lodash';
import {
  LCAP_UI_JSON_PATH,
  LCAP_UI_PACKAGE_CSS_NAME,
  LCAP_UI_PACKAGE_NAME,
  LCAP_UI_PACKAGE_PATH,
} from '../overload/constants';
import { PKG } from '../constants/config-file-names';

export interface LcapUseNaslUIPluginOptions {
  framework: string;
  destDir?: string;
  type: 'nasl.ui' | 'extension';
  rootPath: string;
}

function getLcapUIPkgName(rootPath) {
  const pkgPath = path.resolve(rootPath, LCAP_UI_PACKAGE_PATH, PKG);
  if (fs.existsSync(pkgPath)) {
    const pkg = fs.readJSONSync(pkgPath);
    return pkg.name;
  }

  return '';
}

function addResolve(config: UserConfig, options: LcapUseNaslUIPluginOptions, useModules: boolean) {
  if (!config.resolve) {
    config.resolve = {
      alias: [] as Alias[],
    };
  } else if (!config.resolve.alias) {
    config.resolve.alias = [] as Alias[];
  }

  if (typeof config.resolve.alias === 'object' && !Array.isArray(config.resolve.alias)) {
    const alias: Alias[] = [];
    const aliasMap = config.resolve.alias as { [find: string]: string };
    Object.keys(aliasMap).forEach((k) => {
      alias.push({
        find: k,
        replacement: aliasMap[k],
      });
    });
    config.resolve.alias = alias;
  }

  const alias: Alias[] = config.resolve.alias as Alias[];
  if (!useModules) {
    alias.push({
      find: LCAP_UI_PACKAGE_NAME,
      replacement: path.resolve(options.rootPath, './.lcap/lcap-ui/runtime/index.js'),
    });
  }

  alias.push({
    find: LCAP_UI_PACKAGE_CSS_NAME,
    replacement: path.resolve(options.rootPath, './.lcap/lcap-ui/runtime/index.css'),
  });
}

function getCommonjsOptionsInclude(config: UserConfig): Array<string | RegExp> {
  if (!config.build || !config.build.commonjsOptions || !config.build.commonjsOptions.include) {
    return [];
  }

  if (!Array.isArray(config.build.commonjsOptions.include)) {
    return [config.build.commonjsOptions.include] as any[];
  }

  return config.build.commonjsOptions.include;
}

function setExtenalBuildConfig(config: UserConfig, options: LcapUseNaslUIPluginOptions, { lcapUIPkgName, command }) {
  if (!config.build) {
    config.build = {};
  }

  if (!config.build.rollupOptions) {
    config.build.rollupOptions = {};
  }

  if (!config.optimizeDeps) {
    config.optimizeDeps = {
      include: [],
    };
  } else if (!config.optimizeDeps.include) {
    config.optimizeDeps.include = [];
  }

  config.build.commonjsOptions = {
    ...(config.build.commonjsOptions || {}),
  };

  config.optimizeDeps.include?.push('virtual-lcap:lcap-ui');
  if (config.build.commonjsOptions.requireReturnsDefault === undefined) {
    config.build.commonjsOptions.requireReturnsDefault = (id) => {
      return id.indexOf('vue/dist/vue.esm.js') !== -1;
    };
  } else if (typeof config.build.commonjsOptions.requireReturnsDefault === 'function') {
    const temp = config.build.commonjsOptions.requireReturnsDefault;
    config.build.commonjsOptions.requireReturnsDefault = (id) => {
      if (id.indexOf('vue/dist/vue.esm.js') !== -1) {
        return true;
      }
      return temp(id);
    };
  }
  config.build.commonjsOptions.include = getCommonjsOptionsInclude(config).concat([
    '.lcap/lcap-ui/**/*.js',
    /node_modules/,
  ]);

  if (!config.build.rollupOptions.external) {
    config.build.rollupOptions.external = [];
  }

  // 非库构建不处理默认参数；
  if (!config.build.lib && config.build.rollupOptions && config.build.rollupOptions.input) {
    return;
  }

  const globals = (config.build.rollupOptions.output as any).globals as Record<string, any> || {};

  if (lcapUIPkgName) {
    (config.build.rollupOptions.external as any).push(lcapUIPkgName);
    globals[lcapUIPkgName] = options.framework === 'react' ? 'antd' : 'LcapUI';
    const alias = (config.resolve && config.resolve.alias ? config.resolve.alias : []) as Alias[];
    const alia = alias.find((it) => it.find === LCAP_UI_PACKAGE_NAME);
    if (alia && command === 'build') {
      alia.replacement = lcapUIPkgName;
    }
  }
}

export interface ModulesInfo {
  exports: Record<string, { src: string, isDefault: boolean }>;
  api: Record<string, string>;
}

async function transformImportCode(code: string, exportsMap: ModulesInfo['exports'], genURL: (src: string) => string) {
  const imports = [...(await parseImports(code))].filter((sp) => sp.moduleSpecifier.value === LCAP_UI_PACKAGE_NAME);

  if (imports.length === 0) {
    return undefined;
  }

  const s = new MagicString(code);

  imports.forEach((sp) => {
    if (!sp.importClause) {
      return;
    }
    const codes: string[] = [];
    if (sp.importClause.namespace) {
      const arr: Array<[string, string]> = [];
      Object.keys(exportsMap).forEach((name) => {
        const { src, isDefault } = exportsMap[name];
        const key = `${sp.importClause?.namespace}_${name}`;
        arr.push([name, key]);
        codes.push(`import { ${isDefault ? 'default' : name} as ${key} } from '${genURL(src)}'`);
      });

      codes.push(`const ${sp.importClause.namespace} = { ${arr.map(([name, val]) => `${name}: ${val}`).join(', ')} }`);
    }

    if (sp.importClause.default && exportsMap.default) {
      codes.push(`import { default as ${sp.importClause.default} } from '${genURL(exportsMap.default.src)}'`);
    }

    if (sp.importClause.named) {
      sp.importClause.named.forEach(({ specifier, binding }) => {
        const { src, isDefault } = exportsMap[specifier] || {};
        if (!src) {
          return;
        }

        codes.push(`import { ${isDefault ? 'default' : specifier} as ${binding} } from '${genURL(src)}'`);
      });
    }

    if (codes.length === 0) {
      return;
    }

    s.overwrite(sp.startIndex, sp.endIndex, codes.join('\n'));
  });

  return {
    code: s.toString(),
    get map() {
      return s.generateMap({ hires: true, includeContent: true });
    },
  };
}

export default function lcapUseNaslUI(options: LcapUseNaslUIPluginOptions) {
  const lcapUIConfigPath = path.resolve(options.rootPath, LCAP_UI_JSON_PATH);
  const installedLcapUI = fs.existsSync(lcapUIConfigPath);
  if (options.type === 'nasl.ui' || !installedLcapUI) {
    return [];
  }

  const lcapUIConfig = fs.readJSONSync(lcapUIConfigPath);
  const modulesInfoPath = path.resolve(options.rootPath, LCAP_UI_PACKAGE_PATH, lcapUIConfig.modules || 'es/modules.json');
  let modulesInfo: ModulesInfo | null = null;
  if (fs.existsSync(modulesInfoPath)) {
    modulesInfo = fs.readJSONSync(modulesInfoPath);
  }

  const useModules = !isNil(modulesInfo) && modulesInfo.exports && Object.keys(modulesInfo.exports).length > 0;
  const lcapUIPkgName = getLcapUIPkgName(options.rootPath);

  function generateModulePath(src: string) {
    return normalizePath(path.resolve(modulesInfoPath, '../', src));
  }

  return [{
    name: 'vite:lcap-use-nasl-ui',
    enforce: 'post',
    resolveId(id) {
      if (id === LCAP_UI_PACKAGE_NAME && useModules) {
        return generateModulePath('index.mjs');
      }

      return undefined;
    },
    transform(code) {
      if (!useModules || !modulesInfo || !modulesInfo.exports) {
        return undefined;
      }

      return transformImportCode(code, modulesInfo.exports, generateModulePath);
    },
    config(config: UserConfig, { command }) {
      addResolve(config, options, useModules);
      if (!useModules) {
        setExtenalBuildConfig(config, options, { command, lcapUIPkgName });
      }
    },
  }] as Plugin[];
}
