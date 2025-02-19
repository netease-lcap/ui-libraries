import fs from 'fs-extra';
import path from 'path';
import { kebabCase } from 'lodash';
import type { OverloadComponentContext } from './context';
import { LCAP_UI_PACKAGE_NAME } from './constants';
import { addPrefix, getWithFormName } from './utils';

function resetExports(componentFolderPath: string, name: string, exportNames: string[]) {
  const indexPath = path.resolve(componentFolderPath, '../index.ts');

  if (!fs.existsSync(indexPath)) {
    return;
  }

  let codes = fs.readFileSync(indexPath, 'utf-8').split('\n');
  codes = codes.map((code) => {
    if (code.startsWith('export') && (code.includes(` ${name} `) || code.includes(` ${name}}`))) {
      return `export { ${exportNames.join(', ')} } from './${kebabCase(name)}';`;
    }

    if (code.startsWith('import') && code.includes(` ${name} `)) {
      return `import { ${exportNames.join(', ')} } from './${kebabCase(name)}';`;
    }

    if (code.trim() === name || code.trim() === `${name},`) {
      return exportNames.map((n) => `  ${n},`).join('\n');
    }

    return code;
  });

  fs.writeFileSync(indexPath, codes.join('\n'), 'utf-8');
}

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

  if (context.isWithForm) {
    resetExports(context.componentFolderPath, context.name, [context.name, withFormName]);
  }
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
}
