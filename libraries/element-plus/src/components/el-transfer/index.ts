import { ElTransfer as ElTransferPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';

const ElTransfer = registerComponent(ElTransferPlus, { plugin: basicsPlugin });
const ElFormTransfer = withFormItem(ElTransfer, 'el-form-transfer');
export { ElTransfer, ElFormTransfer };
export default ElTransfer;
