import { Search as VantSearch } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';

import './index.css';

function VanSearchRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanSearch = registerComponent(VantSearch, { plugin: basicPlugin, name: 'van-search' });

const VanFormSearch = withFormItem(VanSearch, 'van-form-search');

export { VantSearch, VanSearch, VanSearchRegister, VanFormSearch };

export default VanSearch;
