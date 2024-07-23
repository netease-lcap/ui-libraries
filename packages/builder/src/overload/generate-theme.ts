import fs from 'fs-extra';
import path from 'path';
import { OverloadComponentContext } from './context';

async function generateThemeVarsFile(context: OverloadComponentContext, themeFolder: string) {
  if (!context.themeConfig || !context.themeConfig.variables || (context.themeConfig.variables.length === 0 && context.themeConfig.useGlobalTokens.length === 0)) {
    return;
  }

  const componentCodes = ['/**', ` * @component ${context.tagName}`];

  if (context.themeConfig.hidden) {
    componentCodes.push(' * @hidden');
  }

  if (context.themeConfig.useGlobalTokens && context.themeConfig.useGlobalTokens.length > 0) {
    componentCodes.push(` * @useGlobalTokens ${JSON.stringify(context.themeConfig.useGlobalTokens)}`);
  }

  componentCodes.push(' */');
  componentCodes.push(`${context.themeConfig.selector || ':root'} {`);

  const variableCodes = context.themeConfig.variables.map((cssVar) => {
    const codes = [
      '  /**',
    ];

    Object.keys(cssVar).forEach((key) => {
      const v = cssVar[key];
      if (!v) {
        return;
      }

      switch (typeof v) {
        case 'string':
        case 'number':
          codes.push(`   * @${key} ${v}`);
          break;
        case 'boolean':
          codes.push(`   * @${key}`);
          break;
        case 'object':
          codes.push(`   * @${key} ${JSON.stringify(v)}`);
          break;
        default:
          break;
      }
    });

    codes.push('   */');
    codes.push(`${cssVar.name}: ${cssVar.value};`);
    codes.push('');
    return codes.join('\n');
  });

  const endCode = '}';

  const code = [
    ...componentCodes,
    ...variableCodes,
    endCode,
    '',
  ].join('\n');

  fs.writeFileSync(path.resolve(themeFolder, 'vars.css'), code, 'utf-8');
}

const VUE_PREVIEW_CODE = `<template>
  <demo-preview></demo-preview>
</template>
<script>
import createStoriesPreview from '@lcap/builder/input/vue2/stories-preview';
import * as stories from '../stories/block.stories';

const DemoPreview = createStoriesPreview(stories);

export default {
  components: {
    DemoPreview,
  },
};

</script>
`;

const REACT_PREVIEW_CODE = `import createStoriesPreview from '@lcap/builder/input/react/stories-preview';
import * as stories from '../stories/block.stories';

export default createStoriesPreview(stories);`;

async function generateThemePrevieFile(context: OverloadComponentContext, themeFolder: string) {
  if (context.framework.startsWith('vue')) {
    fs.writeFileSync(path.resolve(themeFolder, 'index.vue'), VUE_PREVIEW_CODE, 'utf-8');
    return;
  }

  fs.writeFileSync(path.resolve(themeFolder, 'index.jsx'), REACT_PREVIEW_CODE, 'utf-8');
}

export async function generateThemeFile(context: OverloadComponentContext) {
  const themeFolder = path.resolve(context.componentFolderPath, 'theme');
  if (!fs.existsSync(themeFolder)) {
    fs.mkdirSync(themeFolder, { recursive: true });
  }

  await generateThemeVarsFile(context, themeFolder);
  await generateThemePrevieFile(context, themeFolder);
}
