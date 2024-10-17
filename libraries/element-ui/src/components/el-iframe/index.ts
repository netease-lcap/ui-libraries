import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import Iframe from './iframe';
import * as plugins from './plugins';

export const ElIframe = registerComponent(Iframe, plugins);

export default ElIframe;
