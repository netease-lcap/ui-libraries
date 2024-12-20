import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';
import archiver from 'archiver';
import { getPackName } from '../utils';
import logger from '../utils/logger';
import genNaslExtensionConfig from './gens/gen-nasl-extension-config';
import genManifestConfig from './gens/gen-manifest-config';
import type { BuildMode, LcapBuildOptions } from './types';
import { execSync } from '../utils/exec';
import { buildTheme } from './build-theme';
import buildCSSInfo from './build-css-info';
import buildDeclaration from './build-declaration';

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
    .concat(['manifest', 'source.zip']);

  if (fs.existsSync(path.resolve(root, 'nasl.extension.d.ts'))) {
    fileList.push('nasl.extension.d.ts');
  }

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

function getIgnores(root) {
  const filePath = path.resolve(root, '.gitignore');
  let ignores: string[] = ['node_modules', '.lcap'];
  if (fs.existsSync(filePath)) {
    ignores = fs.readFileSync(filePath).toString().split('\n').filter((v) => !!v.trim() && !v.startsWith('#'));
  }

  return ignores;
}

async function buildSourceZip(root) {
  const ignores = getIgnores(root);
  const files = await glob(['**/*'], {
    cwd: root,
    absolute: false,
    ignore: ignores,
    dot: true,
  });
  await zipDir(root, 'source.zip', files);
}

export async function buildNaslExtensionConfig(options: LcapBuildOptions) {
  logger.start('开始生成 nasl.extension.json...');
  const { config: naslExtensionConfig, viewComponents } = await genNaslExtensionConfig({
    assetsPublicPath: options.assetsPublicPath,
    rootPath: options.rootPath,
    framework: options.framework,
    i18n: options.i18n,
    frameworkUI: options.frameworkUI,
  });

  const naslConfigPath = path.join(options.rootPath, 'nasl.extension.json');
  fs.writeJSONSync(naslConfigPath, naslExtensionConfig, { spaces: 2 });
  logger.success('生成 nasl.extension.json 成功！');

  return {
    naslExtensionConfig,
    viewComponents,
  };
}

export async function buildNaslExtensionManifest(options: LcapBuildOptions, hash: boolean = false) {
  const naslConfigPath = path.join(options.rootPath, 'nasl.extension.json');
  const naslExtensionConfig = fs.readJSONSync(naslConfigPath) as any;
  const manifest = await genManifestConfig(options);
  naslExtensionConfig.compilerInfoMap.manifest = JSON.stringify(manifest);
  // if (hash) {
  //   const contentHash = getHashDigest(JSON.stringify(naslExtensionConfig), 'md5', 'base64', 16);
  //   naslExtensionConfig.compilerInfoMap.debug = JSON.stringify({ hash: contentHash });
  // }
  fs.writeJSONSync(naslConfigPath, { ...naslExtensionConfig }, { spaces: 2 });
}

export async function buildNaslExtension(options: LcapBuildOptions, mode: BuildMode = 'production') {
  if (options.type !== 'extension') {
    return;
  }

  if (mode === 'production') {
    await buildSourceZip(options.rootPath);
  }

  await buildNaslExtensionConfig(options);
  await buildCSSInfo(options);
  await buildTheme(options, mode === 'watch');
  await buildDeclaration(options);
  await buildNaslExtensionManifest(options, mode === 'watch');

  if (mode !== 'production') {
    return;
  }

  if (options.pnpm) {
    execSync('pnpm pack');
  } else {
    execSync('npm pack');
  }

  zipExtension(options.rootPath, options.destDir);
}
