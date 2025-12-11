/* eslint-disable no-shadow */
import _ from 'lodash';
import { ElSelectV2, SelectProps } from 'element-plus';
import { CSSProperties } from 'vue';
import { getPropsIcon } from '@/plugins/common/icon';
import { useMemo, useCallback, useEffect } from '@/plugins/hooks';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { ElOption } from '../index';
import { getIsPreview, getRender } from '@/plugins/common/preview';
import { ElPreview } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { handleComponentInForm } from '@/components/el-form/plugins/form-item';
import { handleControllableValue } from '@/plugins/common/index';
import { IIdePluginBase } from '@/types';

const SelectBasicAccumulate = new PluginAccumulateTypes<
  nasl.ui.ElSelectOptions<any, any, any, any, any>,
  typeof SelectProps & IIdePluginBase
>();
export default SelectBasicAccumulate.addPlugin({
  name: 'handleTagName',
  handle() {
    return {
      formTagName: 'el-form-select',
      tagName: 'el-select',
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
      const textField = props.get('textField') || 'label';
      const valueField = props.get('valueField') || 'value';
      const descriptionField = props.get('descriptionField') || 'description';
      const onSuccess = props.get('onSuccess', () => {});
      const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField, ['formTagName'], 'data');
      const ref = props.get('ref');
      const {
        data,
        run: reload,
        loading,
      } = useRequestDataSource(dataConfig, {
        onSuccess,
      });
      const dataSource = useHandleMapField({
        textField,
        valueField,
        dataSource: useFormatDataSource(data),
        fieldsMap: {
          description: descriptionField,
        },
      });
      const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

      return {
        [$deletePropsList]: deletePropsList,
        ref: selfRef,
        loading,
        data: dataSource,
      };
    },
  })
  // .addPlugin({
  //   name: 'handleMaxCount',
  //   handle(props) {
  //     const maxCount = props.get('maxCount');
  //     const multiple = props.get('multiple');
  //     const modelValue = props.get('modelValue');
  //     const dataProps = props.get('data');
  //     const isDataProps = multiple && maxCount > 0 && !_.isEmpty(dataProps) && _.isArray(modelValue) && modelValue.length > maxCount;
  //     const data = useMemo(
  //       () => (isDataProps
  //           ? _.map(dataProps, (item) => ({
  //               ...item,
  //               disabled: !_.includes(modelValue, item.value),
  //             }))
  //           : _.map(dataProps, (item) => _.assign(item, { disabled: false }))),
  //       [isDataProps, dataProps],
  //     );
  //     return {
  //       maxCount,
  //       data,
  //     };
  //   },
  // })
  .addPlugin({
    name: 'handleValueNotInData',
    handle(props) {
      const selectedValuesData = props.get('selectedValuesData');
      const data = props.get('data', []);
      if (_.isEmpty(selectedValuesData) || _.isEmpty(data)) return {};
      return {
        data: _.unionBy(data, selectedValuesData, 'value'),
      };
    },
  })
  .addPlugin({
    name: 'handleSlotRender',
    handle(props) {
      const dataConfig = props.get('dataSource');
      const slots = props.get('slots');
      const data = props.get('data');
      const optionSlot = props.get('optionSlot');
      const dataSourceSlots = _.isNil(dataConfig)
        ? {}
        : {
            default: () => _.map(data, (item, index) => (
              <ElOption {...item}>
                {optionSlot ? slots?.item?.({ index, item: item?.itemSource ?? item } as any) : item.label}
                {item.description && (
                <el-text
                  style={{ display: 'block', height: '14px', lineHeight: '14px' } as CSSProperties}
                  color="secondary"
                  text={item.description}
                />
                  )}
              </ElOption>
              )),
          };
      return {
        slots: _.assign({}, slots, dataSourceSlots),
      };
    },
  })

  .addPlugin({
    name: 'handleVirtualize',
    handle(props) {
      const slots = props.get('slots');
      const virtualize = props.get('virtualize');
      const data = props.get('data') ?? [];
      const render = useCallback((props) => <ElSelectV2 {...props} />, []);
      const result = useMemo(() => {
        return virtualize
          ? {
              options: data,
              render,
              slots: _.omit(slots, 'default'),
            }
          : {};
      }, [virtualize, data, render]);
      return result;
    },
  })
  .addPlugin({
    name: 'handlePreview',
    handle(props) {
      const ref = props.get('ref');
      const Component = props.get('render');
      const isPreview = getIsPreview(props);
      const data = props.get('data');
      const modelValue = props.get('modelValue');
      const valueList = _.isArray(modelValue) ? modelValue : [modelValue];
      const previewText = _.join(
        _.map(valueList, (item) => _.get(_.find(data, { value: item }), 'label', '')),
        ',',
      );

      const previewRender = (insProps) => {
        const inIDE = !!props.get('data-nodepath');
        const previewText = inIDE || _.isEmpty(insProps.previewText) ? '-' : insProps.previewText;
        return <ElPreview text={previewText} />;
      };

      const { render, insRef } = getRender(Component, previewRender, isPreview);

      return {
        ref: Object.assign(ref, _.omit(insRef.value, ['reload', 'data'])),
        render,
        preview: isPreview,
        previewText,
      };
    },
  })
  .addPlugin({
    name: 'handleMcp',
    handle(props) {
      const refId = props.get('data-ref-id');
      const setValue = props.get('setValue');
      useEffect(() => {
        if (window?.UiLibrariesMcp?.subscribe) {
          window.UiLibrariesMcp.subscribe('el_select__change', refId, (value) => _.attempt(setValue, value));
        }
        return () => {
          if (window?.UiLibrariesMcp?.unsubscribe) {
            window.UiLibrariesMcp.unsubscribe('el_select__change', refId);
          }
        };
      }, []);
      return {};
    },
  })
  .addPlugin({
    name: 'handleRemote',
    handle(props) {
      const remote = props.get('remote');
      if (!remote) return {};
      const emit = props.get('emit');
      const remoteMethodProps = props.get('remoteMethod');
      const onBeforeFilter = props.get('onBeforeFilter', () => {});
      const ref = props.get('ref');
      const remoteMethod = _.wrap(remoteMethodProps, (fn, query: string) => {
        emit('sync:state', 'filterText', query);
        _.attempt(onBeforeFilter, { filterText: query });
        _.attempt(ref?.reload);
        _.attempt(fn, query);
      });
      return {
        remoteMethod,
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle(props) {
      const emit = props.get('emit');
      const data = props.get('data');
      const disabled = props.get('disabled');
      const preview = props.get('preview');
      useEffect(() => {
        emit('sync:state', 'data', data);
        emit('sync:state', 'total', data.length);
        emit('sync:state', 'disabled', disabled);
        emit('sync:state', 'preview', preview);
      }, [data, disabled, preview]);
      return {};
    },
  })
  .addPlugin({
    name: 'handleIcon',
    handle(props) {
      const suffixIcon = props.get('suffixIcon');
      return {
        suffixIcon: getPropsIcon({ name: suffixIcon }),
      };
    },
  });
