/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElPrimaryTableProps } from '../table/type';
import { PropType } from 'vue';

export default {
  /** 异步加载状态。值为 `loading` 显示默认文字 “正在加载中，请稍后”，值为 `loading-more` 显示“点击加载更多”，值为其他，表示完全自定义异步加载区域内容 */
  asyncLoading: {
    type: [String, Function] as PropType<ElPrimaryTableProps['asyncLoading']>,
  },
  /** 自定义显示列控制器，值为空不会显示。具体属性请看下方 `TableColumnController` 文档 */
  columnController: {
    type: Object as PropType<ElPrimaryTableProps['columnController']>,
  },
  /** 是否显示列配置弹框控制器，只要该属性值不为 `undefined`，弹框的显示/隐藏完全由该属性控制 */
  columnControllerVisible: {
    type: Boolean,
    default: undefined,
  },
  /** 是否显示列配置弹框控制器，只要该属性值不为 `undefined`，弹框的显示/隐藏完全由该属性控制，非受控属性 */
  defaultColumnControllerVisible: {
    type: Boolean,
    default: undefined,
  },
  /** 列配置，泛型 T 指表格数据类型 */
  columns: {
    type: Array as PropType<ElPrimaryTableProps['columns']>,
    default: (): ElPrimaryTableProps['columns'] => [],
  },
  /** 列配置功能中，当前显示的列 */
  displayColumns: {
    type: Array as PropType<ElPrimaryTableProps['displayColumns']>,
  },
  /** 列配置功能中，当前显示的列，非受控属性 */
  defaultDisplayColumns: {
    type: Array as PropType<ElPrimaryTableProps['defaultDisplayColumns']>,
  },
  /** 拖拽排序方式，值为 `row` 表示行拖拽排序，这种方式无法进行文本复制，慎用。值为`row-handler` 表示通过拖拽手柄进行行拖拽排序。值为 `col` 表示列顺序拖拽。值为 `row-handler-col` 表示同时支持行拖拽和列拖拽。⚠️`drag-col` 已废弃，请勿使用。 */
  dragSort: {
    type: String as PropType<ElPrimaryTableProps['dragSort']>,
    validator(val: ElPrimaryTableProps['dragSort']): boolean {
      if (!val) return true;
      return ['row', 'row-handler', 'col', 'row-handler-col', 'drag-col'].includes(val);
    },
  },
  /** 拖拽排序扩展参数，具体参数见 [Sortable](https://github.com/SortableJS/Sortable) */
  dragSortOptions: {
    type: Object as PropType<ElPrimaryTableProps['dragSortOptions']>,
  },
  /** 单元格是否允许编辑。返回值为 `true` 则表示可编辑；返回值为 `false` 则表示不可编辑，只读状态 */
  editableCellState: {
    type: Function as PropType<ElPrimaryTableProps['editableCellState']>,
  },
  /** 处于编辑状态的行 */
  editableRowKeys: {
    type: Array as PropType<ElPrimaryTableProps['editableRowKeys']>,
  },
  /** 用于控制是否显示「展开图标列」，值为 `false` 则不会显示。可以精确到某一行是否显示，还可以自定义展开图标内容。`expandedRow` 存在时，该参数有效。支持全局配置 `GlobalConfigProvider` */
  expandIcon: {
    type: [Boolean, Function] as PropType<ElPrimaryTableProps['expandIcon']>,
    default: true,
  },
  /** 是否允许点击行展开 */
  expandOnRowClick: Boolean,
  /** 展开行内容，泛型 T 指表格数据类型 */
  expandedRow: {
    type: [String, Function] as PropType<ElPrimaryTableProps['expandedRow']>,
  },
  /** 展开行 */
  expandedRowKeys: {
    type: Array as PropType<ElPrimaryTableProps['expandedRowKeys']>,
    default: (): ElPrimaryTableProps['expandedRowKeys'] => [],
  },
  /** 展开行，非受控属性 */
  defaultExpandedRowKeys: {
    type: Array as PropType<ElPrimaryTableProps['defaultExpandedRowKeys']>,
    default: (): ElPrimaryTableProps['defaultExpandedRowKeys'] => [],
  },
  /** 自定义过滤图标，支持全局配置 `GlobalConfigProvider` */
  filterIcon: {
    type: Function as PropType<ElPrimaryTableProps['filterIcon']>,
  },
  /** 自定义过滤状态行及清空筛选等 */
  filterRow: {
    type: [String, Function] as PropType<ElPrimaryTableProps['filterRow']>,
  },
  /** 过滤数据的值 */
  filterValue: {
    type: Object as PropType<ElPrimaryTableProps['filterValue']>,
  },
  /** 过滤数据的值，非受控属性 */
  defaultFilterValue: {
    type: Object as PropType<ElPrimaryTableProps['defaultFilterValue']>,
  },
  /** 隐藏排序文本提示，支持全局配置 `GlobalConfigProvider`，默认全局配置值为 `false` */
  hideSortTips: Boolean,
  /** 半选状态行。选中行请更为使用 `selectedRowKeys` 控制 */
  indeterminateSelectedRowKeys: {
    type: Array as PropType<ElPrimaryTableProps['indeterminateSelectedRowKeys']>,
  },
  /** 是否支持多列排序 */
  multipleSort: Boolean,
  /** 行选中功能，是否在分页时保留上一页选中结果不清空，本地数据分页场景下，会全选所有页数据。值为 `false` 则表示全部选中操作停留在当前页，不跨分页；本地数据分页场景下，全选仅选中当前页 */
  reserveSelectedRowOnPaginate: {
    type: Boolean,
    default: true,
  },
  /** 行选中单选场景，是否允许取消选中 */
  rowSelectionAllowUncheck: Boolean,
  /** 行选中类型，单选或多选。效果和 `columns` 中配置的 `{ colKey: 'row-select', type: 'single' }` 一样 */
  rowSelectionType: {
    type: String as PropType<ElPrimaryTableProps['rowSelectionType']>,
    validator(val: ElPrimaryTableProps['rowSelectionType']): boolean {
      if (!val) return true;
      return ['single', 'multiple'].includes(val);
    },
  },
  /** 是否在点击整行时选中 */
  selectOnRowClick: Boolean,
  /** 选中行。半选状态行请更为使用 `indeterminateSelectedRowKeys` 控制 */
  selectedRowKeys: {
    type: Array as PropType<ElPrimaryTableProps['selectedRowKeys']>,
    default: (): ElPrimaryTableProps['selectedRowKeys'] => [],
  },
  /** 选中行。半选状态行请更为使用 `indeterminateSelectedRowKeys` 控制，非受控属性 */
  defaultSelectedRowKeys: {
    type: Array as PropType<ElPrimaryTableProps['defaultSelectedRowKeys']>,
    default: (): ElPrimaryTableProps['defaultSelectedRowKeys'] => [],
  },
  /** 当前排序列是否显示背景色 */
  showSortColumnBgColor: Boolean,
  /** 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序 */
  sort: {
    type: [Object, Array] as PropType<ElPrimaryTableProps['sort']>,
  },
  /** 排序控制。sortBy 排序字段；descending 是否进行降序排列。值为数组时，表示正进行多字段排序，非受控属性 */
  defaultSort: {
    type: [Object, Array] as PropType<ElPrimaryTableProps['defaultSort']>,
  },
  /** 自定义排序图标，支持全局配置 `GlobalConfigProvider` */
  sortIcon: {
    type: Function as PropType<ElPrimaryTableProps['sortIcon']>,
  },
  /** 已废弃。允许表格行拖拽时排序。请更为使用 `dragSort=\"row\"` */
  sortOnRowDraggable: Boolean,
  /** 异步加载区域被点击时触发 */
  onAsyncLoadingClick: Function as PropType<ElPrimaryTableProps['onAsyncLoadingClick']>,
  /** 单元格点击时触发 */
  onCellClick: Function as PropType<ElPrimaryTableProps['onCellClick']>,
  /** 分页、排序、过滤等内容变化时触发，泛型 T 指表格数据类型，`currentData` 表示变化后的数据 */
  onChange: Function as PropType<ElPrimaryTableProps['onChange']>,
  /** 确认操作之前列配置发生变化时触发。`context.columns` 表示已选中的列；`context.currentColumn` 表示本次变化操作的列，值不存在表示全选操作；`context.type` 表示当前操作属于选中列或是取消列 */
  onColumnChange: Function as PropType<ElPrimaryTableProps['onColumnChange']>,
  /** 列配置弹窗显示或隐藏变化时触发 */
  onColumnControllerVisibleChange: Function as PropType<ElPrimaryTableProps['onColumnControllerVisibleChange']>,
  /** 本地数据排序导致 `data` 变化时触发，第一个参数指变化后的数据，第二个参数 `context.trigger` 表示触发本次变化的来源 */
  onDataChange: Function as PropType<ElPrimaryTableProps['onDataChange']>,
  /** 确认列配置时触发 */
  onDisplayColumnsChange: Function as PropType<ElPrimaryTableProps['onDisplayColumnsChange']>,
  /** 拖拽排序时触发，`data` 表示排序前的数据，`newData` 表示拖拽排序结束后的新数据，`sort=row` 表示行拖拽事件触发，`sort=col` 表示列拖拽事件触发 */
  onDragSort: Function as PropType<ElPrimaryTableProps['onDragSort']>,
  /** 展开行发生变化时触发，泛型 T 指表格数据类型 */
  onExpandChange: Function as PropType<ElPrimaryTableProps['onExpandChange']>,
  /** 过滤参数发生变化时触发，泛型 T 指表格数据类型 */
  onFilterChange: Function as PropType<ElPrimaryTableProps['onFilterChange']>,
  /** 行编辑时触发 */
  onRowEdit: Function as PropType<ElPrimaryTableProps['onRowEdit']>,
  /** 行编辑校验完成后触发，即组件实例方法 `validateRowData` 执行结束后触发。`result` 表示校验结果，`trigger=self` 表示编辑组件内部触发的校验，`trigger='parent'` 表示表格父组件触发的校验 */
  onRowValidate: Function as PropType<ElPrimaryTableProps['onRowValidate']>,
  /** 选中行发生变化时触发，泛型 T 指表格数据类型。两个参数，第一个参数为选中行 keys，第二个参数为更多参数，具体如下：`type = uncheck` 表示当前行操作为「取消行选中」；`type = check` 表示当前行操作为「行选中」； `currentRowKey` 表示当前操作行的 rowKey 值； `currentRowData` 表示当前操作行的行数据 */
  onSelectChange: Function as PropType<ElPrimaryTableProps['onSelectChange']>,
  /** 排序发生变化时触发。其中 sortBy 表示当前排序的字段，sortType 表示排序的方式，currentDataSource 表示 sorter 排序后的结果，col 表示列配置。sort 值类型为数组时表示多字段排序 */
  onSortChange: Function as PropType<ElPrimaryTableProps['onSortChange']>,
  /** 可编辑行表格，全部数据校验完成后触发。即组件实例方法 `validateTableData` 执行结束后触发 */
  onValidate: Function as PropType<ElPrimaryTableProps['onValidate']>,
};
