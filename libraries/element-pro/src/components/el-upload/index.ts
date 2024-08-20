import { Upload } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElUploadPro = registerComponent(Upload, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElUploadPro;
