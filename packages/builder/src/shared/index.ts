import { setLogger } from '@lcap/extension-shared/lib/utils/logger';
import { setFileSystem } from '@lcap/extension-shared/lib/utils/file-system';
import { fileSystem } from './file-system';
import logger from '../utils/logger';

// 设置 node 环境下的 logger 和 fileSystem
setLogger(logger);
setFileSystem(fileSystem);

export { default as parseComponentAPI } from '@lcap/extension-shared/lib/transforms/parse-component-api';
export { default as transformFunc2NaslLogic } from '@lcap/extension-shared/lib/transforms/transform-func2nasl-logic';

export * from '@lcap/extension-shared/lib/ts2nasl';

export type * from '@lcap/extension-shared/lib/types/nasl';
export type * from '@lcap/extension-shared/lib/types/project';
export { getComponentMetaByApiTs, getComponentMetaInfos } from '@lcap/extension-shared/lib/utils/api-meta';
export { default as updateAPIFile } from '@lcap/extension-shared/lib/utils/api-update';
export * from '@lcap/extension-shared/lib/utils/babel-utils';
export { removeComponentFiles } from '@lcap/extension-shared/lib/utils/remove-component';
export { getKebabCaseName } from '@lcap/extension-shared/lib/utils/string';
export { default as genNaslLogics } from '@lcap/extension-shared/lib/nasl-logics';
export { default as genNaslComponent } from '@lcap/extension-shared/lib/nasl-view-component';
export { resolveFramework, getLcapUIInfo, getProjectInfo, getLcapUIComponentList, getSourceSchema } from '@lcap/extension-shared/lib/project';
export * as SchemaUtils from '@lcap/extension-shared/lib/utils/schema-utils';
export { addTypeMap } from '@lcap/extension-shared/lib/utils/add-type';
