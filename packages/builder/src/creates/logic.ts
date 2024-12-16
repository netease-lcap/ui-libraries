import fs from 'fs-extra';
import { camelCase, upperFirst } from 'lodash';
import path from 'path';
import pc from 'picocolors';
import prompts from 'prompts';
import logger from '../utils/logger';
import { ProjectMetaInfo } from '../utils/project';

export interface CreateLogicOptions {
  name: string;
  title: string;
  type: 'pc' | 'h5' | 'both';
}
const LOGICS_PATH = 'src/logics/index.ts';
const LOGIC_TEMPLATE = [
  '/**',
  ' * @NaslLogic',
  ' * @type {{type}}',
  ' * @title {{title}}',
  ' * @desc {{title}}',
  ' * @param str 参数描述',
  ' * @returns 返回结果描述',
  ' */',
  'export function {{name}}(str: nasl.core.String) {',
  '}',
  '',
].join('\n');

export async function getCreateLogicOptions(rootPath: string, metaInfo: ProjectMetaInfo) {
  let result: prompts.Answers<'name' | 'title' | 'type'>;

  try {
    result = await prompts(
      [
        {
          type: 'text',
          name: 'name',
          message: '请输入逻辑名称（使用小驼峰方式命名，例如：filterNull）',
          format: (val) => camelCase(val).trim(),
          validate: (v) => {
            if (!v || v.trim === '') {
              return '逻辑名字不能为空';
            }

            return true;
          },
        },
        {
          type: 'text',
          name: 'title',
          message: '请输入别名(中文名)， 例如：过滤列表',
          format: (val) => val.trim(),
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
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return null;
  }

  return result;
}

export async function createLogic(rootPath: string, metaInfo: ProjectMetaInfo, options: CreateLogicOptions) {
  const logicFilePath = path.resolve(rootPath, LOGICS_PATH);

  if (!fs.existsSync(logicFilePath)) {
    throw new Error(`逻辑存储文件 ${logicFilePath} 不存在`);
  }

  const content = fs.readFileSync(logicFilePath, 'utf-8').toString();

  const logicCode = LOGIC_TEMPLATE.replace(/\{\{type\}\}/g, options.type)
    .replace(/\{\{name\}\}/g, options.name)
    .replace(/\{\{title\}\}/g, options.title);

  fs.writeFileSync(logicFilePath, `${content}\n${logicCode}`, 'utf-8');
}

export async function executeCreateLogic(rootPath: string, metaInfo: ProjectMetaInfo) {
  const options = await getCreateLogicOptions(rootPath, metaInfo);

  if (!options) {
    return;
  }

  logger.start(`开始创建逻辑 ${options.name} ......`);
  await createLogic(rootPath, metaInfo, options);
  logger.success(`创建逻辑成功 ${options.name} ！`);
}
