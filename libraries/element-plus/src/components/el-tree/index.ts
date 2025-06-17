import { ElTree as ElTreePlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

function ElTreeRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTree = registerComponent(ElTreePlus, { plugin: basicsPlugin });
ElTree.BaseComponent = ElTreePlus;

export { ElTreePlus, ElTree, ElTreeRegister };
export default ElTree;
