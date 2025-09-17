import { ElTree as ElTreePlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/basic-plugins';

function ElTreeRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTree = registerComponent(ElTreePlus, { plugin: basicsPlugin, name: 'el-tree' });

export { ElTreePlus, ElTree, ElTreeRegister };
export default ElTree;
