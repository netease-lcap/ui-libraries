import { ElTransfer as ElTransferPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';


const ElTransfer = registerComponent(ElTransferPlus, { plugin: basicsPlugin });
const ElFormElTransfer = withFormItem(ElTransfer, 'el-form-date-picker');
export { ElTransfer, ElFormElTransfer };
export default ElTransfer;