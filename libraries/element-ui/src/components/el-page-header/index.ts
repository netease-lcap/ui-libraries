import PageHeader from 'element-ui/lib/page-header';

import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElPageHeader = registerComponent(PageHeader, plugins, {
  nativeEvents: [],
  slotNames: ['title', 'content'],
  methodNames: [],
});

export default ElPageHeader;
