/* eslint-disable no-shadow */
/* 组件功能扩展插件 */
// export {};
import _, { isFunction, isNil } from 'lodash';
import { computed, ref, watch, onMounted, provide, getCurrentInstance } from '@vue/composition-api';
import {
  SelectOptions,
  Table,
  BaseTable,
  PrimaryTable,
  EnhancedTable,
  CustomValidateResolveType,
  FormRule,
} from '@element-pro';
import { listToTree } from '@lcap/vue2-utils/utils';
import { $ref, $render, createUseUpdateSync } from '@lcap/vue2-utils';
import VusionValidator, { localizeRules } from '@lcap/validator';
import type { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';
import { IN_ELEMENT_FORM } from '../../el-form-pro/constants';

import {
  ElInputPro,
  ElInputNumberPro,
  ElSelectPro,
  ElCascaderPro,
  ElCheckboxPro,
  ElCheckboxGroupPro,
  ElRadioPro,
  ElRadioGroupPro,
  ElSwitchPro,
  ElColorPickerPro,
  ElDatePickerPro,
  ElDateRangePickerPro,
  ElDatePickerPanelPro,
  ElDateRangePickerPanelPro,
  ElDateTimePickerPro,
  ElInputAdornmentPro,
  ElRatePro,
  ElTextareaPro,
  ElSelectInputPro,
  ElSliderPro,
  ElTagInputPro,
  ElTimePickerPro,
  ElTreePro,
  ElTreeSelectPro,
  ElUploadPro,
} from '@/pro-components/index';

const formComponentMap = {
  'el-input-pro': ElInputPro,
  'el-select-pro': ElSelectPro,
  'el-cascader-pro': ElCascaderPro,
  'el-checkbox-pro': ElCheckboxPro,
  'el-checkbox-group-pro': ElCheckboxGroupPro,
  'el-radio-pro': ElRadioPro,
  'el-radio-group-pro': ElRadioGroupPro,
  'el-switch-pro': ElSwitchPro,
  'el-input-number-pro': ElInputNumberPro,
  'el-color-picker-pro': ElColorPickerPro,
  'el-date-picker-pro': ElDatePickerPro,
  'el-date-range-picker-pro': ElDateRangePickerPro,
  'el-date-picker-panel-pro': ElDatePickerPanelPro,
  'el-date-range-picker-panel-pro': ElDateRangePickerPanelPro,
  'el-date-time-picker-pro': ElDateTimePickerPro,
  'el-input-adornment-pro': ElInputAdornmentPro,
  'el-rate-pro': ElRatePro,
  'el-textarea-pro': ElTextareaPro,
  'el-select-input-pro': ElSelectInputPro,
  'el-slider-pro': ElSliderPro,
  'el-tag-input-pro': ElTagInputPro,
  'el-time-picker-pro': ElTimePickerPro,
  'el-tree-pro': ElTreePro,
  'el-tree-select-pro': ElTreeSelectPro,
  'el-upload-pro': ElUploadPro,
};

export { useDataSource } from '@lcap/vue2-utils';
export const useUpdateSync = createUseUpdateSync([{ name: 'selectedRowKeys', event: 'update:selectedRowKeys' }]);

const isEditColumn = ({ type, edit }) => {
  const isEditColumn = type === 'editable';

  return isEditColumn;
};
const editColumnProps = ({ type, cell, attrs, listeners: listenersProps, edit }) => {
  const editNode = _.attempt(edit, { item: {} });
  const editNodeTag = _.get(editNode, '0.componentOptions.tag');
  const { listeners = [], propsData = {}, children } = _.get(editNode, '0.componentOptions', {});
  const nodeAttrs = _.get(editNode, '0.data.attrs', {});
  const {
    class: classAttr,
    staticClass: staticClassAttr,
    style: styleAttr,
    statcStyle: statcStyleAttr,
  } = _.get(editNode, '0.data', {});
  const scopedSlots = _.get(editNode, '0.data.scopedSlots', {});
  const onRowEdit = _.get(listenersProps, 'row-edit', () => {});
  const nodepath = _.get(attrs, 'data-nodepath', false);
  const abortEditOnEvent = attrs?.abortEditOnEvent ? [attrs?.abortEditOnEvent] : [];
  const rules = _.map(attrs?.rules, (item) => ({
      trigger: 'all',
      validator: (val) => {
        const validator = new (VusionValidator as any)(undefined, localizeRules, [item]);
        return new Promise((resolve) => {
          validator
            .validate(val)
            .then(() => {
              resolve(true as CustomValidateResolveType);
            })
            .catch((errorMessage) => {
              resolve({
                result: false,
                message: errorMessage,
              } as CustomValidateResolveType);
            });
        });
      },
    })) ?? [];
  return {
    colKey: attrs.colKey ?? 'index',
    cell: (h, { row, rowIndex, col }) => {
      return nodepath
        ? [cell({ item: row, index: rowIndex, col }), edit()]
        : [cell({ item: row, index: rowIndex, col })];
    },
    edit: {
      component: formComponentMap[editNodeTag],
      on: () => listeners || [],
      props: {
        ...nodeAttrs,
        ...propsData,
        slots: { default: () => children, ...scopedSlots },
        class: classAttr,
        staticClass: staticClassAttr,
        style: styleAttr,
        statcStyle: statcStyleAttr,
      },
      rules,
      abortEditOnEvent,
      onEdited: (context) => {
        _.attempt(onRowEdit, context);
      },
    },
  };
};

export const useTable: NaslComponentPluginOptions = {
  props: [
    'onPageChange',
    'page',
    'pageSize',
    'valueField',
    'multiple',
    'parentField',
    'selection',
    'pageSizeOptions',
    'showTotal',
    'showJumper',
    'treeDisplay',
    'displayColumns',
    'onDisplayColumnsChange',
    'virtual',
  ],
  setup(props, ctx) {
    const current = props.useRef('page', (v) => v ?? 1);
    const pageSize = props.useRef('pageSize', (v) => v ?? 10);
    const rowKey = (props.get('rowKey') || 'id') as string;
    const valueField = props.useComputed('valueField', (value) => value ?? rowKey);
    const sorting = props.useComputed('sorting', (value) => value);
    const selection = props.useRef('selection', (v) => v);
    const hasIndexColumn = props.useRef('hasIndexColumn', (v) => v);
    const multiple = props.useRef('multiple', (v) => v);
    const typeColumns = _.cond([
      [
        _.matches({ multiple: true, selection: true }),
        _.constant([
          {
            colKey: 'row-select',
            title: '复选框',
            type: 'multiple',
          },
        ]),
      ],
      [
        _.matches({ selection: true }),
        _.constant([
          {
            colKey: 'row-radio',
            type: 'single',
          },
        ]),
      ],
      [_.stubTrue, _.constant([])],
    ])({ selection: selection.value, multiple: multiple.value });
    const indexColumn = _.cond([
      [
        _.matches({ type: true }),
        _.constant([
          {
            colKey: 'serial-number',
            title: '序号',
            type: 'index',
            width: 70,
            align: 'center',
          },
        ]),
      ],
      [_.stubTrue, _.constant([])],
    ])({ type: hasIndexColumn.value });
    const sort = ref<string | null>(sorting.value?.field);
    const order = ref<string | null>(sorting.value?.order);
    const checkStrictly = props.useComputed('checkStrictly', (value) => !!value);
    const tree = props.useComputed('treeDisplay', (value) => (value
        ? {
            childrenKey: 'children',
            checkStrictly: checkStrictly.value,
          }
        : undefined));

    const data = props.useComputed('data', (v) => {
      const treeDisplay = props.get('treeDisplay');
      const parentField = props.get<string>('parentField') || 'parent';
      if (!treeDisplay) return v;
      return listToTree(v, {
        valueField: valueField.value,
        parentField,
        childrenField: 'children',
      });
    });
    const dragSort = props.useComputed('dragSort', (value) => (value === 'disabled' ? undefined : value));
    const autoMergeFields = ref([]);
    const rowspanAndColspan = ({ row, col }) => {
      return row?.rowspan?.[col.colKey] > 1
        ? {
            rowspan: row?.rowspan?.[col.colKey],
          }
        : {};
    };
    watch(
      () => [autoMergeFields.value, data.value],
      (value, oldValue) => {
        if (_.isEqual(value, oldValue)) return;
        const [autoMergeFields, data] = value;
        if (_.isEmpty(autoMergeFields) || _.isEmpty(data)) return;

        data.forEach((item, index) => {
          _.forEach(autoMergeFields, (field) => {
            let rowspan = 1;
            for (let i = index + 1; i < data.length; i++) {
              const isPreMerge = _.get(item, `rowspan.${field.colKey}`);
              const dataFieldValue = _.get(data[i], field.colKey);
              const itemFieldValue = _.get(item, field.colKey);
              if (dataFieldValue !== itemFieldValue) break;
              rowspan++;
              item.rowspan = _.merge(item.rowspan, { [field.colKey]: true });
            }

            item.rowspan = _.merge(item.rowspan, { [field.colKey]: rowspan });
          });
        });
      },
    );

    const renderSlot = (vnodes) => {
      const columns = vnodes?.flatMap((vnode) => {
        if (!vnode.tag?.includes('ElTableColumnPro')) return [];
        const attrs = _.get(vnode, 'data.attrs', {});

        // const nodePath = _.get(attrs, 'data-nodepath');
        const { cell, title, edit } = _.get(vnode, 'data.scopedSlots', {});
        const listeners = _.get(vnode, 'componentOptions.listeners', {});
        const titleProps = _.isFunction(title)
          ? { title: (h, { row, rowIndex, col }) => title({ row, index: rowIndex, col }) }
          : {};

        const cellRender = _.cond([
          [isEditColumn, editColumnProps],
          [
            _.conforms({ cell: _.isFunction }),
            _.constant({ cell: (h, { row, rowIndex, col }) => cell({ item: row, index: rowIndex, col }) }),
          ],
          [
            _.matches({ type: 'number' }),
            _.constant({ cell: (h, { rowIndex }) => pageSize.value * (current.value - 1) + rowIndex + 1 }),
          ],
          [_.conforms({ type: _.isString }), _.constant({})],
        ]);
        const cellProps = cellRender({ type: attrs.type, cell, attrs, listeners, edit });
        return [
          {
            ...attrs,
            ...cellProps,
            ...titleProps,
            attrs: {
              // 'data-nodepath': nodePath,
            },
          },
        ];
      });
      return typeColumns
        .concat(indexColumn)
        .concat(columns)
        .filter((item) => !_.isEmpty(item));
    };
    const scroll = props.useComputed('virtual', (value) => (value ? { scroll: { type: 'virtual' } } : {}));

    const onLoadData = props.get('onLoadData');

    const onPageChange = props.useComputed('onPageChange', (value) => {
      return (pageInfo) => {
        pageSize.value = pageInfo.pageSize;
        current.value = pageInfo.current;
        _.attempt(onLoadData, {
          page: pageInfo.current,
          size: pageInfo.pageSize,
          sort: sort.value,
          order: order.value,
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

    const totalContent = props.useComputed('showTotal', (value: boolean) => value ?? true);
    const showJumper = props.useComputed('showJumper', (value: boolean) => value ?? true);

    const total = props.useComputed('total', (value) => value ?? 10);

    const paginationProps = props.useComputed('pagination');
    const pagination = computed(() => {
      if (paginationProps.value === false) {
        return false;
      }
      return {
        pageSizeOptions: pageSizeOptions.value,
        showJumper: showJumper.value,
        current: current.value,
        total: total.value,
        pageSize: pageSize.value,
        totalContent: totalContent.value,
      };
    });

    // 产品要求默认开边框
    const bordered = props.useComputed('bordered', (v) => (isNil(v) ? true : v));

    const onSortChange = props.useComputed('onSortChange', (value) => {
      return (...arg) => {
        if (arg[0]) {
          sort.value = _.get(arg, '0.sortBy');
          order.value = _.get(arg, '0.descending') ? 'desc' : 'asc';
        } else {
          sort.value = null;
          order.value = null;
        }
        _.attempt(onLoadData, {
          page: current.value,
          size: pageSize.value,
          sort: _.get(arg, '0.sortBy'),
          order: _.get(arg, '0.descending') ? 'desc' : 'asc',
        });
        _.attempt(value, ...arg);
      };
    });

    onMounted(() => {
      if (_.isFunction(onLoadData)) {
        onLoadData?.({
          page: _.get(pagination.value, 'current', undefined), // current.value,
          size: _.get(pagination.value, 'pageSize', undefined),
          sort: _.get(sorting.value, 'field'),
          order: _.get(sorting.value, 'order'),
        });
      }
    });
    const columnController = props.useRef('columnController', (v) => (v
        ? {
            placement: 'top-right',
          }
        : {}));

    // const displayColumnsProps = props.useRef('displayColumns', (v) => (_.isEmpty(v) ? undefined : v));
    const displayColumns = props.useRef('displayColumns', (v) => (_.isEmpty(v) ? undefined : v));
    watch(
      () => props.get('displayColumns'),
      (value) => {
        displayColumns.value = value;
      },
    );
    const onDisplayColumnsChange = props.useComputed('onDisplayColumnsChange', (fn) => {
      return (value) => {
        if (!_.isFunction(fn)) {
          displayColumns.value = value;
        } else {
          fn(value);
        }
      };
    });
    provide(IN_ELEMENT_FORM, false);
    return {
      data,
      onPageChange,
      dragSort,
      ...scroll.value,
      pagination,
      tree,
      columnController,
      displayColumns,
      onDisplayColumnsChange,
      rowKey: valueField,
      // tree: {
      //   childrenKey: 'chiildren',
      // },
      rowspanAndColspan,
      onSortChange,
      slotExpandedRow: computed(() => {
        const slotExpandedRow = props.get<Slot>('slotExpandedRow');
        if (!slotExpandedRow) return undefined;
        return ({ row }) => slotExpandedRow({ item: row });
      }),
      bordered,
      expandIcon: (h, params) => {
        return h('el-icon', {
          attrs: {
            name: 'el-icon-arrow-right',
          },
          staticClass: 'el-p-icon',
        });
      },
      treeExpandAndFoldIcon: props.useComputed('treeDisplay', (value) => {
        if (!value) return undefined;

        return (h, { type }) => {
          return h('el-icon', {
            attrs: {
              name: 'el-icon-arrow-right',
            },
            staticClass: 'el-p-icon el-p-tree-icon',
            class: {
              'el-p-tree-icon--opened': type === 'fold',
            },
          });
        };
      }),
      onSelectChange: (selectedRowKeys: Array<string | number>, context: SelectOptions<any>) => {
        const onSelectChange = props.get('onSelectChange');

        if (isFunction(onSelectChange)) {
          onSelectChange({
            selectedRowKeys,
            ...context,
          });
        }
      },
      [$ref]: {
        reload() {
          current.value = 1;
          if (_.isFunction(onLoadData)) {
            onLoadData?.({
              page: _.get(pagination.value, 'current', undefined), // current.value,
              size: _.get(pagination.value, 'pageSize', undefined),
              sort: sort.value,
              order: order.value,
            });
          }
        },
      },
      [$render](resultVNode, h, context) {
        const vnodes = ctx.setupContext.slots?.default?.();
        const columns = renderSlot(vnodes);
        autoMergeFields.value = columns?.filter?.((item) => item.autoMerge) ?? [];
        if (!context.propsData?.props?.displayColumns) {
          resultVNode.componentOptions.propsData.displayColumns = columns.map((item) => item.colKey);
          context.propsData.props.displayColumns = columns.map((item) => item.colKey);
        }
        if (tree.value) {
          context.propsData.props.columns = columns;
          return h(EnhancedTable, context.propsData, context.childrenNodes);
        }
        resultVNode.componentOptions.propsData.columns = columns;
        return resultVNode;
      },
    };
  },
};
