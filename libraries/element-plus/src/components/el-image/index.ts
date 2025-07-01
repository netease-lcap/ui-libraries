import { ElImage as ElImagePlus, ElImageViewer as ElImageViewerPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import * as previewPlugin from './plugins/preview-plugins';

function ElImageRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElImageViewerRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(previewPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElImage = registerComponent(ElImagePlus, { plugin: basicPlugin, name: 'el-image' });
const ElImageViewer = registerComponent(ElImageViewerPlus, { plugin: previewPlugin, name: 'el-image-viewer' });

export default ElImage;

export { ElImagePlus, ElImageViewerPlus, ElImage, ElImageViewer, ElImageRegister, ElImageViewerRegister };
