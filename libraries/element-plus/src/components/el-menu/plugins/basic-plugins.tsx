import _ from 'lodash';
import { h } from 'vue';
import { useRequestDataSource, useHandleMapField, useFormatDataSource, useDataSourceToTree } from '@/plugins/common/dataSource';
import { useMemo } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';
import { ElSubMenu, ElMenuItem } from '@/components';

export const handleDataSource = (props) => {
  const dataConfig = props.get('dataSource');
  const slots = props.get('slots');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const parentField = props.get('parentField');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'parentField', 'childrenField', 'dataSource']);
  const ref = props.get('ref');
  const { data, run: reload } = useRequestDataSource(dataConfig, {});
  const dataSource = useHandleMapField({ textField, valueField, dataSource: useFormatDataSource(data) });
  const TreeData = useMemo(() => useDataSourceToTree(dataSource, parentField, valueField), [dataSource]);
  const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
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
        default: _.map(TreeData, renderMenuItem),
      };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    slots: _.assign(slots, dataSourceSlots),
  };
};

export const handleSlotDefault = (props) => {
  const dataConfig = props.get('dataSource');
  if (dataConfig) {
    return {};
  }
  const slots = props.get('slots');
  const mode = props.get('mode');
  const defaultSlot = slots?.default;
  const vnodes = typeof defaultSlot === 'function' ? defaultSlot() : [];
  if (mode === 'horizontal') {
    const slotLeft = slots?.left;
    const slotRight = slots?.right;
    const leftNodes = typeof slotLeft === 'function' ? slotLeft() : [];
    const rightNodes = typeof slotRight === 'function' ? slotRight() : [];
    if (Array.isArray(leftNodes) && leftNodes.length > 0) {
      vnodes.unshift(...leftNodes);
    }

    if (Array.isArray(rightNodes) && rightNodes.length > 0) {
      vnodes.push(h('div', { class: 'el-menu__extra' }, rightNodes));
    }
  }
  return {
    slots: {
      default: () => {
        return vnodes;
      },
    },
  };
};

export function handleHrefToRouter(props) {
  const destination = props.get('destination');
  const link = props.get('link');
  const href = props.get('href');
  const target = props.get('target');
  const onClick = props.get('onClick');
  const router = props.get('$router');
  const destinationToRouterClick = _.cond([
    [_.matches({ target: '_blank' }), _.constant(() => {})],
    [_.isString, (params) => () => router.push(params.destination)],
    [_.stubTrue, _.constant(() => {})],
  ]);
  const routerClick = destinationToRouterClick({ destination, target });
  const isHref = !_.isNil(link) || !_.isNil(href);
  const hrefObject = isHref ? { href: link || href, target } : {};

  return {
    onClick: _.wrap(onClick, (fn, ...args) => {
      _.attempt(fn, ...args);
      _.attempt(routerClick, ...args);
    }),
    ...hrefObject,
  };
}