import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';
import archiver from 'archiver';
import { getPackName } from '../utils';
import logger from '../utils/logger';
import genNaslExtensionConfig from './gens/gen-nasl-extension-config';
import genManifestConfig from './gens/gen-manifest-config';
import type { LcapBuildOptions } from './types';
import { execSync } from '../utils/exec';
import { buildTheme } from './build-theme';
import buildDecalaration from './build-declaration';

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
  const { config: naslExtensionConfig, viewComponents } = await genNaslExtensionConfig({
    assetsPublicPath: options.assetsPublicPath,
    rootPath: options.rootPath,
    framework: options.framework,
    i18n: options.i18n,
  });

  const naslConfigPath = path.join(options.rootPath, 'nasl.extension.json');
  fs.writeJSONSync(naslConfigPath, naslExtensionConfig, { spaces: 2 });
  logger.success('生成 nasl.extension.json 成功！');

  await buildTheme({
    ...options,
    components: viewComponents.map(({
      name, kebabName,
      group, title, children,
      show,
    }) => {
      return {
        name: options.framework.startsWith('vue') ? kebabName : name,
        group,
        title,
        show,
        children: children.map((child) => (options.framework.startsWith('vue') ? child.kebabName : child.name)),
      };
    }),
  });

  await buildDecalaration(options);
  if (options.pnpm) {
    execSync('pnpm pack');
  } else {
    execSync('npm pack');
  }

  const manifest = genManifestConfig(options);
  (naslExtensionConfig.compilerInfoMap as any).manifest = JSON.stringify(manifest);
  fs.writeJSONSync(naslConfigPath, { ...naslExtensionConfig }, { spaces: 2 });
  zipExtension(options.rootPath, options.destDir);
}
