import { Swipe as VantSwipe, SwipeItem as VantSwipeItem } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';
import * as basicPluginItem from './plugins/item';

function VanSwipeRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function VanSwipeItemRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanSwipe = registerComponent(VantSwipe, {
  plugin: basicPlugin,
  name: 'van-swipe',
});

const VanSwipeItem = registerComponent(VantSwipeItem, {
  plugin: basicPluginItem,
  name: 'van-swipe-item',
});

export { VanSwipe, VanSwipeRegister, VantSwipe, VanSwipeItem, VanSwipeItemRegister, VantSwipeItem };
export default VanSwipe;
