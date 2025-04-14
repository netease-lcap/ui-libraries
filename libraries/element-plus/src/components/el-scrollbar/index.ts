import { ElScrollbar as ElScrollbarPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';


const ElScrollbar = registerComponent(ElScrollbarPlus, { plugin: basicPlugin });
export default ElScrollbar;

export { ElScrollbar };
