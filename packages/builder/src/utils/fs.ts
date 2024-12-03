import fs from 'fs-extra';
import path from 'path';

export function copy(sourceFolder, destinationFolder, replaceList: Array<{ reg: RegExp; text: string }>) {
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
      copy(sourceFilePath, destinationFilePath, replaceList);
    } else {
      let content = fs.readFileSync(sourceFilePath, 'utf-8').toString();

      replaceList.forEach(({ reg, text }) => {
        content = content.replace(reg, text);
      });

      fs.writeFileSync(destinationFilePath, content, 'utf-8');
    }
  });
}
