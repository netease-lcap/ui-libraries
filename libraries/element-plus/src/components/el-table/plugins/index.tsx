import { watch, ref } from 'vue';
import { ElPagination } from 'element-plus';
import _ from 'lodash';

import fp from 'lodash/fp';
import { $deletePropsList } from '@/plugins/constants';

import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';

function useControllableValue(props, options, { useState }) {
  const [value, setValue] = useState('');
  const { valuePropsName, tigger = `onUpdate${valuePropsName}:` } = options;
  const isControlled = props.has(valuePropsName);
  console.log(valuePropsName, tigger, isControlled, 'hooks==');
  const [myValue, mySetValue] = isControlled ? [props.get(valuePropsName), props.get(tigger)] : [value, setValue];
  return [myValue, mySetValue];
}
export function handleDataSource(props, { useState, useEffect, useMemo }) {
  const dataConfig = props.get('dataSource');

  const pagination = props.get('pagination');
  const onBefore = props.get('onBefore', () => { });
  const onSuccess = props.get('onSuccess', () => { });
  const current = props.get('page', 1);
  const pageSizeProps = props.get('pageSize', 10);

  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {
    onBefore: (params) => _.attempt(onBefore, params),
    onSuccess: (data, params) => _.attempt(onSuccess, data, params),
    defaultParams: [
      { current, pageSize: pageSizeProps },
    ],
  }, { useState, useEffect, useMemo });

  const warpList = _.cond([
    [Array.isArray, (list) => ({ list, total: list.length })],
    [_.isPlainObject, (data) => data],
    [_.conforms({ list: _.isArray }), _.identity],
    [fp.stubTrue, fp.constant({ list: [], total: 0 })],
  ]) as (Target: {
    list: unknown;
  }) => {
    list: any;
    total: number;
  };

  const selfRef = useMemo(() => _.assign(ref, { reload, data }), [data, reload, ref]);
  const dataSourceResult = _.isEmpty(data) ? {} : { options: data };

  return {
    ref: selfRef,
    loading,
    ...dataSourceResult,
  };
}
export function handlePage(props, { useState }) {
  const Component = props.get('render');
  const [currentPage, setpage] = useControllableValue(props, {
    valuePropsName: 'current-page',
  }, { useState });
  console.log(currentPage, '==');
  const a = ref(2);
  return {
    render: (props) => {
      return [
        <div>
          <Component {...props} v-slots={props.slots} />
          <ElPagination default-current-page={a} style={{ float: 'right', marginTop: '8px' }} layout="prev, pager, next,total" total={50} />
        </div>,
      ];
    },
  };
}
