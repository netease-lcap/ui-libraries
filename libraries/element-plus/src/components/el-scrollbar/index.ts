import { ElScrollbar as ElScrollbarPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

import 'element-plus/theme-chalk/el-scrollbar.css';

const ElScrollbar = registerComponent(ElScrollbarPlus, { plugin: basicPlugin });
export default ElScrollbar;

export { ElScrollbar };
