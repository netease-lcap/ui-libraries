import fs from 'fs-extra';
import path from 'path';
import { type MaterialSchema, type MaterialComponent } from '@lcap/material-parser';
import prompts from 'prompts';
import { kebabCase, upperFirst } from 'lodash';
import { ProjectMetaInfo } from '../utils/project';
import { createComponent, getTagName, COMPONENTS_FOLDER } from './component';
import { getComponentMetaInfos, Schema, WriteOptions } from '../utils/lcap';

const EMPTY_API_TS = ({
  pkgName,
  compName,
  sourceName,
  title,
  description,
  type,
}: { pkgName: string, sourceName: string, compName: string, title: string, description: string, type: string }) => {
  return `/// <reference types="@nasl/types" />
namespace extensions.${pkgName}.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: '${type}',
    sourceName: '${sourceName}',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '${title}',
    description: '${description}',
  })
  export class ${compName} extends ViewComponent {
    constructor(options?: Partial<${compName}Options>) {
      super();
    }
  }

  export class ${compName}Options extends ViewComponentOptions {
  }
}`;
};

export interface MaterialComponentSchema {
  meta: Omit<MaterialSchema, 'components'>;
  component: MaterialComponent;
  write: WriteOptions;
}

function generateVue2Component(meta: MaterialComponentSchema['meta'], component: MaterialComponent, { tagName, componentFolder }: any) {
  const VueCode = `<template>
  <${component.name} v-bind="$attrs" v-on="$listeners">
    <template v-for="(_, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"/>
    </template>
  </${component.name}>
</template>
<script>
import { ${component.exportName} as ${component.name} } from '${meta.name}';

export default {
  name: '${tagName}',
  components: {
    ${component.name},
  },
};
</script>`;
  fs.writeFileSync(path.resolve(componentFolder, 'index.vue'), VueCode, 'utf-8');
}

function generateVue3Component(meta: MaterialComponentSchema['meta'], component: MaterialComponent, { tagName, componentFolder }: any) {
  const VueCode = `<template>
  <${component.name} v-bind="$attrs" v-on="$listeners">
    <template v-for="(_, name) in $slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"/>
    </template>
  </${component.name}>
</template>
<script>
import { ${component.exportName} as ${component.name} } from '${meta.name}';

export default {
  name: '${tagName}',
  components: {
    ${component.name},
  },
};
</script>`;
  fs.writeFileSync(path.resolve(componentFolder, 'index.vue'), VueCode, 'utf-8');
}

function generateReactComponent(meta: MaterialComponentSchema['meta'], component: MaterialComponent, { tagName, componentFolder }: any) {
  const code = [
    'import React, { forwardRef } from \'react\'',
    `import { ${component.exportName} as BaseComponent } from '${meta.name}'`,
    '',
    `const ${tagName} = forwardRef<any, any>((props, ref) => {`,
    '  const {',
    '    ...rest',
    '  } = props;',
    '',
    '  return (',
    '    <BaseComponent',
    '      ref={ref}',
    '      {...rest}',
    '    />',
    '  );',
    '});',
    '',
    `export default ${tagName}`,
    '',
  ].join('\n');

  fs.writeFileSync(path.resolve(componentFolder, 'index.tsx'), code, 'utf-8');
}

export async function createForSchema(rootPath: string, metaInfo: ProjectMetaInfo, schema: MaterialComponentSchema) {
  const { meta, write: options, component } = schema;

  const compName = upperFirst(options.prefix || '') + component.name;
  const tagName = getTagName(metaInfo.framework, compName);
  const title = kebabCase(component.name).split('-').map((s) => upperFirst(s)).join(' ');
  const type = options.type || 'pc';

  const componentFolder = path.resolve(rootPath, COMPONENTS_FOLDER, tagName);

  createComponent(rootPath, metaInfo, {
    name: compName,
    title,
    overload: false,
    type,
  });

  fs.writeFileSync(path.resolve(componentFolder, 'api.ts'), EMPTY_API_TS({
    pkgName: metaInfo.name,
    compName,
    title,
    sourceName: component.name,
    description: (component.description || title).replace(/'/g, '\\\''),
    type,
  }), 'utf-8');

  switch (metaInfo.framework) {
    case 'vue3':
      generateVue3Component(meta, component, { tagName, componentFolder });
      break;
    case 'vue2':
      generateVue2Component(meta, component, { tagName, componentFolder });
      break;
    case 'react':
      generateReactComponent(meta, component, { tagName, componentFolder });
      break;
    default: break;
  }
}

export function setImportStyle(rootPath: string, schema: MaterialSchema) {
  if (!schema.style) {
    return;
  }

  const entry = path.resolve(rootPath, 'src/index.ts');
  if (!fs.existsSync(entry)) {
    return;
  }

  const styleCode = `import '${path.join(schema.name, schema.style)}';`;

  const content = fs.readFileSync(entry, 'utf-8').toString().split('\n');
  if (content.some((line) => line.includes(styleCode))) {
    return;
  }

  content.unshift(styleCode);

  fs.writeFileSync(entry, content.join('\n'), 'utf-8');
}

export async function executeCreateForSchema(rootPath: string, metaInfo: ProjectMetaInfo, schema: string, name?: string) {
  if (!schema || !fs.existsSync(path.resolve(rootPath, schema))) {
    throw new Error(`schema 文件 ${schema} 不存在`);
  }

  const material: Schema = await fs.readJSON(path.resolve(rootPath, schema), 'utf-8');
  if (!material.components || material.components.length === 0) {
    throw new Error(`schema 文件 ${schema} 中没有组件`);
  }

  const apiComponentList = getComponentMetaInfos(rootPath, true);

  const components = material.components.filter((c) => (
    name ? c.name === name
      : (!apiComponentList.find((l) => l.sourceName === c.name))
  ));
  if (components.length === 0) {
    throw new Error(`schema 文件 ${schema} 中没有可添加的组件`);
  }

  let createComponentNames: string[] = [];

  if (name && material.write) {
    createComponentNames = [name];
  } else {
    const answers = await prompts([
      {
        type: 'multiselect',
        name: 'components',
        message: '请选择要添加的组件：',
        choices: components.map((c) => ({ value: c.name, title: c.name })),
      },
      {
        type: metaInfo.framework === 'react' || material.write ? null : 'select',
        name: 'type',
        message: '请选择端',
        initial: 0,
        choices: [
          { value: 'pc', title: 'PC端' },
          { value: 'h5', title: 'H5端' },
          { value: 'both', title: '全部' },
        ],
      },
      {
        type: !material.write ? 'text' : null,
        name: 'prefix',
        message: '请输入添加组件名称前缀（例如 cwx）：',
        initial: 'cwx',
        format: (val) => {
          if (!val) {
            return '';
          }
          return val.trim().toLowerCase();
        },
      },
    ]);

    if (!material.write) {
      material.write = {
        prefix: answers.prefix,
        type: answers.type,
      };

      fs.writeJSONSync(schema, material, { spaces: 2 });
    }

    createComponentNames = answers.components;
  }

  if (createComponentNames.length === 0) {
    throw new Error('请选择要添加的组件');
  }

  const writeOptions = material.write;
  createComponentNames.forEach((name) => {
    const component = components.find((c) => c.name === name);
    if (!component) {
      throw new Error(`schema 文件 ${schema} 中没有找到组件 ${name}`);
    }

    createForSchema(rootPath, metaInfo, {
      meta: {
        name: material.name,
        version: material.version,
        description: material.description,
        framework: material.framework,
        frameworkVersion: material.frameworkVersion,
      },
      write: writeOptions,
      component,
    });
  });

  setImportStyle(rootPath, material);
}
