/* eslint-disable no-shadow */
import _ from 'lodash';
import { ElTabPane, TabsProps } from 'element-plus';
import { useControllableValue, useMemo } from '@/plugins/hooks';
import { $router, $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { getPropsIcon } from '@/plugins/common/icon';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const TabsAccumulate = new PluginAccumulateTypes<nasl.ui.ElTabsOptions<any, any>, TabsProps>();

export default TabsAccumulate.addPlugin({
  name: 'handleDataSource',
  handle(props) {
    const dataConfig = props.get('dataSource');
    const textField = props.get('titleField', 'label');
    const valueField = props.get('valueField') || 'value';
    const slots = props.get('slots');
    const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
    const ref = props.get('ref');

    const onBefore = props.get('onBefore', () => {});
    const onSuccess = props.get('onSuccess', () => {});
    const onTabClick = props.get('onTabClick') ?? (() => {});

    const {
      data,
      run: reload,
      loading,
    } = useRequestDataSource(dataConfig, {
      onBefore: (params) => _.attempt(onBefore, params),
      onSuccess: (data, params) => _.attempt(onSuccess, data, params),
    });
    const dataSource = useHandleMapField({
      textField,
      valueField,
      value: 'name',
      dataSource: useFormatDataSource(data),
    });
    const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

    const [, , updateVal] = useControllableValue(props);

    const dataSourceSlots = useMemo(
      () => (_.isNil(dataConfig)
          ? {}
          : {
              default: () => _.map(dataSource, (item) => (
                <ElTabPane
                  {...item}
                  v-slots={{
                      label: () => slots?.label?.({ item: item?.itemSource ?? item } as any),
                      default: () => slots?.content?.({ item: item?.itemSource ?? item } as any),
                    }}
                />
                )),
            }),
      [dataConfig, dataSource, textField, valueField, slots],
    );

    return {
      [$deletePropsList]: deletePropsList,
      ref: selfRef,
      loading,
      data,
      slots: _.assign(slots, dataSourceSlots),
      ...updateVal,
      onTabClick: _.wrap(onTabClick, (fn, ...args) => {
        _.attempt(fn, ...args);
      }),
    };
  },
})
  .addPlugin({
    name: 'handleValue',
    handle(props) {
      const beforeChange = props.get('onBeforeChange', () => true);
      const afterChange = props.get('onAfterChange', () => {});
      const routerMeta = props.get($router);
      const router = props.get('router');
      const [value, setValue, valueProps] = useControllableValue(props, {
        beforeChange,
        afterChange,
        onChange: (value) => {
          if (router) {
            routerMeta.push(value);
          }
        },
      });
      return {
        ...valueProps,
      };
    },
  })
  .addPlugin({
    name: 'handleAddIcon',
    handle(props) {
      const addIcon = props.get('addIcon');
      const slots = props.get('slots');
      const onEdit = props.get('onEdit', () => {});
      const onBeforeRemove = props.get('onBeforeRemove', () => {});
      const onAfterRemove = props.get('onAfterRemove', () => {});
      return {
        slots: _.assign(slots, {
          'add-icon': () => getPropsIcon({ name: addIcon }),
        }),
        onEdit: _.wrap(onEdit, (fn, paneName, action) => {
          if (action === 'remove') {
            _.attempt(onBeforeRemove, { value: paneName });
          }
          _.attempt(fn, { value: paneName, action });
          if (action === 'remove') {
            _.attempt(onAfterRemove, { value: paneName });
          }
        }),
      };
    },
  });
