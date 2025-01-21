import Container from 'element-ui/lib/container';
import Header from 'element-ui/lib/header';
import Aside from 'element-ui/lib/aside';
import Footer from 'element-ui/lib/footer';
import Main from 'element-ui/lib/main';
import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElContainer = registerComponent(Container, plugins, {
  nativeEvents: [
    'click', 'dblclick', 'contextmenu',
    'mousedown', 'mouseup', 'mouseenter',
    'mouseleave', 'scroll',
  ],
  slotNames: ['default'],
  methodNames: [],
});
export const ElHeader = Header;
export const ElAside = registerComponent(Aside, {}, {
  nativeEvents: [
    'click', 'dblclick', 'contextmenu',
    'mousedown', 'mouseup', 'mouseenter',
    'mouseleave',
  ],
  slotNames: ['default'],
  methodNames: [],
});
export const ElFooter = Footer;
export const ElMain = registerComponent(Main, {}, {
  nativeEvents: [
    'click', 'dblclick', 'contextmenu',
    'mousedown', 'mouseup', 'mouseenter',
    'mouseleave', 'scroll',
  ],
  slotNames: ['default'],
  methodNames: [],
});

export default ElContainer;
