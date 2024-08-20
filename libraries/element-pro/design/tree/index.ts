import _ElTree from './tree';
import { withInstall } from './adapt';

import './style';

export const Tree = withInstall(_ElTree);

export * from './tree-types';
export default Tree;
