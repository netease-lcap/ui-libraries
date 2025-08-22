import { Sidebar, SidebarItem } from 'vant';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';
import './index.css';

// 注册组件
export const VanSidebar = registerComponent(Sidebar, {
  plugin: plugins,
  name: 'van-sidebar',
});

export const VanSidebarItem = SidebarItem;
// registerComponent(SidebarItem, {
//   plugin: plugins,
//   name: 'van-sidebar-item',
// });
export default VanSidebar;
