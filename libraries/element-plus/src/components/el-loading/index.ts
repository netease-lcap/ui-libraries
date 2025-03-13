import Loading from './loading';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElLoading = registerComponent(Loading, { plugin: basicsPlugin });
export default ElLoading;
