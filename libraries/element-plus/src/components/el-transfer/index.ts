import { ElTransfer as ElTransferPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';

function ElTransferRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTransfer = registerComponent(ElTransferPlus, { plugin: basicsPlugin, name: 'el-transfer' });
const ElFormTransfer = withFormItem(ElTransfer, 'el-form-transfer');

export { ElTransferPlus, ElTransfer, ElFormTransfer, ElTransferRegister };
export default ElTransfer;
