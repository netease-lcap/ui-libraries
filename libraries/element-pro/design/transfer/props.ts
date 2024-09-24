/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElTransferProps } from './type';
import { PropType } from 'vue';

export default {
  /** 用于控制复选框属性 */
  checkboxProps: {
    type: Object as PropType<ElTransferProps['checkboxProps']>,
  },
  /** 数据列表选中项 */
  checked: {
    type: Array as PropType<ElTransferProps['checked']>,
    default: (): ElTransferProps['checked'] => [],
  },
  /** 数据列表选中项，非受控属性 */
  defaultChecked: {
    type: Array as PropType<ElTransferProps['defaultChecked']>,
    default: (): ElTransferProps['defaultChecked'] => [],
  },
  /** 全量数据 */
  data: {
    type: Array as PropType<ElTransferProps['data']>,
    default: (): ElTransferProps['data'] => [],
  },
  /** 穿梭框可操作方向 */
  direction: {
    type: String as PropType<ElTransferProps['direction']>,
    default: 'both' as ElTransferProps['direction'],
    validator(val: ElTransferProps['direction']): boolean {
      if (!val) return true;
      return ['left', 'right', 'both'].includes(val);
    },
  },
  /** 禁用全部操作：搜索、选中、移动、分页等。[源列表, 目标列表]，示例：[true, false] 或者 true */
  disabled: {
    type: [Boolean, Array] as PropType<ElTransferProps['disabled']>,
  },
  /** 列表为空时呈现的内容。值类型为数组，则表示分别控制源列表和目标列表数据为空的呈现内容 */
  empty: {
    type: [String, Array, Function] as PropType<ElTransferProps['empty']>,
    default: '',
  },
  /** 穿梭框底部内容 */
  footer: {
    type: [Array, Function] as PropType<ElTransferProps['footer']>,
  },
  /** 用来定义 value / label / disabled 在 `data` 中对应的字段别名，示例：`{ label: 'text', value: 'id' }`，表示选项文本取 `text` 字段，选项值取 `id` 字段 */
  keys: {
    type: Object as PropType<ElTransferProps['keys']>,
  },
  /** 方向操作按钮。默认显示组件内置操作图标。自定义操作图标示例：['向左', '向右'] 或者 `[() => <i class='left' />, () => <i class='left' />]` 或者 `(h, direction) => direction === 'left' ? '《' : '》'` */
  operation: {
    type: [Array, Function] as PropType<ElTransferProps['operation']>,
  },
  /** 分页配置，值为空则不显示。具体 API 参考分页组件。值类型为数组，表示可分别控制源列表和目标列表分页组件 */
  pagination: {
    type: [Object, Array] as PropType<ElTransferProps['pagination']>,
  },
  /** 搜索框配置，值为 false 表示不显示搜索框；值为 true 表示显示默认搜索框；值类型为对象，用于透传 Props 到 Input 组件；值类型为数组，则分别表示控制两侧搜索框 */
  search: {
    type: [Boolean, Object, Array] as PropType<ElTransferProps['search']>,
    default: false,
  },
  /** 是否显示全选，值类型为数组则表示分别控制源列表和目标列表 */
  showCheckAll: {
    type: [Boolean, Array] as PropType<ElTransferProps['showCheckAll']>,
    default: true,
  },
  /** 是否允许通过拖拽对目标列表进行排序 */
  targetDraggable: Boolean,
  /** 目标数据列表排列顺序 */
  targetSort: {
    type: String as PropType<ElTransferProps['targetSort']>,
    default: 'original' as ElTransferProps['targetSort'],
    validator(val: ElTransferProps['targetSort']): boolean {
      if (!val) return true;
      return ['original', 'push', 'unshift'].includes(val);
    },
  },
  /** 穿梭框标题，示例：['源列表', '目标列表'] 或者 `[() => 'A', () => 'B']` 或者 `({ type }) => type === 'source' ? '源' : '目标'` */
  title: {
    type: [Array, Function] as PropType<ElTransferProps['title']>,
    default: (): ElTransferProps['title'] => [],
  },
  /** 自定义渲染节点 */
  transferItem: {
    type: Function as PropType<ElTransferProps['transferItem']>,
  },
  /** 传入 Tree 组件定义树形结构 */
  tree: {
    type: Function as PropType<ElTransferProps['tree']>,
  },
  /** 目标数据列表数据 */
  value: {
    type: Array as PropType<ElTransferProps['value']>,
    default: (): ElTransferProps['value'] => [],
  },
  /** 目标数据列表数据，非受控属性 */
  defaultValue: {
    type: Array as PropType<ElTransferProps['defaultValue']>,
    default: (): ElTransferProps['defaultValue'] => [],
  },
  /** 数据列表发生变化时触发，`type` 值为 `source`，表示源列表移动到目标列表，值为 `target` 表示目标列表移动到源列表，movedValue 则表示被移动的选项 */
  onChange: Function as PropType<ElTransferProps['onChange']>,
  /** 源数据列表或目标数据列表的选中项发生变化时触发，`context.type` 可以区分触发来源是目标列表，还是源列表 */
  onCheckedChange: Function as PropType<ElTransferProps['onCheckedChange']>,
  /** 分页发生变化时触发 */
  onPageChange: Function as PropType<ElTransferProps['onPageChange']>,
  /** 列表滚动时触发，bottomDistance 表示元素滚动到底部的距离 */
  onScroll: Function as PropType<ElTransferProps['onScroll']>,
  /** 搜索时触发，options.query 表示用户输入的内容 */
  onSearch: Function as PropType<ElTransferProps['onSearch']>,
};
