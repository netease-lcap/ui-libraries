import fs from 'fs-extra';
import path from 'path';
import { kebabCase } from 'lodash';
import type { OverloadComponentContext } from './context';
import { LCAP_UI_PACKAGE_NAME } from './constants';
import { addPrefix, getWithFormName } from './utils';
import { getPath } from '../utils/fs';

function generateElementUIComponent(context: OverloadComponentContext) {
  const withFormName = addPrefix(getWithFormName(context.naslUIConfig.name), context.prefix);
  const withFormTagName = kebabCase(withFormName);
  const vueCode = [
    '<template>',
    ' <base-component />',
    '</template>',
    '<script>',
    ...context.naslUIConfig.sourceDocURL ? [
      '/**',
      ` * 组件文档地址： ${context.naslUIConfig.sourceDocURL}`,
      ' */',
    ] : [],
    context.isWithForm ? `import { BaseComponent, lowCodeFormFieldMixin } from '${LCAP_UI_PACKAGE_NAME}';` : `import { BaseComponent } from '${LCAP_UI_PACKAGE_NAME}';`,
    '',
    'export default {',
    `  name: '${context.tagName}',`,
    '  inheritAttrs: false,',
    ...context.isWithForm ? [
      `  mixins: [lowCodeFormFieldMixin('${context.tagName}', '${withFormTagName}')],`,
    ] : [],
    '  components: {',
    '    BaseComponent,',
    '  },',
    '};',
    '</script>',
    '<style>',
    '</style>',
    '',
  ].join('\n');
  const indexCode = [
    `import { extendComponent,${context.isWithForm ? ' WithFormItem,' : ''} ${context.naslUIConfig.name} } from '${LCAP_UI_PACKAGE_NAME}';`,
    `import Extend${context.naslUIConfig.name} from './index.vue';`,
    '',
    `export const ${context.name} = extendComponent(${context.naslUIConfig.name}, Extend${context.naslUIConfig.name});`,
    ...context.isWithForm ? [
      `export const ${withFormName} = WithFormItem(${context.name}, { name: '${withFormTagName}', methodNames: [${context.naslUIConfig.methods.map((m) => `'${m.name}'`).join(', ')}] });`,
    ] : [],
    `export default ${context.name};`,
    '',
  ].join('\n');

  fs.writeFileSync(path.resolve(context.componentFolderPath, 'index.vue'), vueCode, 'utf-8');
  fs.writeFileSync(path.resolve(context.componentFolderPath, 'index.ts'), indexCode, 'utf-8');
}

async function generateVueComponent(context: OverloadComponentContext) {
  if (context.libInfo.name === '@lcap/element-ui') {
    generateElementUIComponent(context);
    return;
  }

  const slotCodes = context.naslUIConfig.slots.map((slot) => {
    return `  <slot name="${slot.name}" slot="${slot.name}"></slot>`;
  });

  const methodCodes = context.naslUIConfig.methods.map((m) => {
    return [
      `    ${m.name}(...args) {`,
      `      this.$refs.base.${m.name}(...args)`,
      '    },',
    ].join('\n');
  });

  const templateCodes = [
    `<${context.naslUIConfig.kebabName} ref="base" class="${context.tagName}" v-bind="$attrs" v-on="$listeners">`,
    `</${context.naslUIConfig.kebabName}>`,
  ];

  if (slotCodes.length > 0) {
    templateCodes.splice(1, 0, slotCodes.join('\n'));
  }
  const code = [
    '<template>',
    ...templateCodes,
    '</template>',
    '<script>',
    'export default {',
    `  name: '${context.tagName}',`,
    ...(methodCodes.length > 0 ? [
      '  methods: {',
      ...methodCodes,
      '  }',
    ] : []),
    '};',
    '</script>',
    '<style>',
    `.${context.tagName}{`,
    '}',
    '</style>',
    '',
  ].join('\n');

  fs.writeFileSync(path.resolve(context.componentFolderPath, 'index.vue'), code, 'utf-8');
}

async function generateReactComponent(context: OverloadComponentContext) {
  const code = [
    'import React, { forwardRef } from \'react\'',
    `import { ${context.naslUIConfig.name} } from '${LCAP_UI_PACKAGE_NAME}'`,
    '',
    `const ${context.name} = forwardRef<any, any>((props, ref) => {`,
    '  const {',
    '    ...rest',
    '  } = props;',
    '',
    '  return (',
    `    <${context.naslUIConfig.name}`,
    '      ref={ref}',
    '      {...rest}',
    '    />',
    '  );',
    '});',
    '',
    `export default ${context.name}`,
    '',
  ].join('\n');

  fs.writeFileSync(path.resolve(context.componentFolderPath, 'index.tsx'), code, 'utf-8');
}

// 添加 index.ts 中的子组件 exports
function addIndexExports(context: OverloadComponentContext) {
  const indexPath = getPath(path.resolve(context.componentFolderPath, './index'));

  if (!indexPath || !fs.existsSync(indexPath)) {
    return;
  }

  const needExportNames = context.replaceNames.filter((name) => {
    const exportName = context.replaceNameMap[name];

    return exportName && exportName !== context.name && (!context.isWithForm || name !== context.withFormName);
  });

  if (needExportNames.length === 0) {
    return;
  }

  const codes = fs.readFileSync(indexPath, 'utf-8').split('\n');
  codes.push(`import { ${needExportNames.map((n) => `${n} as ${context.replaceNameMap[n]}`).join(', ')} } from '${LCAP_UI_PACKAGE_NAME}';`);
  codes.push(`export { ${needExportNames.map((n) => context.replaceNameMap[n]).join(', ')} };\n`);
  fs.writeFileSync(indexPath, codes.join('\n'), 'utf-8');
}

function addComponentsExports(context: OverloadComponentContext) {
  const indexPath = path.resolve(context.componentFolderPath, '../index.ts');
  const needExportNames = context.exportNames.filter((name) => name !== context.name);

  if (!fs.existsSync(indexPath) || needExportNames.length === 0) {
    return;
  }

  const folderName = path.basename(context.componentFolderPath);

  const codes = fs.readFileSync(indexPath, 'utf-8').split('\n');
  codes.push(`export { ${needExportNames.join(', ')} } from './${folderName}';\n`);

  fs.writeFileSync(indexPath, codes.join('\n'), 'utf-8');
}

export async function generateComponentFile(context: OverloadComponentContext) {
  switch (context.framework) {
    case 'vue2':
      await generateVueComponent(context);
      break;
    case 'react':
      await generateReactComponent(context);
      break;
    default: break;
  }

  addIndexExports(context);
  addComponentsExports(context);
}
