/* 组件功能扩展插件 */
// export {};
import _ from 'lodash';
import { ElTableColumnPro } from '../index';

export const useTable = {
  props: [],
  setup(props, ctx) {
    const slotDefault = props.get('slotDefault');

    if (!slotDefault) {
      return [];
    }

    const vnodes = slotDefault();
    const columns = vnodes.map((vnode) => {
      console.log(vnode, 'vnode');
      const attrs = _.get(vnode, 'data.attrs', {});
      const { cell } = vnode.data.scopedSlots;
      // const cell = _.get(vnode, 'componentOptions.children', []);
      return {
        ...attrs,
        cell: (h, { row }) => cell({ row }),
      };
    });
    console.log(columns, 'columns');
    // console.log(props, ctx, vnodes);
    // console.log(ElTableColumnPro, '==');
    return {
      columns,
    };
  },
};
