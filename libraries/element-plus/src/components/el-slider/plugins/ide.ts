import _ from 'lodash';
import { $deletePropsList, $ide } from '@/plugins/constants';
import { useEffect, useMemo } from '@/plugins/hooks';

export function handleNodePath(props) {
  return {
    formTagName: 'el-form-slider',
  };
}

handleNodePath.type = $ide;
