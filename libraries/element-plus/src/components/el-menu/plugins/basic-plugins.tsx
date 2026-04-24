import _ from 'lodash';
import { h } from 'vue';
import { MenuProps } from 'element-plus';
import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';
import { useMemo, useControllableValue, useEffect ,useState} from '@/plugins/hooks';
import { $deletePropsList, $router, $route } from '@/plugins/constants';
import { ElSubMenu, ElMenuItem } from '@/components';
import { PluginAccumulateTypes } from '@/plugins/accumulate';

import idePlugin from './ide';
import { addClass } from '@/utils/dom';

/** 从 getComputedStyle 返回的 `rgb` / `rgba` 解析 r、g、b */
function parseCssRgbColor(color: string): { r: number; g: number; b: number } | null {
  const m = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3] };
}

/** BT.601 感知亮度，约 0–10，越大越亮 */
function rgbLuma601(r: number, g: number, b: number): number {
  const luma255 = (299 * r + 587 * g + 114 * b) / 1000;
  return (luma255 / 255) * 10;
}

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
  })
  .addPlugin({
    name: 'handleStyle',
    handle: (props) => {
      const refid = props.get('data-ref-id');
      const classList = props.get('class', '');
      const [className, setClassName] = useState('');
      useEffect(() => {
        const el = document.querySelector(`.el-menu[data-ref-id="${refid}"]`);
        if (!el) return;
        const bgColor = window.getComputedStyle(el as Element).backgroundColor;
        const rgb = parseCssRgbColor(bgColor);
        if (!rgb) return;
        const luma = rgbLuma601(rgb.r, rgb.g, rgb.b);
        const className = luma > 5 ? 'el-menu--light' : 'el-menu--dark';
        setClassName(className);
      }, [refid]);

      return {
        class: addClass(classList, className),
      };
    },
  });
