import {
  ComponentCodeGen,
} from '../common';

const type = 'Pagination';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    return {
      id: componentNode.id,
      code: `
  <el-pagination
      style=""
      :totalItems="75" :showTotal="true" :showSizer="true" :showJumper="true" :pageSizeOptions="[40,50,100]" 
  />
`,
    };
  },
  name: '分页器',
  reason: '进行分页',
  tag: 'el-pagination',
};
