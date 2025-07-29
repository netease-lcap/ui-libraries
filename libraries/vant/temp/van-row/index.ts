import { Row as VantRow, Col as VantCol } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
// import * as basicsPlugin from './plugins/index';
import * as columnPlugin from './plugins/col-plugins';

function VanColRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(columnPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanRow = VantRow;
const VanCol = registerComponent(VantCol, { plugin: columnPlugin, name: 'van-col' });

export { VantRow, VantCol, VanRow, VanCol, VanColRegister }; 