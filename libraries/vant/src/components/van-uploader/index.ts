import { Uploader as VantUploader } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';
import * as basicPlugin from './plugins';
import './index.less';

function VanUploaderRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanUploader = registerComponent(VantUploader, { plugin: basicPlugin, name: 'van-uploader' });
const VanFormUploader = withFormItem(VanUploader, 'van-form-uploader');
export { VanUploaderRegister, VanUploader, VanFormUploader, VantUploader };
export default VanUploader;
