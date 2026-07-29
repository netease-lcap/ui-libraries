/* eslint-disable no-shadow */
import _ from 'lodash';
import { DrawerProps } from 'element-plus';
import { $deletePropsList, $dataSourceDeleteField } from '@/plugins/constants';
import { useRequestDataSource, useHandleMapField, useFormatDataSource } from '@/plugins/common/dataSource';
import { useMemo, useSyncState, useCallback } from '@/plugins/hooks';
import { ElDropdownMenu, ElDropdownItem, ElText } from '@/index';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

const DropdownBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElDropdownOptions<any, any>, DrawerProps>();

export default DropdownBasicAccumulate.addPlugin({
  name: 'handleDefaultSlot',
  handle(props) {
    const slots = props.get('slots');
    return {
      slots: {
        ...slots,
        default: slots.default ? () => <div style={{ width: 'auto' }}>{slots.default()}</div> : undefined,
      },
    };
  },
})
  .addPlugin({
    name: 'handleDataSource',
    handle(props) {
      const dataConfig = props.get('dataSource');
      const textField = props.get('textField', 'text');
      const valueField = props.get('valueField', 'value');
      const disabledField = props.get('disabledField', 'disabled');
      const dividedField = props.get('dividedField', 'divided');
      const deletePropsList = props.get($deletePropsList).concat($dataSourceDeleteField);
      const ref = props.get('ref');
      const slots = props.get('slots');
      const { data, run: reload, loading } = useRequestDataSource(dataConfig, {});
      const dataSource = useHandleMapField({
        value: 'command',
        textField,
        valueField,
        dataSource: useFormatDataSource(data),
        fieldsMap: {
          divided: dividedField,
          disabled: disabledField,
        },
      });
      const selfRef = useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
      // TODO
      const condSlotRender = useCallback(
        _.cond([
          [
            _.conforms({
              dataConfig: (dataConfig) => !!dataConfig,
              slotsItems: _.stubTrue,
              dataSource: _.stubTrue,
              slotsDropdown: _.stubTrue,
            }),
            ({ dataSource }) => {
              return (
                <ElDropdownMenu>
                  {dataSource.map((item) => (
                    <ElDropdownItem key={item.value} {...item}>
                      <ElText text={item.label} />
                    </ElDropdownItem>
                  ))}
                </ElDropdownMenu>
              );
            },
          ],
          [
            _.conforms({
              slotsItems: (slotsItems) => !!slotsItems,
            }),
            ({ slotsItems }) => {
              return <ElDropdownMenu>{slotsItems()}</ElDropdownMenu>;
            },
          ],
          [
            _.stubTrue,
            ({ slotsDropdown }) => {
              return slotsDropdown?.();
            },
          ],
        ]),
        [],
      );
      const dropdownSlotRender = useCallback(() => {
        if (dataConfig) {
          return (
            <ElDropdownMenu>
              {dataSource.map((item) => (
                <ElDropdownItem key={item.value} {...item}>
                  <ElText text={item.label} />
                </ElDropdownItem>
              ))}
            </ElDropdownMenu>
          );
        }
        if (slots.items) {
          return <ElDropdownMenu>{slots.items()}</ElDropdownMenu>;
        }
        return slots.dropdown?.();
      }, [dataConfig, dataSource, slots.items, slots.dropdown]);
      // const slotDropdown = useMemo(
      //   () => condSlotRender({ dataConfig, dataSource, slotsItems: slots.items, slotsDropdown: slots.dropdown }),
      //   [condSlotRender, dataConfig, dataSource, slots],
      // );

      return {
        [$deletePropsList]: deletePropsList,
        ref: selfRef,
        loading,
        data,
        slots: {
          ...slots,
          dropdown: dropdownSlotRender,
          // condSlotRender({ dataConfig, dataSource, slotsItems: slots.items, slotsDropdown: slots.dropdown }),
        },
      };
    },
  })
  .addPlugin({
    name: 'handleSyncState',
    handle(props) {
      const data = props.get('data');
      const emit = props.get('emit');
      emit('sync:state', 'data', data);
      useSyncState(props, 'disabled');
      return {};
    },
  });
