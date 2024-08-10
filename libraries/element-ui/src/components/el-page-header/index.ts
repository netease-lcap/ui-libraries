import PageHeader from 'element-ui/lib/page-header';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElPageHeader = registerComponent(PageHeader, plugins, {
  nativeEvents: [],
  slotNames: ['title', 'content'],
  methodNames: [],
});

export default ElPageHeader;
