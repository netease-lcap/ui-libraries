import fs from 'fs-extra';
import path from 'path';

export const getComponentPathInfo = (compName, rootPath, componentsPath) => {
  const rootComponentDir = path.join(rootPath, componentsPath);
  let componentDir = path.join(rootComponentDir, compName);
  const srcCompDir = path.join(rootPath, `./src/${compName}`);
  let sourceDir = componentsPath;
  let symbol = compName;

  // 兼容 mobile-ui 处理
  if (!fs.existsSync(componentDir)) {
    if (fs.existsSync(srcCompDir)) {
      componentDir = srcCompDir;
      sourceDir = 'src';
    } else {
      const name = `${componentDir}.vue`;
      componentDir = name;
      symbol = `${compName}.vue`;
    }
  }

  return {
    componentDir,
    sourceDir,
    symbol,
  };
};
