/* 组件功能扩展插件 */
// export {};
import _ from 'lodash';
import { ElTableColumnPro } from '../index';

export { useDataSource, useInitialLoaded } from '@lcap/vue2-utils';

export const useTable = {
  props: ['onPageChange'],
  setup(props, ctx) {
    const columns = props.useComputed('slotDefault', (slotDefault) => {
      const vnodes = slotDefault?.() ?? [];
      return vnodes.map((vnode) => {
        const attrs = _.get(vnode, 'data.attrs', {});
        const nodePath = _.get(attrs, 'data-nodepath');
        const { cell, title } = _.get(vnode, 'data.scopedSlots', {});
        const cellProps = _.isFunction(cell)
          ? {
            cell: (h, { row, rowIndex, col }) => cell({ row, index: rowIndex, col }),
          }
          : {};
        const titleProps = _.isFunction(title)
          ? {
            title: (h, { row, rowIndex, col }) => title({ row, index: rowIndex, col }),
          }
          : {};
        return {
          ...attrs,
          ...cellProps,
          ...titleProps,
          attrs: {
            'data-nodepath': nodePath,
          },
        };
      });
    });
    const onLoadData = props.useComputed('onLoadData', (value) => value);
    const onPageChange = props.useComputed('onPageChange', (value) => {
      return (pageInfo) => {
        _.attempt(onLoadData.value, {
          page: pageInfo.current,
          size: pageInfo.pageSize,
        });
        _.attempt(value, pageInfo);
      };
    });
    const pageSizeOptions = props.useComputed('pageSizeOptions', (value) => {
      try {
        const list = JSON.parse(value);
        return Array.isArray(list) ? list : [10, 20, 50];
      } catch (e) {
        return [10, 20, 50];
      }
    });
    const pageSize = props.useComputed('pageSize', (value) => {
      return _.toNumber(value) || 10;
    });
    const total = props.useComputed('total', (value) => value);
    return {
      columns,
      onPageChange,
      pagination: {
        pageSizeOptions,
        defaultCurrent: 1,
        total,
        pageSize,
      },
    };
  },
};
