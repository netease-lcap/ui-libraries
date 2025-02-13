import fs from 'fs-extra';
import path from 'path';
import type { OverloadComponentContext } from './context';
import { LCAP_UI_PACKAGE_NAME } from './constants';

function generateElementUIComponent(context: OverloadComponentContext) {
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
    `import { BaseComponent } from '${LCAP_UI_PACKAGE_NAME}';`,
    'export default {',
    `  name: '${context.tagName}',`,
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
    `import { extendComponent, ${context.naslUIConfig.name} } from '${LCAP_UI_PACKAGE_NAME}';`,
    `import Extend${context.naslUIConfig.name} from './index.vue';`,
    `export const ${context.name} = extendComponent(${context.naslUIConfig.name}, Extend${context.naslUIConfig.name});`,
    `export default ${context.name};`,
    '',
  ].join('\n');

  fs.writeFileSync(path.resolve(context.componentFolderPath, 'index.vue'), vueCode, 'utf-8');
  fs.writeFileSync(path.resolve(context.componentFolderPath, 'index.ts'), indexCode, 'utf-8');
}

async function generateVueComponent(context: OverloadComponentContext) {
  if (context.libInfo.name === 'element-ui') {
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
