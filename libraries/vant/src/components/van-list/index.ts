import { List as VantList } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

import './index.less';

function VanListRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanList = registerComponent(VantList, { plugin: basicPlugin, name: 'van-list' });

export { VantList, VanList, VanListRegister };

export default VanList;
