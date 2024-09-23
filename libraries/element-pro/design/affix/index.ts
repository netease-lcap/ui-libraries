import _Affix from './affix';
import withInstall from '../utils/withInstall';
import { ElAffixProps } from './type';

import './style';

export const Affix = withInstall(_Affix);

export * from './type';
export type AffixProps = ElAffixProps;
export default Affix;
