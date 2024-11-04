import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'Pagination';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    return {
      id: componentNode.id,
      code: `
  <el-pagination-pro
      style="${styleStr}"
  />
`,
    };
  },
  name: '分页器',
  reason: '进行分页',
  tag: 'el-pagination-pro',
};
