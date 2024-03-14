import { execSync } from 'child_process';
import { globSync } from 'glob';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const pkg = fs.readJSONSync('./package.json');
const version = process.env.LCAP_LIB_VERSION || argv.version || pkg.version;

const distDic = `lcap-ui@${version}`;

if (fs.existsSync(distDic)) {
  execSync(`rm -rf ${distDic}`);
  console.log(chalk.green(`删除文件夹 ${distDic} 成功！`));
}

fs.mkdirSync(`${distDic}`);
console.log(chalk.green(`新建空文件夹 ${distDic} 成功！`));

function copyFolder(sourceFolder, destinationFolder) {
  if (!fs.existsSync(sourceFolder))
      return;
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }
  fs.readdirSync(sourceFolder).forEach((file) => {
      const sourceFilePath = `${sourceFolder}/${file}`;
      const destinationFilePath = `${destinationFolder}/${file}`;
      if (fs.lstatSync(sourceFilePath).isDirectory()) {
          copyFolder(sourceFilePath, destinationFilePath);
      } else {
          fs.copyFileSync(sourceFilePath, destinationFilePath);
      }
  });
}

const libraries = [
  // 'libraries/pc-react-ui',
  'libraries/mobile-ui',
  'libraries/pc-ui',
];

libraries.forEach((libPath) => {
  const packageDir = path.join(process.cwd(), `./${libPath}`);
  const pkgJson = fs.readJSONSync(path.join(packageDir, 'package.json'));
  const destDir = `${distDic}/${pkgJson.name}@${pkgJson.version}`;

  fs.mkdirSync(destDir, { recursive: true });
  console.log(chalk.green(`创建文件夹 ${destDir} `));

  copyFolder(`${packageDir}/dist-theme`, `${destDir}/dist-theme`);
  console.log(chalk.green(`复制 ${libPath}/dist-theme`));

  globSync([`${packageDir}/src/**/screenshots`, `${packageDir}/src/**/drawings`, `${packageDir}/src-vusion/**/screenshots`, `${packageDir}/src-vusion/**/drawings`]).forEach(p => {
    const dir = p.substring(packageDir.length + 1);
    copyFolder(p, `${destDir}/${dir}`);
  });

  console.log(chalk.green('组件内部图片复制成功！'));

  const tgz = `${pkgJson.name.replace('@lcap/', 'lcap-')}-${pkgJson.version}.tgz`;
  // tgz是否存在
  if (!fs.existsSync(`${packageDir}/${tgz}`)) {
    console.error(`${tgz} not found`);
    process.exit(1);
  }

  // 复制tgz到distDic
  fs.copyFileSync(`${packageDir}/${tgz}`, `${destDir}/zip.tgz`);
});


