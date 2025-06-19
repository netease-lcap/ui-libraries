import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';
import { normalizePath } from 'vite';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generator from '@babel/generator';
import * as babelTypes from '@babel/types';
import { OverloadComponentContext } from './context';
import { LCAP_UI_PACKAGE_PATH, LCAP_UI_PACKAGE_NAME } from './constants';
import { getPath } from '../utils/fs';
import logger from '../utils/logger';

const suffixes = ['.js', '.jsx', '.ts', '.tsx'];

function isExist(filePath: string) {
  return ['', ...suffixes].some((suffix) => {
    const fullPath = filePath + suffix;
    return fs.existsSync(fullPath) && !fs.lstatSync(fullPath).isDirectory();
  });
}

function changeNodeSource(node: babelTypes.ImportDeclaration | babelTypes.ExportNamedDeclaration | babelTypes.ExportAllDeclaration, filePath: string, modules: string[]) {
  if (!node.source) {
    return;
  }

  let sourcePath = node.source.value;
  if (sourcePath.startsWith('./') && sourcePath.lastIndexOf('/') === 1) {
    const resolvePath = path.resolve(filePath.substring(0, filePath.lastIndexOf('/')), sourcePath);
    if (isExist(resolvePath)) {
      return;
    }
  }

  if (sourcePath.startsWith('@components')) {
    sourcePath = sourcePath.replace('@components', '@lcap-ui/src/components');
  } else if (sourcePath.startsWith('cloud-ui.vusion/src')) {
    sourcePath = sourcePath.replace('cloud-ui.vusion/src', '@lcap-ui/cloudui');
  } else if (sourcePath.startsWith('@/')) {
    const srcVusion = fs.existsSync('.lcap/lcap-ui/src-vusion');
    sourcePath = sourcePath.replace('@', srcVusion ? '@lcap-ui/src-vusion' : '@lcap-ui/src');
  } else if (sourcePath.startsWith('../') || sourcePath.startsWith('./')) {
    const lastFolderPath = filePath.substring(0, filePath.lastIndexOf('/'));
    sourcePath = normalizePath(path.resolve(lastFolderPath, sourcePath).replace(path.resolve(process.cwd(), LCAP_UI_PACKAGE_PATH), '@lcap-ui'));
  } else if (modules.indexOf(sourcePath) === -1) {
    modules.push(sourcePath);
  }
  node.source.value = sourcePath;
}

function transformScriptAst(ast: babelTypes.File, filePath, modules: string[]) {
  let isJSX = false;
  traverse(ast, {
    JSXElement(p) {
      isJSX = true;
      p.skip();
    },
    ExportNamedDeclaration(p) {
      changeNodeSource(p.node, filePath, modules);
    },
    ExportAllDeclaration(p) {
      changeNodeSource(p.node, filePath, modules);
    },
    ImportDeclaration(p) {
      changeNodeSource(p.node, filePath, modules);
    },
  });

  return {
    isJSX,
  };
}

function transformCssCode(code: string, filePath: string) {
  const codes = code.split('\n').map((str) => {
    if (!str || !str.trim().startsWith('@import') || !str.trim().endsWith(';')) {
      return str;
    }
    let startIndex = str.indexOf("'") + 1;
    let endIndex = str.lastIndexOf("'");
    if (startIndex === 0) {
      startIndex = str.indexOf('"') + 1;
      endIndex = str.lastIndexOf('"');
    }

    if (startIndex === 0 || startIndex === endIndex) {
      return str;
    }

    const prefixStr = str.substring(0, startIndex);
    const suffixStr = str.substring(endIndex);
    let sourcePath = str.substring(startIndex, endIndex);

    if (sourcePath.startsWith('./') && sourcePath.lastIndexOf('/') === 1) {
      return str;
    }

    if (sourcePath.startsWith('../') || sourcePath.startsWith('./')) {
      const lastFolderPath = filePath.substring(0, filePath.lastIndexOf('/'));
      sourcePath = normalizePath(path.resolve(lastFolderPath, sourcePath).replace(path.resolve(process.cwd(), LCAP_UI_PACKAGE_PATH), '@lcap-ui'));

      prefixStr.replace('url(', '');
      suffixStr.replace(')', '');
    }

    return [prefixStr, sourcePath, suffixStr].join('');
  });
  return codes.join('\n');
}

function saveScriptFile(filePath: string, context: OverloadComponentContext, modules: string[]) {
  const code = fs.readFileSync(filePath).toString();
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const ext = path.extname(filePath);
  const basename = path.basename(filePath, ext);
  const { isJSX } = transformScriptAst(ast, filePath, modules);
  let resultPath = path.resolve(context.componentFolderPath, `${basename}${ext}`);

  // js 转 jsx
  if (isJSX && !ext.endsWith('sx')) {
    resultPath = path.resolve(context.componentFolderPath, `${basename}${ext}x`);
  }
  fs.writeFileSync(resultPath, generator(ast, { }).code);
}

function parseVueFile(code: string) {
  const result = {
    scriptTag: '',
    styleTag: '',
    templateCodes: [] as string[],
    scriptCodes: [] as string[],
    styleCodes: [] as string[],
  };

  let currentScope: 'template' | 'script' | 'style' | '' = '';
  code.split('\n').forEach((line) => {
    if (line.trim().startsWith('<template') && currentScope !== 'template' && result.templateCodes.length === 0) {
      currentScope = 'template';
      result.templateCodes.push(line);
      return;
    }

    if (line.trim().startsWith('<style') && !result.styleTag) {
      currentScope = 'style';
      result.styleTag = line;
      return;
    }

    if (line.trim().startsWith('<script') && !result.scriptTag) {
      currentScope = 'script';
      result.scriptTag = line;
      return;
    }

    if (line.trim().startsWith('</style>') || line.trim().startsWith('</script>')) {
      currentScope = '';
      return;
    }

    switch (currentScope) {
      case 'template':
        result.templateCodes.push(line);
        break;
      case 'script':
        result.scriptCodes.push(line);
        break;
      case 'style':
        result.styleCodes.push(line);
        break;
      default: break;
    }
  });

  return result;
}

function saveVueFile(filePath: string, context: OverloadComponentContext, modules: string[]) {
  const code = fs.readFileSync(filePath).toString();
  const result = parseVueFile(code);
  let scriptCode = '';
  if (result.scriptCodes.length > 0) {
    const ast = parser.parse(result.scriptCodes.join('\n'), {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });

    transformScriptAst(ast, filePath, modules);
    scriptCode = generator(ast).code;
  }
  const resultCodes: string[] = [];
  if (result.templateCodes.length > 0) {
    resultCodes.push(...result.templateCodes);
  }

  if (result.scriptTag) {
    resultCodes.push(
      result.scriptTag,
      scriptCode,
      '</script>',
    );
  }

  if (result.styleTag) {
    resultCodes.push(
      result.styleTag,
      transformCssCode(result.styleCodes.join('\n'), filePath),
      result.styleTag.trim().endsWith('</style>') ? '' : '</style>',
    );
  }
  const basename = path.basename(filePath);
  const resultPath = path.resolve(context.componentFolderPath, basename);
  fs.writeFileSync(resultPath, resultCodes.join('\n'));
}

function saveCssFile(filePath: string, context: OverloadComponentContext) {
  const basename = path.basename(filePath);
  const resultPath = path.resolve(context.componentFolderPath, basename);
  const code = fs.readFileSync(filePath, 'utf-8').toString();
  fs.writeFileSync(resultPath, transformCssCode(code, filePath), 'utf-8');
}

function addDependices() {
  const rootPath = process.cwd();
  const sourcePkg = fs.readJSONSync(path.resolve(rootPath, LCAP_UI_PACKAGE_PATH, 'package.json'));
  const pkgPath = path.resolve(rootPath, 'package.json');
  const pkg = fs.readJSONSync(pkgPath);

  if (!pkg.dependencies) {
    pkg.dependencies = {};
  }

  let changed = false;
  Object.keys(sourcePkg.dependencies || {}).forEach((name) => {
    if (pkg.dependencies[name]) {
      return;
    }

    changed = true;
    pkg.dependencies[name] = sourcePkg.dependencies[name];
  });

  if (changed) {
    fs.writeJSONSync(pkgPath, pkg, { spaces: 2 });
  }
}

function addSubExports(context: OverloadComponentContext) {
  const indexPath = getPath(path.resolve(context.componentFolderPath, './index'));
  const needExportNames = context.replaceNames.filter((name) => context.replaceNameMap[name] && context.replaceNameMap[name] !== context.name);
  if (!indexPath || needExportNames.length === 0) {
    return;
  }

  try {
    const code = fs.readFileSync(indexPath, 'utf-8').toString();
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });

    traverse(ast, {
      ExportSpecifier(p) {
        if (p.node.exported.type === 'Identifier' && needExportNames.includes(p.node.exported.name)) {
          // p.node.exported.name = context.replaceNameMap[p.node.exported.name];
          const exportPath = p.findParent((n) => n.isExportNamedDeclaration());

          // 如果存在 exportPath 且 exportPath 是 ExportNamedDeclaration 类型，则添加新的 ExportSpecifier
          if (exportPath && exportPath.node.type === 'ExportNamedDeclaration') {
            exportPath.node.specifiers.push({
              type: 'ExportSpecifier',
              local: p.node.local,
              exported: {
                ...p.node.exported,
                name: context.replaceNameMap[p.node.exported.name],
              },
            });
            needExportNames.splice(needExportNames.indexOf(p.node.exported.name), 1);
          }
        }
      },
    });

    let resultCode = generator(ast).code;

    if (needExportNames.length > 0) {
      resultCode = `${resultCode}\nexport { ${needExportNames.map((name) => `${name} as ${context.replaceNameMap[name]}`).join(', ')} } from '${LCAP_UI_PACKAGE_NAME}';\n`;
    }

    fs.writeFileSync(indexPath, resultCode, 'utf-8');
  } catch (e) {
    logger.warn(e);
  }
}

export async function forkComponent(context: OverloadComponentContext) {
  if (!context.fork) {
    return;
  }

  addDependices();

  const removeFiles = await glob('index.{jsx,js,ts,tsx,vue}', { cwd: context.componentFolderPath, absolute: true });
  removeFiles.forEach((filePath) => {
    fs.unlinkSync(filePath);
  });

  const files = await glob('*.{vue,jsx,js,ts,tsx,css}', { cwd: context.pkgComponentFolderPath, absolute: true, ignore: ['api.ts'] });
  const modules: string[] = [];
  files.forEach((filePath) => {
    const ext = path.extname(filePath);
    switch (ext) {
      case '.vue':
        saveVueFile(filePath, context, modules);
        break;
      case '.jsx':
      case '.js':
      case '.ts':
      case '.tsx':
        saveScriptFile(filePath, context, modules);
        break;
      case '.css':
        saveCssFile(filePath, context);
        break;
      default: break;
    }
  });

  addSubExports(context);
}
