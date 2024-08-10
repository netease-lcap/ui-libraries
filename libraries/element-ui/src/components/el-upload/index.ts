import Upload from 'element-ui/lib/upload';

import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElUpload = registerComponent(Upload, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'trigger', 'tip'],
  methodNames: ['clearFiles', 'abort', 'submit'],
});

export default ElUpload;
