/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';
import { useEffect, useMemo } from '@/plugins/hooks';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const parentField = props.get('parentField');
  const deletePropsList = props
    .get($deletePropsList, [])
    .concat(['textField', 'valueField', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const TreeData = useDataSourceToTree(dataSource, parentField, valueField);
  const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
  const dataSourceResult = _.isEmpty(TreeData) ? {} : { options: TreeData };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
  };
}

export function handleCascaderProps(props) {
  const multiple = props.get('multiple', false);
  const checkStrictly = props.get('checkStrictly', false);

  return {
    props: {
      multiple,
      checkStrictly,
    },
  };
}

export function handleNodePath(props) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const nodeId = useMemo(() => _.uniqueId('Cascader_'), []);
  useEffect(() => {
    const node = document.querySelector(`.${nodeId}`);
    node?.setAttribute('data-nodepath', nodePath);
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    formTagName: 'el-form-cascader',
  };
}
