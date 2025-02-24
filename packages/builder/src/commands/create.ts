import pc from 'picocolors';
import prompts from 'prompts';
import { executeCreateComponent, executeCreateLogic, executeCreateForSchema } from '../creates';
import { getExtensionProjectMeta } from '../utils/project';

function resolveOptions(options: { logic: boolean, component: boolean, schema: boolean, name: string }) {
  const type = ['component', 'logic'].find((s) => options[s]);

  if (options.schema) {
    return {
      type: 'schema',
    };
  }

  return {
    type,
  };
}

export default async (rootPath: string, options: any) => {
  let { type } = resolveOptions(options);

  if (!type) {
    try {
      const result: prompts.Answers<'type'> = await prompts([{
        type: 'select',
        name: 'type',
        message: '请选择：',
        initial: 0,
        choices: [{
          value: 'component',
          title: '创建组件',
        }, {
          value: 'logic',
          title: '创建逻辑',
        }],
      }], {
        onCancel: () => {
          throw new Error(`${pc.red('✖')} 已取消`);
        },
      });
      type = result.type;
    } catch (e: any) {
      console.log(e.message);
      return;
    }
  }

  const projectMetaInfo = getExtensionProjectMeta(rootPath);

  switch (type) {
    case 'schema':
      await executeCreateForSchema(rootPath, projectMetaInfo, options.schema, options.name);
      break;
    case 'component':
      await executeCreateComponent(rootPath, projectMetaInfo);
      break;
    case 'logic':
      await executeCreateLogic(rootPath, projectMetaInfo);
      break;
    default: break;
  }
};
