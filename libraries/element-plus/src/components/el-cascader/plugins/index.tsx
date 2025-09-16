/* eslint-disable no-shadow */
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { ElPreview } from '@/index';

export * from './ide';
export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export { handleControllableValue } from '@/plugins/common/index';

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
  const TreeData = useMemo(() => useDataSourceToTree(dataSource, parentField, valueField), [dataSource]);
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
  const propsProps = props.get('props');

  return {
    props: {
      multiple,
      checkStrictly,
      ...(_.isObject(propsProps) ? propsProps : {}),
    },
  };
}

export function handlePreview(props) {
  const ref = props.get('ref');
  const Component = props.get('render');
  const isPreview = getIsPreview(props);

  const previewRender = (insProps, { attrs }) => {
    const getPathText = (options, path) => {
      if (path.length === 0 || options.length === 0) return '-';
      let currentLevel = options;
      const pathTexts: string[] = [];
      for (const val of path) {
        const node = currentLevel.find((opt) => opt.value === val);
        if (node) {
          pathTexts.push(node.label || '');
          currentLevel = node.children || [];
        } else {
          break;
        }
      }
      return pathTexts.join(separator);
    };
    const getListPreviewText = (data, modelValue) => {
      if (modelValue.length === 0) return '-';
      if (!multiple) {
        return getPathText(data, modelValue);
      }
      return modelValue
        .filter(_.isArray)
        .map((path) => getPathText(data, path))
        .join(', ');
    };

    const multiple = props.get('multiple', false);
    const separator = props.get('separator', ' / ');
    const inIDE = !!props.get('data-nodepath');
    const { options = [], modelValue = [] } = insProps;
    const previewText = inIDE ? '-' : getListPreviewText(options, modelValue);
    return <ElPreview text={previewText} />;
  };

  const { render, insRef } = getRender(Component, previewRender, isPreview);
  return {
    ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
    render,
  };
}
