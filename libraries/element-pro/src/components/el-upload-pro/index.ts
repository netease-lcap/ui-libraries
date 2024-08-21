import { Upload } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';

export const ElUploadPro = registerComponent(Upload, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElUploadPro;
