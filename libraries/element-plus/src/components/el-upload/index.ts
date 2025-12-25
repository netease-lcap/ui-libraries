import { ElUpload as ElUploadPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicPlugin from './plugins/basic-plugins';
import { withFormItem } from '@/components/el-form';
import './index.css';

function ElUploadRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElUpload = registerComponent(ElUploadPlus, {
  plugin: basicPlugin,
});

const ElFormUpload = withFormItem(ElUpload, 'el-form-upload');

export default ElUpload;

export { ElUploadPlus, ElUpload, ElFormUpload, ElUploadRegister };
export const ElUploadBasicsPlugin = basicPlugin;
