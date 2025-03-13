import { ElImage as ElImagePlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

import 'element-plus/theme-chalk/el-image.css';

const ElImage = registerComponent(ElImagePlus, { plugin: basicPlugin });
export default ElImage;

export { ElImage };
