import _Tag from './tag';
import _CheckTag from './check-tag';
import _CheckTagGroup from './check-tag-group';
import withInstall from '../utils/withInstall';
import { ElTagProps, ElCheckTagProps, ElCheckTagGroupProps } from './type';

import './style';

export * from './type';

export type TagProps = ElTagProps;
export type CheckTagProps = ElCheckTagProps;
export type CheckTagGroupProps = ElCheckTagGroupProps;

export const Tag = withInstall(_Tag);
export const CheckTag = withInstall(_CheckTag);
export const CheckTagGroup = withInstall(_CheckTagGroup);

export default Tag;
