import { ElUpload as ElUploadPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import { withFormItem } from '@/components/el-form';

import 'element-plus/theme-chalk/el-upload.css';

const ElUpload = registerComponent(ElUploadPlus, {
  plugin: basicPlugin,
});

const ElFormUpload = withFormItem(ElUpload, 'el-form-upload');

export default ElUpload;

export { ElUpload, ElFormUpload };
