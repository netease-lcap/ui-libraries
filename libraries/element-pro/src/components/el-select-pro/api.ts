/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '选择器',
    icon: 'select',
    description: '',
    group: 'Selector',
  })
  export class ElSelectPro extends ViewComponent {
    constructor(options?: Partial<ElSelectProOptions>) {
      super();
    }
  }

  export class ElSelectProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Auto Width',
      description: '宽度随内容自适应',
      setter: { concept: 'SwitchSetter' },
    })
    autoWidth: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Autofocus',
      description: '自动聚焦',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Borderless',
      description: '无边框模式',
      setter: { concept: 'SwitchSetter' },
    })
    borderless: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Clearable',
      description: '是否可以清空选项',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Creatable',
      description: '是否允许用户创建新条目，需配合 filterable 使用',
      setter: { concept: 'SwitchSetter' },
    })
    creatable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Empty',
      description: '当下拉列表为空时显示的内容。',
      setter: { concept: 'InputSetter' },
    })
    empty: any;

    @Prop({
      group: '主要属性',
      title: 'Filter',
      description:
        '自定义搜索规则，用于对现有数据进行搜索，判断是否过滤某一项数据。参数 `filterWords` 表示搜索词，`option`表示单个选项内容，返回值为 `true` 保留该选项，返回值为 `false` 则隐藏该选项。使用该方法时无需设置 `filterable`。',
      setter: { concept: 'InputSetter' },
    })
    filter: any;

    @Prop({
      group: '主要属性',
      title: 'Filterable',
      description:
        '是否可搜索，默认搜索规则不区分大小写，全文本任意位置匹配。如果默认搜索规则不符合业务需求，可以更为使用 `filter` 自定义过滤规则',
      setter: { concept: 'SwitchSetter' },
    })
    filterable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Input Props',
      description: '透传 Input 输入框组件的全部属性。',
      setter: { concept: 'InputSetter' },
    })
    inputProps: object;

    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Input Value',
      description: '输入框的值。支持语法糖 `.sync`。',
      setter: { concept: 'InputSetter' },
    })
    inputValue: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Default Input Value',
      description: '输入框的值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultInputValue: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Keys',
      description:
        '用来定义 value / label / disabled 在 `options` 中对应的字段别名。',
      setter: { concept: 'InputSetter' },
    })
    keys: object;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '左侧文本。',
      setter: { concept: 'InputSetter' },
    })
    label: any;

    @Prop({
      group: '主要属性',
      title: 'Loading',
      description: '是否为加载状态',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Loading Text',
      description: '远程加载时显示的文字，支持自定义。如加上超链接。',
      setter: { concept: 'InputSetter' },
    })
    loadingText: any;

    @Prop({
      group: '主要属性',
      title: 'Max',
      description: '用于控制多选数量，值为 0 则不限制',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: 'Min Collapsed Num',
      description:
        '最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠',
      setter: { concept: 'NumberInputSetter' },
    })
    minCollapsedNum: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: 'Multiple',
      description: '是否允许多选',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Options',
      description: '数据化配置选项内容。',
      setter: { concept: 'InputSetter' },
    })
    options: any[];

    @Prop({
      group: '主要属性',
      title: 'Panel Bottom Content',
      description: '面板内的底部内容。',
      setter: { concept: 'InputSetter' },
    })
    panelBottomContent: any;

    @Prop({
      group: '主要属性',
      title: 'Panel Top Content',
      description: '面板内的顶部内容。',
      setter: { concept: 'InputSetter' },
    })
    panelTopContent: any;

    @Prop({
      group: '主要属性',
      title: 'Placeholder',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Popup Props',
      description: '透传给 popup 组件的全部属性。',
      setter: { concept: 'InputSetter' },
    })
    popupProps: object;

    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Popup Visible',
      description: '是否显示下拉框。支持语法糖 `.sync`',
      setter: { concept: 'SwitchSetter' },
    })
    popupVisible: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Default Popup Visible',
      description: '是否显示下拉框。非受控属性',
      setter: { concept: 'SwitchSetter' },
    })
    defaultPopupVisible: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Readonly',
      description: '只读状态，值为真会隐藏输入框，且无法打开下拉框',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Reserve Keyword',
      description: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
      setter: { concept: 'SwitchSetter' },
    })
    reserveKeyword: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Scroll',
      description:
        '懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100`。',
      setter: { concept: 'InputSetter' },
    })
    scroll: object;

    @Prop({
      group: '主要属性',
      title: 'Select Input Props',
      description: '透传 SelectInput 筛选器输入框组件的全部属性。',
      setter: { concept: 'InputSetter' },
    })
    selectInputProps: object;

    @Prop({
      group: '主要属性',
      title: 'Show Arrow',
      description: '是否显示右侧箭头，默认显示',
      setter: { concept: 'SwitchSetter' },
    })
    showArrow: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '组件尺寸。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'small' },
          { title: 'medium' },
          { title: 'large。TS 类型：`SizeEnum`。[通用类型定义](https:' },
          { title: '' },
          { title: 'github.com' },
          { title: 'Tencent' },
          { title: 'tdesign-vue' },
          { title: 'blob' },
          { title: 'develop' },
          { title: 'src' },
          { title: 'common.ts)' },
        ],
      },
    })
    size:
      | 'small'
      | 'medium'
      | 'large。TS 类型：`SizeEnum`。[通用类型定义](https:'
      | ''
      | 'github.com'
      | 'Tencent'
      | 'tdesign-vue'
      | 'blob'
      | 'develop'
      | 'src'
      | 'common.ts)' = 'medium';

    @Prop({
      group: '主要属性',
      title: 'Status',
      description: '输入框状态。可选项：default/success/warning/error',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'default' },
          { title: 'success' },
          { title: 'warning' },
          { title: 'error' },
        ],
      },
    })
    status: 'default' | 'success' | 'warning' | 'error' = 'default';

    @Prop({
      group: '主要属性',
      title: 'Suffix',
      description: '后置图标前的后置内容。',
      setter: { concept: 'InputSetter' },
    })
    suffix: any;

    @Prop({
      group: '主要属性',
      title: 'Tag Input Props',
      description: '透传 TagInput 标签输入框组件的全部属性。',
      setter: { concept: 'InputSetter' },
    })
    tagInputProps: object;

    @Prop({
      group: '主要属性',
      title: 'Tag Props',
      description: '透传 Tag 标签组件全部属性。',
      setter: { concept: 'InputSetter' },
    })
    tagProps: object;

    @Prop({
      group: '主要属性',
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
      setter: { concept: 'InputSetter' },
    })
    tips: any;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '选中值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value:
      | nasl.core.String
      | nasl.core.Decimal
      | nasl.core.Boolean
      | object
      | any[];

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '选中值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue:
      | nasl.core.String
      | nasl.core.Decimal
      | nasl.core.Boolean
      | object
      | any[];

    @Prop({
      group: '主要属性',
      title: 'Value Display',
      description: '自定义选中项呈现的内容。',
      setter: { concept: 'InputSetter' },
    })
    valueDisplay: any;

    @Prop({
      group: '主要属性',
      title: 'Value Type',
      description: '用于控制选中值的类型。假设数据选项为：`',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'value' }, { title: 'object' }],
      },
    })
    valueType: 'value' | 'object' = 'value';

    @Event({
      title: 'On Blur',
      description: '输入框失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: 'On Change',
      description:
        '选中值变化时触发。`context.trigger` 表示触发变化的来源；`context.selectedOptions` 表示选中值的完整对象，数组长度一定和 `value` 相同；`context.option` 表示当前操作的选项，不一定存在。',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Clear',
      description: '点击清除按钮时触发',
    })
    onClear: (event: any) => any;

    @Event({
      title: 'On Create',
      description: '当选择新创建的条目时触发',
    })
    onCreate: (event: any) => any;

    @Event({
      title: 'On Enter',
      description:
        '回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值',
    })
    onEnter: (event: any) => any;

    @Event({
      title: 'On Focus',
      description: '输入框获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: 'On Input Change',
      description:
        '输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等。',
    })
    onInputChange: (event: any) => any;

    @Event({
      title: 'On Popup Visible Change',
      description: '下拉框显示或隐藏时触发。',
    })
    onPopupVisibleChange: (event: any) => any;

    @Event({
      title: 'On Remove',
      description: '多选模式下，选中数据被移除时触发。',
    })
    onRemove: (event: any) => any;

    @Event({
      title: 'On Search',
      description: '输入值变化时，触发搜索事件。主要用于远程搜索新数据',
    })
    onSearch: (event: any) => any;

    @Slot({
      title: 'Collapsed Items',
      description:
        '多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示当前存在的所有标签，`collapsedSelectedItems` 表示折叠的标签，泛型 `T` 继承 `SelectOption`，表示选项数据；`count` 表示折叠的数量, `onClose` 表示移除标签。',
    })
    slotCollapsedItems: () => Array<ViewComponent>;

    @Slot({
      title: 'Empty',
      description: '当下拉列表为空时显示的内容。',
    })
    slotEmpty: () => Array<ViewComponent>;

    @Slot({
      title: 'Label',
      description: '左侧文本。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: 'Loading Text',
      description: '远程加载时显示的文字，支持自定义。如加上超链接。',
    })
    slotLoadingText: () => Array<ViewComponent>;

    @Slot({
      title: 'Panel Bottom Content',
      description: '面板内的底部内容。',
    })
    slotPanelBottomContent: () => Array<ViewComponent>;

    @Slot({
      title: 'Panel Top Content',
      description: '面板内的顶部内容。',
    })
    slotPanelTopContent: () => Array<ViewComponent>;

    @Slot({
      title: 'Prefix Icon',
      description: '组件前置图标。',
    })
    slotPrefixIcon: () => Array<ViewComponent>;

    @Slot({
      title: 'Suffix',
      description: '后置图标前的后置内容。',
    })
    slotSuffix: () => Array<ViewComponent>;

    @Slot({
      title: 'Suffix Icon',
      description: '组件后置图标。',
    })
    slotSuffixIcon: () => Array<ViewComponent>;

    @Slot({
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    })
    slotTips: () => Array<ViewComponent>;

    @Slot({
      title: 'Value Display',
      description: '自定义选中项呈现的内容。',
    })
    slotValueDisplay: () => Array<ViewComponent>;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        { title: 'Option', code: '<el-option-pro></el-option-pro>' },
        {
          title: 'Option Group',
          code: '<el-option-group-pro></el-option-group-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Option',
    icon: 'option',
    description: '',
    group: 'Selector',
  })
  export class ElOptionPro extends ViewComponent {
    constructor(options?: Partial<ElOptionProOptions>) {
      super();
    }
  }

  export class ElOptionProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Check All',
      description:
        '当前选项是否为全选，全选可以在顶部，也可以在底部。点击当前选项会选中禁用态除外的全部选项，即使是分组选择器也会选中全部选项',
      setter: { concept: 'SwitchSetter' },
    })
    checkAll: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Content',
      description: '用于定义复杂的选项内容。',
      setter: { concept: 'InputSetter' },
    })
    content: any;

    @Prop({
      group: '主要属性',
      title: 'Default',
      description: '用于定义复杂的选项内容。同 content。',
      setter: { concept: 'InputSetter' },
    })
    default: any;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用该选项',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '选项名称',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Title',
      description: '选项标题，在选项过长时hover选项展示',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '选项值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal;

    @Slot({
      title: 'Content',
      description: '用于定义复杂的选项内容。',
    })
    slotContent: () => Array<ViewComponent>;

    @Slot({
      title: 'Default',
      description: '用于定义复杂的选项内容。同 content。',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Option Group',
    icon: 'option-group',
    description: '',
    group: 'Selector',
  })
  export class ElOptionGroupPro extends ViewComponent {
    constructor(options?: Partial<ElOptionGroupProOptions>) {
      super();
    }
  }

  export class ElOptionGroupProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Divider',
      description: '是否显示分隔线',
      setter: { concept: 'SwitchSetter' },
    })
    divider: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '分组别名',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;
  }
}
