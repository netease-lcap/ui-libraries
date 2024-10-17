/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '标签输入框',
    icon: 'tag-input',
    description: '',
    group: 'Form',
  })
  export class ElTagInputPro extends ViewComponent {
    constructor(options?: Partial<ElTagInputProOptions>) {
      super();
    }
  }

  export class ElTagInputProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Auto Width',
      description: '宽度随内容自适应',
      setter: { concept: 'SwitchSetter' },
    })
    autoWidth: nasl.core.Boolean = false;

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
      description: '是否禁用标签输入框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Drag Sort',
      description: '拖拽调整标签顺序',
      setter: { concept: 'SwitchSetter' },
    })
    dragSort: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Excess Tags Display Type',
      description:
        '标签超出时的呈现方式，有两种：横向滚动显示 和 换行显示。可选项：scroll/break-line',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'scroll' }, { title: 'break-line' }],
      },
    })
    excessTagsDisplayType: 'scroll' | 'break-line' = 'break-line';

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
    inputValue: nasl.core.String | nasl.core.Decimal = '';

    @Prop({
      group: '主要属性',
      title: 'Default Input Value',
      description: '输入框的值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultInputValue: nasl.core.String | nasl.core.Decimal = '';

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '左侧文本。',
      setter: { concept: 'InputSetter' },
    })
    label: any;

    @Prop({
      group: '主要属性',
      title: 'Max',
      description: '最大允许输入的标签数量',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal;

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
      title: 'Placeholder',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Readonly',
      description: '只读状态，值为真会隐藏标签移除按钮和输入框',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

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
    status: 'default' | 'success' | 'warning' | 'error';

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
        '自定义标签的内部内容，每一个标签的当前值。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签。',
      setter: { concept: 'InputSetter' },
    })
    tag: any;

    @Prop({
      group: '主要属性',
      title: 'Tag Props',
      description: '透传 Tag 组件全部属性。',
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
      description: '值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Value Display',
      description: '自定义值呈现的全部内容，参数为所有标签的值。',
      setter: { concept: 'InputSetter' },
    })
    valueDisplay: any;

    @Event({
      title: 'On Blur',
      description: '失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: 'On Change',
      description:
        '值变化时触发，参数 `context.trigger` 表示数据变化的触发来源；`context.index` 指当前变化项的下标；`context.item` 指当前变化项；`context.e` 表示事件参数。',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Clear',
      description: '清空按钮点击时触发',
    })
    onClear: (event: any) => any;

    @Event({
      title: 'On Click',
      description: '点击组件时触发',
    })
    onClick: (event: any) => any;

    @Event({
      title: 'On Drag Sort',
      description: '【开发中】拖拽排序时触发。',
    })
    onDragSort: (event: any) => any;

    @Event({
      title: 'On Enter',
      description: '按键按下 Enter 时触发',
    })
    onEnter: (event: any) => any;

    @Event({
      title: 'On Focus',
      description: '聚焦时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: 'On Input Change',
      description:
        '输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、回车键触发等。',
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
      title: 'On Remove',
      description: '移除单个标签时触发。',
    })
    onRemove: (event: any) => any;

    @Slot({
      title: 'Collapsed Items',
      description:
        '标签过多的情况下，折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示当前存在的所有标签，`collapsedSelectedItems` 表示折叠的标签，`count` 表示折叠的数量，`onClose` 表示移除标签的事件回调。',
    })
    slotCollapsedItems: () => Array<ViewComponent>;

    @Slot({
      title: 'Label',
      description: '左侧文本。',
    })
    slotLabel: () => Array<ViewComponent>;

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
      title: 'Tag',
      description:
        '自定义标签的内部内容，每一个标签的当前值。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签。',
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
