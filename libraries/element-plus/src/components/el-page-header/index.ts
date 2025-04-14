import { ElPageHeader as ElPageHeaderPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElPageHeader = registerComponent(ElPageHeaderPlus, { plugin: basicsPlugin });
export default ElPageHeader;
