/* eslint-disable no-shadow */
import _ from 'lodash';
import { ElDropdownMenu, ElDropdownItem } from '../index';
import ElText from '../../el-text';
import { h } from 'vue';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';

export function useExtendsPlugin(props) {
  const slots = props.get('slots');

  return {
    slots: {
      ...slots,
      dropdown: () => {
        const data = props.get('data') || [];
        const textField = props.get('textField', 'text');
        const valueField = props.get('valueField', 'value');
        const iconField = props.get('iconField', 'icon');

        const { dropdown: slotDropdown, items: slotItems } = slots;
        const itemProps = props.get('itemProps') || (() => ({}));

        let itemVNodes = _.isFunction(slotItems) ? slotItems() : [];
        if ((!slotItems || !Array.isArray(itemVNodes) || itemVNodes.length === 0) && data.length === 0) {
          return _.isFunction(slotDropdown) ? slotDropdown() : [];
        }

        if (!_.isNil(props.get('dataSource'))) {
          itemVNodes = [];
          itemVNodes.push(
            ...data.map((item, i) => {
              const [text, value, icon] = _.at(item, textField, valueField, iconField);
              let itemAttrs: any = {};
              if (typeof itemProps === 'function') {
                itemAttrs = itemProps({
                  item,
                  index: i,
                });
              }

              return h(
                ElDropdownItem,
                {
                  ...itemAttrs,
                  command: value,
                  icon,
                },
                [h(ElText, { text: text as string })],
              );
            }),
          );
        }

        return [h(ElDropdownMenu, {}, itemVNodes)];
      },
      default: () => {
        const splitButton = props.get('splitButton');
        if (splitButton) {
          const text = props.get('text', '下拉菜单');
          return [h('span', {}, text)];
        }

        const slotDefault = slots?.default;
        const vNodes = _.isFunction(slotDefault) ? slotDefault() : [];

        return Array.isArray(vNodes) ? vNodes.filter((n) => n?.type) : [];
      },
    },
  };
}
useExtendsPlugin.order = 5;

export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'text');
  const valueField = props.get('valueField', 'value');
  const slots = props.get('slots');
  const deletePropsList = props.get($deletePropsList, []).concat($dataSourceDeleteField);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});

  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    data,
  };
}
