/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { ElSelectProps } from './type';
import { PropType } from 'vue';

export default {
  /** 宽度随内容自适应 */
  autoWidth: Boolean,
  /** 自动聚焦 */
  autofocus: Boolean,
  /** 无边框模式 */
  borderless: Boolean,
  /** 是否可以清空选项 */
  clearable: Boolean,
  /** 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示当前存在的所有标签，`collapsedSelectedItems` 表示折叠的标签，泛型 `T` 继承 `SelectOption`，表示选项数据；`count` 表示折叠的数量, `onClose` 表示移除标签 */
  collapsedItems: {
    type: Function as PropType<ElSelectProps['collapsedItems']>,
  },
  /** 是否允许用户创建新条目，需配合 filterable 使用 */
  creatable: Boolean,
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 当下拉列表为空时显示的内容 */
  empty: {
    type: [String, Function] as PropType<ElSelectProps['empty']>,
  },
  /** 自定义搜索规则，用于对现有数据进行搜索，判断是否过滤某一项数据。参数 `filterWords` 表示搜索词，`option`表示单个选项内容，返回值为 `true` 保留该选项，返回值为 `false` 则隐藏该选项。使用该方法时无需设置 `filterable` */
  filter: {
    type: Function as PropType<ElSelectProps['filter']>,
  },
  /** 是否可搜索，默认搜索规则不区分大小写，全文本任意位置匹配。如果默认搜索规则不符合业务需求，可以更为使用 `filter` 自定义过滤规则 */
  filterable: Boolean,
  /** 透传 Input 输入框组件的全部属性 */
  inputProps: {
    type: Object as PropType<ElSelectProps['inputProps']>,
  },
  /** 输入框的值 */
  inputValue: {
    type: [String, Number] as PropType<ElSelectProps['inputValue']>,
  },
  /** 输入框的值，非受控属性 */
  defaultInputValue: {
    type: [String, Number] as PropType<ElSelectProps['defaultInputValue']>,
  },
  /** 用来定义 value / label / disabled 在 `options` 中对应的字段别名 */
  keys: {
    type: Object as PropType<ElSelectProps['keys']>,
  },
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<ElSelectProps['label']>,
  },
  /** 是否为加载状态 */
  loading: Boolean,
  /** 远程加载时显示的文字，支持自定义。如加上超链接 */
  loadingText: {
    type: [String, Function] as PropType<ElSelectProps['loadingText']>,
  },
  /** 用于控制多选数量，值为 0 则不限制 */
  max: {
    type: Number,
    default: 0,
  },
  /** 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 */
  minCollapsedNum: {
    type: Number,
    default: 0,
  },
  /** 是否允许多选 */
  multiple: Boolean,
  /** 数据化配置选项内容 */
  options: {
    type: Array as PropType<ElSelectProps['options']>,
  },
  /** 面板内的底部内容 */
  panelBottomContent: {
    type: [String, Function] as PropType<ElSelectProps['panelBottomContent']>,
  },
  /** 面板内的顶部内容 */
  panelTopContent: {
    type: [String, Function] as PropType<ElSelectProps['panelTopContent']>,
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 透传给 popup 组件的全部属性 */
  popupProps: {
    type: Object as PropType<ElSelectProps['popupProps']>,
  },
  /** 是否显示下拉框 */
  popupVisible: {
    type: Boolean,
    default: undefined,
  },
  /** 是否显示下拉框，非受控属性 */
  defaultPopupVisible: Boolean,
  /** 组件前置图标 */
  prefixIcon: {
    type: Function as PropType<ElSelectProps['prefixIcon']>,
  },
  /** 只读状态，值为真会隐藏输入框，且无法打开下拉框 */
  readonly: Boolean,
  /** 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 */
  reserveKeyword: Boolean,
  /** 懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100` */
  scroll: {
    type: Object as PropType<ElSelectProps['scroll']>,
  },
  /** 透传 SelectInput 筛选器输入框组件的全部属性 */
  selectInputProps: {
    type: Object as PropType<ElSelectProps['selectInputProps']>,
  },
  /** 是否显示右侧箭头，默认显示 */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<ElSelectProps['size']>,
    default: 'medium' as ElSelectProps['size'],
    validator(val: ElSelectProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<ElSelectProps['status']>,
    default: 'default' as ElSelectProps['status'],
    validator(val: ElSelectProps['status']): boolean {
      if (!val) return true;
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 后置图标前的后置内容 */
  suffix: {
    type: [String, Function] as PropType<ElSelectProps['suffix']>,
  },
  /** 组件后置图标 */
  suffixIcon: {
    type: Function as PropType<ElSelectProps['suffixIcon']>,
  },
  /** 透传 TagInput 标签输入框组件的全部属性 */
  tagInputProps: {
    type: Object as PropType<ElSelectProps['tagInputProps']>,
  },
  /** 透传 Tag 标签组件全部属性 */
  tagProps: {
    type: Object as PropType<ElSelectProps['tagProps']>,
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<ElSelectProps['tips']>,
  },
  /** 选中值 */
  value: {
    type: [String, Number, Boolean, Object, Array] as PropType<ElSelectProps['value']>,
    default: undefined,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<ElSelectProps['defaultValue']>,
    default: undefined,
  },
  /** 自定义选中项呈现的内容 */
  valueDisplay: {
    type: [String, Function] as PropType<ElSelectProps['valueDisplay']>,
  },
  /** 用于控制选中值的类型。假设数据选项为：`[{ label: '姓名', value: 'name' }]`，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据。 */
  valueType: {
    type: String as PropType<ElSelectProps['valueType']>,
    default: 'value' as ElSelectProps['valueType'],
    validator(val: ElSelectProps['valueType']): boolean {
      if (!val) return true;
      return ['value', 'object'].includes(val);
    },
  },
  /** 输入框失去焦点时触发 */
  onBlur: Function as PropType<ElSelectProps['onBlur']>,
  /** 选中值变化时触发。`context.trigger` 表示触发变化的来源；`context.selectedOptions` 表示选中值的完整对象，数组长度一定和 `value` 相同；`context.option` 表示当前操作的选项，不一定存在 */
  onChange: Function as PropType<ElSelectProps['onChange']>,
  /** 点击清除按钮时触发 */
  onClear: Function as PropType<ElSelectProps['onClear']>,
  /** 当选择新创建的条目时触发 */
  onCreate: Function as PropType<ElSelectProps['onCreate']>,
  /** 回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值 */
  onEnter: Function as PropType<ElSelectProps['onEnter']>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<ElSelectProps['onFocus']>,
  /** 输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等 */
  onInputChange: Function as PropType<ElSelectProps['onInputChange']>,
  /** 下拉框显示或隐藏时触发 */
  onPopupVisibleChange: Function as PropType<ElSelectProps['onPopupVisibleChange']>,
  /** 多选模式下，选中数据被移除时触发 */
  onRemove: Function as PropType<ElSelectProps['onRemove']>,
  /** 输入值变化时，触发搜索事件。主要用于远程搜索新数据 */
  onSearch: Function as PropType<ElSelectProps['onSearch']>,
};
