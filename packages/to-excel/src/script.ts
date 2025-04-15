import { toExcel } from './toExcel';

Promise.all([
  toExcel('组件总表（PC+H5）'),
  toExcel('组件总表（ElementUI）', { pc: 'element-ui' }),
  toExcel('组件总表（ElementPlus）', { pc: 'element-plus' }),
]);
