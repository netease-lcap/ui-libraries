import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generator from '@babel/generator';
import * as babelTypes from '@babel/types';
import { OverloadComponentContext } from './context';
import { LCAP_UI_PACKAGE_PATH } from './constants';

function transformScriptAst(ast: babelTypes.File, filePath, modules: string[]) {
  let isJSX = false;
  traverse(ast, {
    JSXElement(p) {
      isJSX = true;
      p.skip();
    },
    ImportDeclaration(p) {
      let sourcePath = p.node.source.value;
      if (sourcePath.startsWith('./') && sourcePath.lastIndexOf('/') === 1) {
        return;
      }

      if (sourcePath.startsWith('@components')) {
        sourcePath = sourcePath.replace('@components', '@lcap-ui/src/components');
      } else if (sourcePath.startsWith('cloud-ui.vusion/src')) {
        sourcePath = sourcePath.replace('cloud-ui.vusion/src', '@lcap-ui/cloudui');
      } else if (sourcePath.startsWith('@/')) {
        const srcVusion = fs.existsSync('.lcap/lcap-ui/src-vusion');
        sourcePath = sourcePath.replace('@', srcVusion ? '@lcap-ui/src-vusion' : '@lcap-ui/src');
      } else if (sourcePath.startsWith('../')) {
        const lastFolderPath = filePath.substring(0, filePath.lastIndexOf('/'));
        sourcePath = path.resolve(lastFolderPath, sourcePath).replace(path.resolve(process.cwd(), LCAP_UI_PACKAGE_PATH), '@lcap-ui');
      } else if (modules.indexOf(sourcePath) === -1) {
        modules.push(sourcePath);
      }
      p.node.source.value = sourcePath;
    },
  });

  return {
    isJSX,
  };
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
      ...result.styleCodes,
      '</style>',
    );
  }
  const basename = path.basename(filePath);
  const resultPath = path.resolve(context.componentFolderPath, basename);
  fs.writeFileSync(resultPath, resultCodes.join('\n'));
}

function saveCssFile(filePath: string, context: OverloadComponentContext) {
  const basename = path.basename(filePath);
  const resultPath = path.resolve(context.componentFolderPath, basename);
  fs.copyFileSync(filePath, resultPath);
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

export async function forkComponent(context: OverloadComponentContext) {
  if (!context.fork) {
    return;
  }

  addDependices();

  const removeFiles = await glob('index.{jsx,js,ts,tsx}', { cwd: context.componentFolderPath, absolute: true });
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
}
