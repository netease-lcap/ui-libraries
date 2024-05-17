import fs from 'fs-extra';
import glob from 'fast-glob';
import archiver from 'archiver';
import path from 'path';
import genThemeConfig from './gen-theme-config';
import { buildTheme as viteBuildTheme } from './vite-build-theme';
import logger from '../utils/logger';
import { execSync } from '../utils/exec';
import genNaslUIConfig from './gen-nasl-ui';
import genNaslExtensionConfig from './gen-nasl-extension-config';
import genThemeJsonOld from './gen-theme-json-old';
import { BuildIdeOptions, buildIde as viteBuildIde } from './vite-build-ide';
import genManifestConfig from './gen-manifest-config';
import { getPackName } from '../utils';

export interface LcapThemeOptions {
  themeVarCssPath?: string;
  themeComponentFolder?: string;
  useOldCssVarParser?: boolean;
  previewPages?: Array<{ name: string; title: string; viewport?: { width: number; height: number } }>;
}

export interface LcapBuildOptions {
  rootPath: string;
  type: 'extension' | 'nasl.ui';
  framework: 'react' | 'vue2' | 'taro' | 'vue3',
  assetsPublicPath?: string;
  components?: Array<{ group: string, title: string, name: string, [key: string]: any }>,
  i18n?: boolean | {[lang: string]: string}
  theme: LcapThemeOptions,
  ide?: BuildIdeOptions,
  destDir: string;
}

export async function buildIDE(options: LcapBuildOptions) {
  if (!options.ide) {
    return;
  }

  // eslint-disable-next-line prefer-object-spread
  const ideOptions: BuildIdeOptions = Object.assign(
    {
      entry: 'ide/index',
      outDir: 'dist-theme/ide',
    },
    options.ide,
  );

  await viteBuildIde(ideOptions, options.rootPath);
}

export function buildThemeOld(rootPath, destDir) {
  const configPath = path.join(rootPath, './lcap-ui.config.js');
  const themeConfigPath = path.join(rootPath, './lcap-ui.theme.json');

  if (!fs.existsSync(configPath) || !fs.existsSync(themeConfigPath)) {
    return;
  }

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const confg = require(configPath);

  genThemeJsonOld({
    rootPath,
    destPath: destDir,
    themePath: confg.themePath,
    themeConfigPath: 'lcap-ui.theme.json',
  });
}

export async function buildTheme(options: LcapBuildOptions) {
  const themeConfig = genThemeConfig({
    components: options.components || [],
    themeVarCssPath: options.theme.themeVarCssPath || '',
    themeComponentFolder: options.theme.themeComponentFolder || '',
    previewPages: options.theme.previewPages || [],
    useOldCssVarParser: options.theme.useOldCssVarParser,
    type: options.type,
  });

  if (!themeConfig || !themeConfig.components || themeConfig.components.length === 0) {
    return;
  }

  logger.start('开始构建 theme');
  await fs.writeJSON(`${options.destDir}/theme.config.json`, themeConfig, { spaces: 2 });
  logger.success('生成 theme.config.json 成功！');

  await viteBuildTheme(themeConfig);
  logger.success('构建theme 成功');
}

export function buildNaslUI(options: LcapBuildOptions) {
  if (options.type !== 'nasl.ui') {
    return;
  }

  logger.start('开始生成 nasl.ui.json...');
  const naslUIConfig = genNaslUIConfig({
    rootPath: options.rootPath,
    framework: options.framework,
    components: options.components,
    assetsPublicPath: options.assetsPublicPath,
  });

  options.components = naslUIConfig.map(({
    name, kebabName, group, title, children,
  }) => {
    return {
      name: options.framework.startsWith('vue') ? kebabName : name,
      group,
      title,
      children: children.map((child) => (options.framework.startsWith('vue') ? child.kebabName : child.name)),
    };
  });

  logger.success('生成 nasl.ui.json 成功！');
  fs.writeJSONSync(`${options.destDir}/nasl.ui.json`, naslUIConfig, { spaces: 2 });
}

export function buildI18N(options: LcapBuildOptions) {
  const {
    rootPath,
    i18n,
  } = options;

  if (!i18n) {
    return;
  }

  const langs = Object.keys(i18n);
  if (!langs || langs.length === 0) {
    logger.warn('未找到i18n 配置文件');
    return;
  }

  const data = {};

  langs.forEach((key) => {
    data[key] = fs.readJSONSync(path.join(rootPath, i18n[key]));
  });

  const destDir = path.join(rootPath, options.destDir);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destFile = `${destDir}/i18n.json`;
  fs.writeJSONSync(destFile, data, { spaces: 2 });
}

export function buildManifest(options: LcapBuildOptions) {
  const manifest = genManifestConfig(options);
  fs.writeJSONSync(`${options.destDir}/manifest.json`, manifest, { spaces: 2 });
}

const zipDir = (basePath, fileName = 'client.zip', files: string[] = []) => new Promise((res) => {
  const zipPath = path.resolve(basePath, fileName);
  const output = fs.createWriteStream(zipPath);// 将压缩包保存到当前项目的目录下，并且压缩包名为test.zip
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(output);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < files.length; i++) {
    if (fs.existsSync(files[i])) {
      // 将被打包文件的流添加进archiver对象中
      archive.append(fs.createReadStream(files[i]), { name: files[i] });
    }
  }
  archive.finalize();
  archive.on('end', () => {
    res(zipPath);
  });
});

function getPath(filePath, pkg) {
  const resultPath = `packages/extension/${pkg.name}@${pkg.version}/${filePath}`;
  return resultPath;
}

async function zipExtension(root, destDir) {
  const dirList: string[] = ['nasl.extension.json'];
  const fileList = glob.sync(`${destDir}/**/*`)
    .filter((item) => item.indexOf('.') !== -1)
    .concat(['nasl.extension.d.ts', 'manifest']);

  const zipList = dirList.concat(fileList);
  const pkg = fs.readJSONSync(path.resolve(root, 'package.json'));
  const manifestData = {
    'Plugin-Version': '1.0.0',
    'Library-Type': 'Frontend',
    'Metadata-File': 'nasl.extension.json',
    Tag: pkg.keywords.filter((v) => ['Lcap', 'library'].indexOf(v) === -1).join(','),
  };

  fileList.forEach((filePath) => {
    manifestData[getPath(filePath, pkg)] = filePath;
  });

  const filePathList: string[] = [];
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const i in manifestData) {
    filePathList.push(`${i}: ${manifestData[i]}`);
  }

  const packName = getPackName(pkg.name, pkg.version);
  const packPath = path.resolve(root, packName);
  const zipName = 'zip.tgz';
  const zipTgzPath = path.resolve(root, zipName);
  if (fs.existsSync(packPath)) {
    fs.copyFileSync(packPath, zipTgzPath);
    filePathList.push(`${getPath(zipName, pkg)}: ${zipName}`);
    zipList.push(zipName);
  }

  const assets = await glob(['assets/**/*', 'src/**/screenshots/*', 'src/**/drawings/*'], { cwd: root });

  assets.forEach((assetPath) => {
    filePathList.push(`${getPath(assetPath, pkg)}: ${assetPath}`);
    zipList.push(assetPath);
  });

  fs.writeFileSync(path.resolve(root, 'manifest'), filePathList.join('\n'));

  await zipDir(root, `${pkg.name}@${pkg.version}.zip`, zipList);

  if (fs.existsSync(zipTgzPath)) {
    fs.unlinkSync(zipTgzPath);
    fs.unlinkSync(packPath);
  }
}

export async function buildNaslExtension(options: LcapBuildOptions) {
  if (options.type !== 'extension') {
    return;
  }

  logger.start('开始生成 nasl.extension.json...');
  const naslExtensionConfig: any = await genNaslExtensionConfig({
    assetsPublicPath: options.assetsPublicPath,
    rootPath: options.rootPath,
    framework: options.framework,
    i18n: options.i18n,
  });
  logger.success('生成 nasl.extension.json 成功！');
  const naslConfigPath = path.join(options.rootPath, 'nasl.extension.json');
  fs.writeJSONSync(naslConfigPath, naslExtensionConfig, { spaces: 2 });
  execSync('npx tsc -p tsconfig.api.json && npm pack');

  const manifest = genManifestConfig(options);
  naslExtensionConfig.compilerInfoMap.manifest = JSON.stringify(manifest);
  fs.writeJSONSync(naslConfigPath, { ...naslExtensionConfig }, { spaces: 2 });
  zipExtension(options.rootPath, options.destDir);
}

export async function buildNaslUILibrary(options: LcapBuildOptions) {
  buildNaslUI(options);
  await buildTheme(options);
  buildI18N(options);
  execSync('npx tsc -p tsconfig.api.json && npm pack');
  buildManifest(options);
}

export async function lcapBuild(options: LcapBuildOptions) {
  if (!options.destDir) {
    options.destDir = 'dist-theme';
  }

  await buildIDE(options);

  if (options.type === 'extension') {
    await buildNaslExtension(options);
    return;
  }

  await buildNaslUILibrary(options);
}
