import _ from 'lodash';
import { registerComponent } from '@/plugins';
import ElMultiLayoutPlus from './multi-layout';
import ElMultiLayoutItemPlus from './multi-layout-item';
import ElMultiLayoutMainHeadPlus from './multi-layout-main-head';
import ElMultiLayoutTopNavPlus from './multi-layout-top-nav';
import ElMultiLayoutBodyPlus from './multi-layout-body';
import ElMultiLayoutSidebarPlus from './multi-layout-sidebar';
import ElMultiLayoutMainPlus from './multi-layout-main';
import ElMultiLayoutMainBodyPlus from './multi-layout-main-body';

import basicsPlugin from './plugins/basic-plugins';
import itemPlugins from './plugins/item-plugins';
import mainHeadPlugins from './plugins/main-head-plugins';
import {
  topNavPlugins,
  bodyPlugins,
  sidebarPlugins,
  mainPlugins,
  mainBodyPlugins,
} from './plugins/part-plugins';

function ElMultiLayoutRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElMultiLayout = registerComponent(ElMultiLayoutPlus, { plugin: basicsPlugin, name: 'el-multi-layout' });
const ElMultiLayoutItem = registerComponent(ElMultiLayoutItemPlus, {
  plugin: itemPlugins,
  name: 'el-multi-layout-item',
});
const ElMultiLayoutMainHead = registerComponent(ElMultiLayoutMainHeadPlus, {
  plugin: mainHeadPlugins,
  name: 'el-multi-layout-main-head',
});
const ElMultiLayoutTopNav = registerComponent(ElMultiLayoutTopNavPlus, {
  plugin: topNavPlugins,
  name: 'el-multi-layout-top-nav',
});
const ElMultiLayoutBody = registerComponent(ElMultiLayoutBodyPlus, {
  plugin: bodyPlugins,
  name: 'el-multi-layout-body',
});
const ElMultiLayoutSidebar = registerComponent(ElMultiLayoutSidebarPlus, {
  plugin: sidebarPlugins,
  name: 'el-multi-layout-sidebar',
});
const ElMultiLayoutMain = registerComponent(ElMultiLayoutMainPlus, {
  plugin: mainPlugins,
  name: 'el-multi-layout-main',
});
const ElMultiLayoutMainBody = registerComponent(ElMultiLayoutMainBodyPlus, {
  plugin: mainBodyPlugins,
  name: 'el-multi-layout-main-body',
});

export {
  ElMultiLayoutRegister,
  ElMultiLayout,
  ElMultiLayoutItem,
  ElMultiLayoutMainHead,
  ElMultiLayoutTopNav,
  ElMultiLayoutBody,
  ElMultiLayoutSidebar,
  ElMultiLayoutMain,
  ElMultiLayoutMainBody,
};
export const ElMultiLayoutBasicsPlugin = basicsPlugin;
export const ElMultiLayoutItemBasicsPlugin = itemPlugins;
export const ElMultiLayoutMainHeadBasicsPlugin = mainHeadPlugins;
export const ElMultiLayoutTopNavBasicsPlugin = topNavPlugins;
export const ElMultiLayoutBodyBasicsPlugin = bodyPlugins;
export const ElMultiLayoutSidebarBasicsPlugin = sidebarPlugins;
export const ElMultiLayoutMainBasicsPlugin = mainPlugins;
export const ElMultiLayoutMainBodyBasicsPlugin = mainBodyPlugins;
export default ElMultiLayout;
