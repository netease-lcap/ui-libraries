import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import { useMemo, useEffect } from '@/plugins/hooks';

export function handleNodePath(props) {
  const slots = props.get('slots');
  const content = slots?.default?.() || [];
  console.log(content);
}
