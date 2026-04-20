import { ElTransfer as ElTransferPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/basic-plugins';
import { withFormItem } from '@/components/el-form';
import { $deletePropsList } from '@/plugins/constants';
import './index.css';

function ElTransferRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTransfer = registerComponent(ElTransferPlus, { plugin: basicsPlugin, name: 'el-transfer' });
const ElFormTransfer = withFormItem(ElTransfer, 'el-form-transfer');

export { ElTransferPlus, ElTransfer, ElFormTransfer, ElTransferRegister };
export const ElTransferBasicsPlugin = basicsPlugin;
export default ElTransfer;
