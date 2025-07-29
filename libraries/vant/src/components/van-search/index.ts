import { Search as VantSearch } from 'vant';
import _ from 'lodash';
import { defineComponent } from 'vue';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

import './index.css';

function VanSearchRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanSearch = registerComponent(VantSearch, { plugin: basicPlugin, name: 'van-search' });
export { VantSearch, VanSearch, VanSearchRegister };

export default VanSearch; 