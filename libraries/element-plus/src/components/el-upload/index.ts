import { ElUpload as ElUploadPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

import 'element-plus/theme-chalk/el-upload.css';

const ElUpload = registerComponent(ElUploadPlus, {
  plugin: basicPlugin,
});
export default ElUpload;

export { ElUpload };
