import fs from 'fs-extra';
import path from 'path';
import { OverloadComponentContext } from './context';

function copyFolder(sourceFolder, destinationFolder) {
  if (!fs.existsSync(sourceFolder)) {
    return;
  }
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }
  fs.readdirSync(sourceFolder).forEach((file) => {
    const sourceFilePath = path.resolve(sourceFolder, file);
    const destinationFilePath = path.resolve(destinationFolder, file);
    if (fs.lstatSync(sourceFilePath).isDirectory()) {
      copyFolder(sourceFilePath, destinationFilePath);
    } else {
      fs.copyFileSync(sourceFilePath, destinationFilePath);
    }
  });
}

export async function copyFiles(context: OverloadComponentContext) {
  // 复制api.ts
  fs.copyFileSync(path.resolve(context.pkgComponentFolderPath, 'api.ts'), path.resolve(context.componentFolderPath, 'api.ts'));
  // 复制 截图
  copyFolder(path.resolve(context.pkgComponentFolderPath, 'screenshots'), path.resolve(context.componentFolderPath, 'screenshots'));
  copyFolder(path.resolve(context.pkgComponentFolderPath, 'drawings'), path.resolve(context.componentFolderPath, 'drawings'));
}
