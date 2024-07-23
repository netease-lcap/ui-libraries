import fs from 'fs-extra';
import path from 'path';
import type { OverloadComponentContext } from './context';
import { LCAP_UI_PACKAGE_NAME } from './constants';

async function generateVueComponent(context: OverloadComponentContext) {
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
  ].join('\n');

  fs.writeFileSync(path.resolve(context.componentFolderPath, 'index.tsx'), code, 'utf-8');
}

export async function generateComponentFile(context: OverloadComponentContext) {
  if (context.framework.startsWith('vue')) {
    await generateVueComponent(context);
  } else if (context.framework === 'react') {
    await generateReactComponent(context);
  }
}
