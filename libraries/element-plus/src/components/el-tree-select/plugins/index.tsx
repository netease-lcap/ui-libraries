import _ from 'lodash';
import { TreeOptionProps } from 'element-plus';
import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';
import { $deletePropsList } from '@/plugins/constants';
import { useMemo } from '@/plugins/hooks';
import { getIsPreview, getRender, getTreePreviewText } from '@/plugins/common/preview';
import { ElPreview } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import idePlugin from './ide';

import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';

const TreeSelectBasicAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElTreeSelectOptions<any, any, any, any, any>,
  TreeOptionProps
>();
export default TreeSelectBasicAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleDataSource',
    handle() {
      return {
        formTagName: 'el-form-tree-select',
        tagName: 'el-tree-select',
      };
    },
  })
  .addPlugin({
    name: 'handleComponentInForm',
    handle: handleComponentInForm,
  })
  .addPlugin({
    name: 'handleControllableValue',
    handle: handleControllableValue,
  })
  .addPlugin({
    name: 'handleDataSource',
    handle(props) {
      const dataConfig = props.get('dataSource');
      const textField = props.get('textField', 'label');
      const valueField = props.get('valueField', 'value');
      const parentField = props.get('parentField');
      const deletePropsList = props
        .get($deletePropsList)
        .concat(['data-nodepath', 'textField', 'valueField', 'parentField', 'childrenField']);
      const ref = props.get('ref');
      const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
      const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
      const TreeData = useMemo(() => useDataSourceToTree(dataSource, parentField, valueField), [dataSource]);
      const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
      const dataSourceResult = _.isEmpty(TreeData) ? {} : { data: TreeData };

      return {
        [$deletePropsList]: deletePropsList,
        ref: selfRef,
        loading,
        ...dataSourceResult,
      };
    },
  })
  .addPlugin({
    name: 'handlePreview',
    handle(props) {
      const ref = props.get('ref');
      const Component = props.get('render');
      const isPreview = getIsPreview(props);

      const previewRender = (insProps) => {
        const inIDE = !!props.get('data-nodepath');
        const textField = props.get('textField', 'label');
        const valueField = props.get('valueField', 'value');
        const value = getTreePreviewText(
          textField,
          valueField,
          insProps.data,
          _.compact(_.castArray(insProps.modelValue)),
        );
        const previewText = inIDE ? '-' : value;
        return <ElPreview text={previewText} />;
      };
      const { render, insRef } = getRender(Component, previewRender, isPreview);

      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
      };
    },
  });
