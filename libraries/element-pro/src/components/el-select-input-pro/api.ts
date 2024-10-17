/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '筛选器输入框',
    icon: 'select-input',
    description: '',
    group: 'Selector',
  })
  export class ElSelectInputPro extends ViewComponent {
    constructor(options?: Partial<ElSelectInputProOptions>) {
      super();
    }
  }

  export class ElSelectInputProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Allow Input',
      description: '是否允许输入',
      setter: { concept: 'SwitchSetter' },
    })
    allowInput: nasl.core.Boolean = false;

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
      description: '是否可清空',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Input Props',
      description: '透传 Input 输入框组件全部属性。',
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
        '定义字段别名，示例：`{ label: "text", value: "id", children: "list" }`。',
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
      description: '是否处于加载状态',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Min Collapsed Num',
      description:
        '最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠',
      setter: { concept: 'NumberInputSetter' },
    })
    minCollapsedNum: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: 'Multiple',
      description: '是否为多选模式，默认为单选',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Panel',
      description: '下拉框内容，可完全自定义。',
      setter: { concept: 'InputSetter' },
    })
    panel: any;

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
      description: '透传 Popup 浮层组件全部属性。',
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
      title: 'Tag',
      description:
        '多选场景下，自定义选中标签的内部内容。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签。',
      setter: { concept: 'InputSetter' },
    })
    tag: any;

    @Prop({
      group: '主要属性',
      title: 'Tag Input Props',
      description: '透传 TagInput 组件全部属性。',
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

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tips',
    //   description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    //   setter: { concept: 'InputSetter' },
    // })
    // tips: any;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '全部标签值。值为数组表示多个标签，值为非数组表示单个数值。',
      setter: { concept: 'InputSetter' },
    })
    value:
      | nasl.core.String
      | nasl.core.Decimal
      | nasl.core.Boolean
      | object
      | any[]
      | nasl.core.Date;

    @Prop({
      group: '主要属性',
      title: 'Value Display',
      description: '自定义值呈现的全部内容，参数为所有标签的值。',
      setter: { concept: 'InputSetter' },
    })
    valueDisplay: any;

    @Event({
      title: 'On Blur',
      description:
        '失去焦点时触发，`context.inputValue` 表示输入框的值；`context.tagInputValue` 表示标签输入框的值。',
    })
    onBlur: (event: any) => any;

    @Event({
      title: 'On Clear',
      description: '清空按钮点击时触发',
    })
    onClear: (event: any) => any;

    @Event({
      title: 'On Enter',
      description: '按键按下 Enter 时触发',
    })
    onEnter: (event: any) => any;

    @Event({
      title: 'On Focus',
      description: '聚焦时触发。',
    })
    onFocus: (event: any) => any;

    @Event({
      title: 'On Input Change',
      description:
        '输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发等。',
    })
    onInputChange: (event: any) => any;

    @Event({
      title: 'On Mouseenter',
      description: '进入输入框时触发',
    })
    onMouseenter: (event: any) => any;

    @Event({
      title: 'On Mouseleave',
      description: '离开输入框时触发',
    })
    onMouseleave: (event: any) => any;

    @Event({
      title: 'On Paste',
      description: '粘贴事件，`pasteValue` 表示粘贴板的内容',
    })
    onPaste: (event: any) => any;

    @Event({
      title: 'On Popup Visible Change',
      description: '下拉框显示或隐藏时触发。',
    })
    onPopupVisibleChange: (event: any) => any;

    @Event({
      title: 'On Tag Change',
      description:
        '值变化时触发，参数 `context.trigger` 表示数据变化的触发来源；`context.index` 指当前变化项的下标；`context.item` 指当前变化项；`context.e` 表示事件参数。',
    })
    onTagChange: (event: any) => any;

    @Slot({
      title: 'Collapsed Items',
      description:
        '标签过多的情况下，折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 `collapsedItems` 自定义。`value` 表示所有标签值，`collapsedSelectedItems` 表示折叠标签值，`count` 表示折叠的数量，`onClose` 表示移除标签的事件回调。',
    })
    slotCollapsedItems: () => Array<ViewComponent>;

    @Slot({
      title: 'Label',
      description: '左侧文本。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: 'Panel',
      description: '下拉框内容，可完全自定义。',
    })
    slotPanel: () => Array<ViewComponent>;

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
      title: 'Tag',
      description:
        '多选场景下，自定义选中标签的内部内容。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签。',
    })
    slotTag: () => Array<ViewComponent>;

    @Slot({
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    })
    slotTips: () => Array<ViewComponent>;

    @Slot({
      title: 'Value Display',
      description: '自定义值呈现的全部内容，参数为所有标签的值。',
    })
    slotValueDisplay: () => Array<ViewComponent>;
  }
}
