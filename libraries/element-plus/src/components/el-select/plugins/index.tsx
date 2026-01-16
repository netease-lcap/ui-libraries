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
import { addClass } from '@/utils';

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
      const isPreview = getIsPreview(props);
      const className = props.get('class');

      return isPreview
        ? {
            class: addClass(className, {
              'el-select-preview': !!isPreview,
            }),
            disabled: !!isPreview,
            preview: !!isPreview,
          }
        : {};
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
      const remoteMethodProps = props.get('remoteMethod') ?? (() => {});
      const onBeforeFilter = props.get('onBeforeFilter') ?? (() => {});
      const ref = props.get('ref');
      const remoteMethod = useCallback(
        (fn, query: string) => {
          emit('sync:state', 'filterText', query);
          _.attempt(onBeforeFilter, { filterText: query });
          _.attempt(ref?.reload);
          _.attempt(remoteMethodProps, query);
        },
        [remoteMethodProps, onBeforeFilter],
      );
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
      const onClickSuffix = props.get('onClickSuffix', () => {});
      return {
        suffixIcon: getPropsIcon({
          name: suffixIcon,
          onClick: (e: Event) => {
            _.attempt(onClickSuffix, e);
          },
        }),
      };
    },
  });
