import { ElImage as ElImagePlus, ElImageViewer as ElImageViewerPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import * as previewPlugin from './plugins/preview-plugins';


const ElImage = registerComponent(ElImagePlus, { plugin: basicPlugin });
const ElImageViewer = registerComponent(ElImageViewerPlus, { plugin: previewPlugin });

export default ElImage;

export { ElImage, ElImageViewer };
