import { NoticeBar as VantNoticeBar } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanNoticeBarRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanNoticeBar = registerComponent(VantNoticeBar, {
  plugin: basicPlugin,
  name: 'van-notice-bar',
});

export { VanNoticeBar, VanNoticeBarRegister, VantNoticeBar };
export default VanNoticeBar;
