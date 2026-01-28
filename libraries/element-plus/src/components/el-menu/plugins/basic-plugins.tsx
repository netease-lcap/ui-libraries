import _ from 'lodash';
import { h } from 'vue';
import { MenuProps } from 'element-plus';
import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';
import { useMemo, useControllableValue, useEffect } from '@/plugins/hooks';
import { $deletePropsList, $router, $route } from '@/plugins/constants';
import { ElSubMenu, ElMenuItem } from '@/components';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

import idePlugin from './ide';

const MenuBasicAccumulate = new PluginAccumulateTypes<nasl.ui.ElMenuOptions<any, any>, MenuProps>();
export default MenuBasicAccumulate.addAccumulate(idePlugin)
  .addPlugin({
    name: 'handleDataSource',
    handle: (props) => {
      const dataConfig = props.get('dataSource');
      const slots = props.get('slots');
      const textField = props.get('textField', 'label');
      const valueField = props.get('valueField', 'value');
      const parentField = props.get('parentField');
      const deletePropsList = props
        .get($deletePropsList)
        .concat(['textField', 'valueField', 'parentField', 'childrenField', 'dataSource']);
      const ref = props.get('ref');
      const { data, run: reload } = useRequestDataSource(dataConfig, {});
      const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
      const TreeData = useMemo(() => useDataSourceToTree(dataSource, parentField, valueField), [dataSource]);
      const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
      // TODO
      const renderMenuItem = (item) => {
        if (item.children && item.children.length) {
          return (
            <ElSubMenu
              index={_.get(item, valueField, '')}
              v-slots={{
                title: () => _.get(item, textField, ''),
                default: () => _.map(item.children, renderMenuItem),
              }}
            />
          );
        }
        return (
          <ElMenuItem
            index={_.get(item, valueField, '')}
            v-slots={{
              default: () => _.get(item, textField, ''),
            }}
          />
        );
      };

      const dataSourceSlots = _.isNil(dataConfig)
        ? {}
        : {
          default: () => _.map(TreeData, renderMenuItem),
        };

      return {
        [$deletePropsList]: deletePropsList,
        ref: selfRef,
        slots: _.assign(slots, dataSourceSlots),
      };
    },
  })
  .addPlugin({
    name: 'handleSlotDefault',
    handle: (props) => {
      const mode = props.get('mode');
      const slots = props.get('slots');

      if (mode !== 'horizontal') {
        return {};
      }

      return {
        slots: {
          default: () => {
            return [
              slots?.left?.(),
              slots?.default?.(),
              slots?.right?.() ? h('div', { class: 'el-menu__extra' }, slots?.right?.() as any) : null,
            ];
          },
        },
      };
    },
  })
  .addPlugin({
    name: 'handleRouter',
    handle: (props) => {
      const router = props.get($router);
      const route = props.get($route);
      const style = props.get('style', {});
      const auto = props.get('auto', true);
      const [active, setActive] = useControllableValue(props, {
        defaultValuePropName: 'defaultActive',
        defaultValue: route?.path,
      });
      useEffect(() => {
        if (auto) {
          router?.afterEach?.((to) => setActive(to.path));
        }
      }, []);
      useEffect(() => {
        if (auto) {
          setActive(route?.path);
        }
      }, [route?.path]);

      return {
        defaultActive: active,
        style: {
          ...style,
          ...(style?.color ? { '--el-menu-text-color': style?.color } : {}),
        },
      };
    },
  });
