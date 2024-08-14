import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import Iframe from './iframe';
import * as plugins from './plugins';

export const ElIframe = registerComponent(Iframe, plugins);

export default ElIframe;
