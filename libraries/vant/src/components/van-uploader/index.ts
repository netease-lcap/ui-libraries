import { Uploader as VantUploader } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

function VanUploaderRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanUploader = registerComponent(VantUploader, { plugin: basicPlugin, name: 'van-uploader' });
export { VanUploaderRegister, VanUploader, VantUploader };
export default VanUploader;
