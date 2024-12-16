import { Upload } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import { WithFormItem } from '../el-form-pro';
import { TAG_NAME, FORM_TAG_NAME } from './constants';

export const ElUploadPro = registerComponent(Upload, plugins, {
  name: TAG_NAME,
  nativeEvents: [],
  slotNames: [],
  methodNames: ['triggerUpload', 'uploadFiles'],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});

export const ElFormUploadPro = WithFormItem(ElUploadPro, { name: FORM_TAG_NAME });
export default ElUploadPro;
