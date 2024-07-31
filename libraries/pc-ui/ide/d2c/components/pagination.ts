import { ComponentConfig } from '../types';

const pagination: ComponentConfig = {
  type: 'Pagination',
  generateCode: (componentNode) => {
    const { width } = componentNode.bound;
    const { height } = componentNode.bound;
    return {
      id: componentNode.id,
      tag: 'u-pagination',
      code: `
<u-pagination 
    style="width: ${width}px; height: ${height}px;"
    :totalItems="75" :showTotal="true" :showSizer="true" :showJumper="true" :pageSizeOptions="[40,50,100]" 
/>`,
      name: '分页器',
      reason: '进行分页',
    };
  },
};

export default pagination;
