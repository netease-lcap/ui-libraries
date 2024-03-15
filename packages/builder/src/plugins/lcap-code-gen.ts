import path from 'path';
import glob from 'fast-glob';
import { Plugin } from 'vite';
import { virtualThemeCSSFileId, virtualThemeComponentStoriesFileId } from '../constants/virtual-file-names';

export interface LcapCodeGenOption {
  themeVarCssPath?: string;
  themeComponentFolder?: string;
  framework?: 'react' | 'vue2' | 'taro' | 'vue3',
}

const defaultOptions = {
  themeVarCssPath: './src/theme/vars.css',
  themeComponentFolder: './src/theme/components',
};

function genVarCssCode(themeVarCssPath, componentFolder) {
  const cssVars = [
    themeVarCssPath,
  ];

  const varFiles = glob.sync(`${componentFolder}/*/vars.css`);
  if (varFiles.length > 0) {
    cssVars.push(...varFiles);
  }

  const code = cssVars.map((filePath) => `@import '${filePath}';`).join('\n');
  return code;
}

function genComponentStoriesCode(componentFolder, framework) {
  const imports: string[] = [
    `import createComponentPreview from '${path.resolve(__dirname, `../../input/${framework}/createComponentPreview.jsx`)}';`,
  ];
  const stories: string[] = ['const stories = ['];

  const previewFiles = glob.sync(`${componentFolder}/*/index.*`);
  previewFiles.forEach((filePath) => {
    const compPath = filePath.substring(0, filePath.lastIndexOf('/'));
    const compName = compPath.substring(compPath.lastIndexOf('/') + 1);
    imports.push(`import ${compName} from '${filePath}';`);

    stories.push(
      `{ demo: ${compName}, name: '${compName}' },`,
    );
  });

  stories.push('];');

  return [
    imports.join('\n'),
    stories.join('\n'),
    'export const demos = stories;',
    'export default createComponentPreview(stories);',
  ].join('\n\n');
}

export default (options: LcapCodeGenOption = {}) => {
  const cwd = process.cwd();
  const themeVarCssPath = path.resolve(cwd, options.themeVarCssPath || defaultOptions.themeVarCssPath);
  const componentFolder = path.resolve(cwd, options.themeComponentFolder || defaultOptions.themeComponentFolder);

  return {
    name: 'vite-lcap:code-gen', // 必须的，将会在 warning 和 error 中显示
    resolveId(source) {
      if (source === virtualThemeCSSFileId) {
        return virtualThemeCSSFileId;
      }

      if (source === virtualThemeComponentStoriesFileId) {
        return virtualThemeComponentStoriesFileId;
      }

      return undefined;
    },
    load: (id) => {
      if (id === virtualThemeCSSFileId) {
        return genVarCssCode(themeVarCssPath, componentFolder);
      }

      if (id === virtualThemeComponentStoriesFileId) {
        return genComponentStoriesCode(componentFolder, options.framework);
      }

      return undefined;
    },
  } as Plugin;
};
