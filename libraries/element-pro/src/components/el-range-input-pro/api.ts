/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '范围输入框',
    icon: 'range-input',
    description: '',
    group: 'Form',
  })
  export class ElRangeInputPro extends ViewComponent {
    constructor(options?: Partial<ElRangeInputProOptions>) {
      super();
    }
  }

  export class ElRangeInputProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Active Index',
      description: '输入框高亮状态序号',
      setter: { concept: 'NumberInputSetter' },
    })
    activeIndex: nasl.core.Decimal;

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
      description: '是否禁用范围输入框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Format',
      description: '指定输入框展示值的格式。',
      setter: { concept: 'InputSetter' },
    })
    format: any[] | any;

    @Prop({
      group: '主要属性',
      title: 'Input Props',
      description:
        '透传 Input 输入框组件全部属性，数组第一项表示第一个输入框属性，第二项表示第二个输入框属性。示例：`[{ label: "A", name: "A-name" }, { label: "B",  name: "B-name" }]`。',
      setter: { concept: 'InputSetter' },
    })
    inputProps: object | any[];

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '左侧内容。',
      setter: { concept: 'InputSetter' },
    })
    label: any;

    @Prop({
      group: '主要属性',
      title: 'Placeholder',
      description: '占位符，示例："请输入" 或者 ["开始日期", "结束日期"]。',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String | any[];

    @Prop({
      group: '主要属性',
      title: 'Readonly',
      description: '只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Separator',
      description: '范围分隔符。',
      setter: { concept: 'InputSetter' },
    })
    separator: any = '-';

    @Prop({
      group: '主要属性',
      title: 'Show Clear Icon On Empty',
      description: '输入框内容为空时，悬浮状态是否显示清空按钮，默认不显示',
      setter: { concept: 'SwitchSetter' },
    })
    showClearIconOnEmpty: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '输入框尺寸。可选项：small/medium/large',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'small' }, { title: 'medium' }, { title: 'large' }],
      },
    })
    size: 'small' | 'medium' | 'large' = 'medium';

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
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
      setter: { concept: 'InputSetter' },
    })
    tips: any;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '范围输入框的值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '范围输入框的值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: any[] = [];

    @Event({
      title: 'On Blur',
      description: '范围输入框失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: 'On Change',
      description: '范围输入框值发生变化时触发。',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Clear',
      description: '清空按钮点击时触发',
    })
    onClear: (event: any) => any;

    @Event({
      title: 'On Click',
      description: '范围输入框点击时触发',
    })
    onClick: (event: any) => any;

    @Event({
      title: 'On Enter',
      description: '回车键按下时触发',
    })
    onEnter: (event: any) => any;

    @Event({
      title: 'On Focus',
      description: '范围输入框获得焦点时触发',
    })
    onFocus: (event: any) => any;

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

    @Slot({
      title: 'Label',
      description: '左侧内容。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: 'Prefix Icon',
      description: '组件前置图标。',
    })
    slotPrefixIcon: () => Array<ViewComponent>;

    @Slot({
      title: 'Separator',
      description: '范围分隔符。',
    })
    slotSeparator: () => Array<ViewComponent>;

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
      title: 'Default',
      description: '内容',
      snippets: [
        {
          title: 'Range Input Popup',
          code: '<el-range-input-popup-pro></el-range-input-popup-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Range Input Popup',
    icon: 'range-input-popup',
    description: '',
    group: 'Form',
  })
  export class ElRangeInputPopupPro extends ViewComponent {
    constructor(options?: Partial<ElRangeInputPopupProOptions>) {
      super();
    }
  }

  export class ElRangeInputPopupProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Auto Width',
      description: '宽度随内容自适应',
      setter: { concept: 'SwitchSetter' },
    })
    autoWidth: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description:
        '是否禁用范围输入框，值为数组表示可分别控制某一个输入框是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Input Value',
      description: '输入框的值。支持语法糖 `.sync`。',
      setter: { concept: 'InputSetter' },
    })
    inputValue: any[];

    @Prop({
      group: '主要属性',
      title: 'Default Input Value',
      description: '输入框的值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultInputValue: any[];

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '左侧文本。',
      setter: { concept: 'InputSetter' },
    })
    label: any;

    @Prop({
      group: '主要属性',
      title: 'Panel',
      description: '下拉框内容，可完全自定义。',
      setter: { concept: 'InputSetter' },
    })
    panel: any;

    @Prop({
      group: '主要属性',
      title: 'Popup Props',
      description: '透传 Popup 浮层组件全部属性。',
      setter: { concept: 'InputSetter' },
    })
    popupProps: object;

    @Prop({
      group: '主要属性',
      title: 'Popup Visible',
      description: '是否显示下拉框',
      setter: { concept: 'SwitchSetter' },
    })
    popupVisible: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Range Input Props',
      description: '透传 RangeInput 组件全部属性。',
      setter: { concept: 'InputSetter' },
    })
    rangeInputProps: object;

    @Prop({
      group: '主要属性',
      title: 'Readonly',
      description: '只读状态，值为真会隐藏输入框，且无法打开下拉框',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

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
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
      setter: { concept: 'InputSetter' },
    })
    tips: any;

    @Event({
      title: 'On Input Change',
      description:
        '输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发等。',
    })
    onInputChange: (event: any) => any;

    @Event({
      title: 'On Popup Visible Change',
      description: '下拉框显示或隐藏时触发。',
    })
    onPopupVisibleChange: (event: any) => any;

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
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    })
    slotTips: () => Array<ViewComponent>;
  }
}
