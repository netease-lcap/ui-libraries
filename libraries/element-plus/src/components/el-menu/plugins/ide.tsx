import { ElMenuItem } from 'element-plus';
import _ from 'lodash';
import { $ide } from '@/plugins/constants';
import { useState } from '@/plugins/hooks';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { IIdePluginBase } from '@/types';

/* 仅在 ide 环境生效的插件 */
const MenuIdeAccumulate = new PluginAccumulateTypes<nasl.ui.ElMenuOptions<any, any>, IIdePluginBase>();
export default MenuIdeAccumulate.addPlugin({
  name: 'handleDataSourceDemo',
  type: 'ide',
  handle: (props) => {
    const slots = props.get('slots');
    const showInDesigner = props.get('showInDesigner');
    const dataConfig = props.get('dataSource');

    const defaultSlot = !_.isNil(dataConfig) && showInDesigner
      ? {
        default: () => [
          <ElMenuItem>菜单一</ElMenuItem>,
          <ElMenuItem>菜单二</ElMenuItem>,
          <ElMenuItem>根据数据源自动生成</ElMenuItem>,
        ],
      }
      : {};

    return {
      slots: {
        ...slots,
        ...defaultSlot,
      },
    };
  },
})
  .addPlugin({
    name: 'handleDataSourceDemo',
    type: 'ide',
    handle: (props) => {
      const defaultOpeneds = props.get('defaultOpeneds') || [];
      const [openKeys, setOpenKeys] = useState(defaultOpeneds);
      const onOpen = props.get('onOpen', () => { });
      const onClose = props.get('onClose', () => { });
      return {
        onOpen: _.wrap(onOpen, (fn, index, indexPath) => {
          _.attempt(fn, index, indexPath);
          setOpenKeys(indexPath);
        }),
        onClose: _.wrap(onClose, (fn, index, indexPath) => {
          _.attempt(fn, index, indexPath);
          setOpenKeys(indexPath);
        }),
        defaultOpeneds: openKeys,
      };
    },
  });
