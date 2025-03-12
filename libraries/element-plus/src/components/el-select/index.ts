import { ElSelect as ElSelectV2Plus, ElOption } from 'element-plus';
import 'element-plus/theme-chalk/el-select.css';
import type { ISelectProps } from 'element-plus';
import { registerComponent } from '@/plugins';
import { GetAccumulatedMapType } from '@/plugins/hooks';
import * as basicsPlugin from './plugins/index';
import { SelectAccumulateTypes } from './plugins/type';
import { withFormItem } from '@/components/el-form/plugins/form-item';
import './index.css';

const ElSelect = registerComponent<ISelectProps & GetAccumulatedMapType<typeof SelectAccumulateTypes>>(ElSelectV2Plus, {
  plugin: basicsPlugin,
});
const ElFormSelect = withFormItem(ElSelect, 'el-form-select');
// const ElSelect = ElSelectV2Plus;
export { ElSelect, ElOption, ElFormSelect };
export default ElSelect;
