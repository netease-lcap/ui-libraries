/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true
  })
  @Component({
    title: '时间选择器',
    icon: 'time-picker',
    description: '',
    group: 'Selector',
  })
  export class ElTimePickerPro extends ViewComponent {
    constructor(options?: Partial<ElTimePickerProOptions>) {
      super();
    }
  }

  export class ElTimePickerProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Allow Input',
      description: '是否允许直接输入时间',
      setter: { concept: 'SwitchSetter' },
    })
    allowInput: nasl.core.Boolean = false;

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
      description: '是否允许清除选中值',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Disable Time',
      description: '禁用时间项的配置函数。',
      setter: { concept: 'InputSetter' },
    })
    disableTime: any;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Format',
      description: '用于格式化时间，',
      setter: { concept: 'InputSetter' },
    })
    format: nasl.core.String = 'HH:mm:ss';

    @Prop({
      group: '主要属性',
      title: 'Hide Disabled Time',
      description: '是否隐藏禁用状态的时间项',
      setter: { concept: 'SwitchSetter' },
    })
    hideDisabledTime: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Input Props',
      description: '透传给输入框（Input）组件的参数。',
      setter: { concept: 'InputSetter' },
    })
    inputProps: object;

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
      description: '透传给 popup 组件的参数。',
      setter: { concept: 'InputSetter' },
    })
    popupProps: object;

    @Prop({
      group: '主要属性',
      title: 'Presets',
      description: '预设快捷时间选择，示例：`{ "前一小时": "11:00:00" }`。',
      setter: { concept: 'InputSetter' },
    })
    presets: object;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '尺寸。可选项：small/medium/large',
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
      title: 'Steps',
      description:
        '时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ["2", "1", "1"]。',
      setter: { concept: 'InputSetter' },
    })
    steps: any[] = [1, 1, 1];

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
    value: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '选中值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: nasl.core.String;

    @Event({
      title: 'On Blur',
      description: '当输入框失去焦点时触发，value 表示组件当前有效值',
    })
    onBlur: (event: any) => any;

    @Event({
      title: 'On Change',
      description: '选中值发生变化时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Close',
      description: '面板关闭时触发',
    })
    onClose: (event: any) => any;

    @Event({
      title: 'On Focus',
      description: '输入框获得焦点时触发，value 表示组件当前有效值',
    })
    onFocus: (event: any) => any;

    @Event({
      title: 'On Input',
      description: '当输入框内容发生变化时触发，参数 value 表示组件当前有效值',
    })
    onInput: (event: any) => any;

    @Event({
      title: 'On Open',
      description: '面板打开时触发',
    })
    onOpen: (event: any) => any;

    @Event({
      title: 'On Pick',
      description: '面板选中值后触发',
    })
    onPick: (event: any) => any;

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
          title: 'Time Range Picker',
          code: '<el-time-range-picker-pro></el-time-range-picker-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Time Range Picker',
    icon: 'time-range-picker',
    description: '',
    group: 'Selector',
  })
  export class ElTimeRangePickerPro extends ViewComponent {
    constructor(options?: Partial<ElTimeRangePickerProOptions>) {
      super();
    }
  }

  export class ElTimeRangePickerProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Allow Input',
      description: '是否允许直接输入时间',
      setter: { concept: 'SwitchSetter' },
    })
    allowInput: nasl.core.Boolean = false;

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
      description: '是否允许清除选中值',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Disable Time',
      description: '禁用时间项。',
      setter: { concept: 'InputSetter' },
    })
    disableTime: any;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description:
        '是否禁用组件，值为数组表示可分别控制开始日期和结束日期是否禁用。',
      setter: { concept: 'InputSetter' },
    })
    disabled: nasl.core.Boolean | any[];

    @Prop({
      group: '主要属性',
      title: 'Format',
      description: '用于格式化时间，',
      setter: { concept: 'InputSetter' },
    })
    format: nasl.core.String = 'HH:mm:ss';

    @Prop({
      group: '主要属性',
      title: 'Hide Disabled Time',
      description: '是否隐藏禁用状态的时间项',
      setter: { concept: 'SwitchSetter' },
    })
    hideDisabledTime: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '左侧文本。',
      setter: { concept: 'InputSetter' },
    })
    label: any;

    @Prop({
      group: '主要属性',
      title: 'Placeholder',
      description: '占位符，值为数组表示可分别为开始日期和结束日期设置占位符。',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String | any[];

    @Prop({
      group: '主要属性',
      title: 'Popup Props',
      description: '透传给 popup 组件的参数。',
      setter: { concept: 'InputSetter' },
    })
    popupProps: object;

    @Prop({
      group: '主要属性',
      title: 'Presets',
      description:
        '预设快捷时间范围选择，示例：{ "下午": ["13:00:00", "18:00:00"] }。',
      setter: { concept: 'InputSetter' },
    })
    presets: object;

    @Prop({
      group: '主要属性',
      title: 'Range Input Props',
      description: '透传给范围输入框 RangeInput 组件的参数。',
      setter: { concept: 'InputSetter' },
    })
    rangeInputProps: object;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '尺寸。可选项：small/medium/large',
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
      title: 'Steps',
      description:
        '时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ["2", "1", "1"]。',
      setter: { concept: 'InputSetter' },
    })
    steps: any[] = [1, 1, 1];

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
    value: any[];

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '选中值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: any[];

    @Event({
      title: 'On Blur',
      description: '当输入框失去焦点时触发。',
    })
    onBlur: (event: any) => any;

    @Event({
      title: 'On Change',
      description: '选中值发生变化时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Focus',
      description: '范围输入框获得焦点时触发。',
    })
    onFocus: (event: any) => any;

    @Event({
      title: 'On Input',
      description:
        '当输入框内容发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值。',
    })
    onInput: (event: any) => any;

    @Event({
      title: 'On Pick',
      description: '面板选中值后触发',
    })
    onPick: (event: any) => any;

    @Slot({
      title: 'Label',
      description: '左侧文本。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    })
    slotTips: () => Array<ViewComponent>;
  }
}
