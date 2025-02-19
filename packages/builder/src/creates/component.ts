import fs from 'fs-extra';
import path from 'path';
import pc from 'picocolors';
import prompts from 'prompts';
import { camelCase, kebabCase, upperFirst } from 'lodash';
import { getComponentList, type ProjectMetaInfo } from '../utils/project';
import { copy } from '../utils/fs';
import logger from '../utils/logger';
import overloadComponent from '../commands/overload';

export interface CreateComponentOptions {
  name: string;
  title: string;
  type: 'pc' | 'h5' | 'both';
  overload: boolean;
  baseComponentName?: string;
  fork?: boolean;
  prefix?: string;
}

const COMPONENTS_FOLDER = 'src/components';

function isSupportFork(metaInfo: ProjectMetaInfo) {
  if (metaInfo.framework !== 'vue2') {
    return false;
  }

  if (metaInfo.libUIInfo && metaInfo.libUIInfo.pkgName === '@lcap/element-ui') {
    return false;
  }

  return true;
}

export async function getCreateComponentOptions(rootPath: string, metaInfo: ProjectMetaInfo) {
  const componentList = getComponentList(rootPath);
  let result: CreateComponentOptions = {
    name: '',
    title: '',
    type: 'pc',
    overload: false,
  };
  let createMode: 'create' | 'overload' = 'create';

  try {
    if (componentList.length > 0) {
      const createModeAnswers = await prompts(
        [
          {
            type: 'select',
            name: 'createMode',
            message: '请选择创建组件方式',
            initial: 0,
            choices: [
              { value: 'create', title: '添加新组件' },
              { value: 'overload', title: '重载基础组件' },
            ],
          },
        ],
        {
          onCancel: () => {
            // eslint-disable-next-line prefer-template
            throw new Error(pc.red('✖') + ' 已取消');
          },
        },
      );
      createMode = createModeAnswers.createMode;
    }

    if (createMode === 'overload') {
      const overloadAnswers = await prompts([
        {
          type: 'select',
          name: 'baseComponentName',
          message: '请选择重载的基础组件',
          initial: 0,
          choices: componentList.map((c) => ({ value: c.name, title: `${c.name}(${c.title})` })),
        },
        {
          type: 'text',
          name: 'prefix',
          message: '请输入重载名称前缀（例如 ex）：',
          initial: 'ex',
          format: (val) => {
            if (!val) {
              return 'ex';
            }
            return val.trim().toLowerCase();
          },
        },
        {
          type: () => (isSupportFork(metaInfo) ? 'confirm' : null),
          name: 'fork',
          message: '是否复制基础组件源代码？\n复制组件源码后，该组件将完全独立，无法继续跟随基础组件能力升级变化，请慎重处理；',
          initial: false,
        },
      ]);

      const comp = componentList.find((it) => it.name === overloadAnswers.baseComponentName);

      result = {
        ...result,
        ...overloadAnswers,
        name: upperFirst(overloadAnswers.prefix) + overloadAnswers.baseComponentName,
        title: comp ? comp.title : '',
        type: metaInfo.libUIInfo && metaInfo.libUIInfo.type ? metaInfo.libUIInfo.type : 'pc',
        overload: true,
      };
    } else {
      const createAnswers = await prompts(
        [
          {
            type: 'text',
            name: 'name',
            message: '请输入组件名字（使用大驼峰方式命名，例如：TreeSelect）',
            format: (val) => upperFirst(camelCase(val).trim()),
            validate: (v) => {
              if (!v || v.trim === '') {
                return '组件名字不能为空';
              }

              return true;
            },
          },
          {
            type: 'text',
            name: 'title',
            message: '请输入别名(中文名)，例如：树形选择器',
            validate: (v) => {
              if (!v || v.trim === '') {
                return '别名不能为空';
              }

              return true;
            },
          },
          {
            type: metaInfo.framework === 'react' ? null : 'select',
            name: 'type',
            message: '请选择端',
            initial: 0,
            choices: [
              { value: 'pc', title: 'PC端' },
              { value: 'h5', title: 'H5端' },
              { value: 'both', title: '全部' },
            ],
          },
        ],
        {
          onCancel: () => {
            // eslint-disable-next-line prefer-template
            throw new Error(pc.red('✖') + ' 已取消');
          },
        },
      );

      result = {
        ...result,
        ...createAnswers,
        overload: false,
      };
    }
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return null;
  }

  return result;
}

export function createComponent(rootPath: string, metaInfo: ProjectMetaInfo, options: CreateComponentOptions) {
  const templateFolder = path.resolve(__dirname, '../../templates', `${metaInfo.framework}-component`);
  if (!fs.existsSync(templateFolder)) {
    throw new Error(`未找到 ${metaInfo.framework} 组件模板`);
  }

  const compName = upperFirst(camelCase(options.name));
  const tagName = metaInfo.framework.startsWith('vue') ? kebabCase(options.name) : compName;

  const componentFolder = path.resolve(rootPath, COMPONENTS_FOLDER, tagName);

  if (fs.existsSync(componentFolder)) {
    throw new Error(`组件目录 ${componentFolder} 已存在`);
  }

  const replaceTextList = [
    {
      reg: /\{\{pkgName\}\}/g,
      text: metaInfo.name,
    },
    {
      reg: /\{\{tagName\}\}/g,
      text: tagName,
    },
    {
      reg: /\{\{compName\}\}/g,
      text: compName,
    },
    {
      reg: /\{\{title\}\}/g,
      text: options.title,
    },
    {
      reg: /\{\{description\}\}/g,
      text: options.title,
    },
    {
      reg: /\{\{type\}\}/g,
      text: options.type,
    },
  ];

  copy(templateFolder, componentFolder, replaceTextList);

  const componentIndexPath = path.resolve(rootPath, COMPONENTS_FOLDER, 'index.ts');

  if (!fs.existsSync(componentIndexPath)) {
    return;
  }

  // 写入 import
  const content = fs.readFileSync(componentIndexPath, 'utf-8').toString();

  fs.writeFileSync(
    componentIndexPath,
    [
      ...content
        .toString()
        .split('\n')
        .filter((c) => !!c.trim()),
      `export { default as ${compName} } from './${tagName}';`,
      '',
    ].join('\n'),
    'utf-8',
  );
}

export async function executeCreateComponent(rootPath: string, metaInfo: ProjectMetaInfo) {
  const options = await getCreateComponentOptions(rootPath, metaInfo);

  if (!options) {
    return;
  }

  logger.start(`开始创建组件 ${options.name} ......`);

  await createComponent(rootPath, metaInfo, options);

  if (options.overload) {
    await overloadComponent(
      rootPath,
      {
        fork: options.fork,
        component: options.baseComponentName,
        prefix: options.prefix,
      },
    );
  }

  logger.success(`创建组件成功 ${options.name} ！`);
}
