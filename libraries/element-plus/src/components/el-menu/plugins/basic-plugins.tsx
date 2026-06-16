import _ from 'lodash';
import { h } from 'vue';
import { MenuProps } from 'element-plus';
import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';
import { useMemo, useControllableValue, useEffect, useRender } from '@/plugins/hooks';
import { categoryStyles } from '@/utils/dom';
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
  })
  .addPlugin({
    name: 'handleStyle',
    handle(props) {
      const style = props.get('style', {});
      const backgroundColor = _.get(style, 'backgroundColor');
      const color = _.get(style, 'color');
      const textColor = props.get('textColor');
      const backgroundColorProps = props.get('backgroundColor');
      return {
        backgroundColor: backgroundColorProps || backgroundColor,
        textColor: textColor || color,
      };
    },
  })
  .addPlugin({
    name: 'handleCollapseModel',
    handle: (props) => {
      const [collapse, setCollapse] = useControllableValue(props, {
        defaultValuePropName: 'defaultCollapse',
        valuePropName: 'collapse',
        defaultValue: false,
      });
      const Component = props.get('render');
      const hasCollapseButton = props.get('hasCollapseButton');

      const styleProps = props.get('style');
      const { style, innerStyle } = categoryStyles(styleProps);
      const CollapseButtonRender = useRender(
        (props, { attrs, slots }) => {
          return (
            <div
              class="el-menu_wrapper"
              style={{ position: 'relative', display: 'block', height: '100%', ...props.style }}
            >
              <Component {...props} {...attrs} style={props.innerStyle} v-slots={slots} />
              <div
                class="el-menu__collapse-icon"
                role="button"
                tabindex={0}
                aria-label={props.collapse ? '展开菜单' : '折叠菜单'}
                onClick={() => setCollapse(!props.collapse)}
                onKeydown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCollapse(!props.collapse);
                  }
                }}
              >
                {props.collapse ? (
                  <el-icon color="rgb(134,144,156)" size="16" name="Expand" />
                ) : (
                  <el-icon color="rgb(134,144,156)" size="16" name="Fold" />
                )}
              </div>
            </div>
          );
        },
        [Component],
      );
      const renderOptions = hasCollapseButton ? { render: CollapseButtonRender, style, innerStyle } : {};
      return {
        ...renderOptions,
        collapse,
        setCollapse,
      };
    },
  })
  .addPlugin({
    name: 'handleOnSelect',
    handle: (props) => {
      const onSelect = props.get('onSelect');
      return {
        onSelect: (index: string, indexPath) => {
          _.attempt(onSelect, { index, oldIndex: indexPath });
        },
      };
    },
  });
