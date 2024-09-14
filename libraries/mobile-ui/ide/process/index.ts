import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from './utils';

import { genCreateBlock } from './genCreateBlock';
import { genApproveBlock } from './genApproveBlock';

export default {
  apply: {
    title: '一键生成申请页',
    genBlock: (
      entity: naslTypes.Entity,
      parentElement: naslTypes.ViewElement,
      process: ProcessV2,
    ) => genCreateBlock(entity, parentElement, process),
  },
  approve: {
    title: '一键生成申请页',
    genBlock: (
      entity: naslTypes.Entity,
      parentElement: naslTypes.ViewElement,
      process: ProcessV2,
    ) => genApproveBlock(entity, parentElement, process),
  },
};
