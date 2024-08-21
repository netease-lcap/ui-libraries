/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '日期选择器',
    icon: 'date-picker',
    description: '',
    group: 'Selector',
  })
  export class ElDatePickerPro extends ViewComponent {
    constructor(options?: Partial<ElDatePickerProOptions>) {
      super();
    }
  }

  export class ElDatePickerProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Allow Input',
      description: '是否允许输入日期',
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
      description: '是否显示清除按钮',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Default Time',
      description: '时间选择器默认值，当 value/defaultValue 未设置值时有效',
      setter: { concept: 'InputSetter' },
    })
    defaultTime: nasl.core.String = '00:00:00';

    @Prop({
      group: '主要属性',
      title: 'Disable Date',
      description:
        '禁用日期，示例：["A", "B"] 表示日期 A 和日期 B 会被禁用。`{ from: "A", to: "B" }` 表示在 A 到 B 之间的日期会被禁用。`{ before: "A", after: "B" }` 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = "2021-01-01"，B = "2021-02-01"。值类型为 Function 则表示返回值为 true 的日期会被禁用。',
      setter: { concept: 'InputSetter' },
    })
    disableDate: object | any[] | any;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Enable Time Picker',
      description: '是否显示时间选择',
      setter: { concept: 'SwitchSetter' },
    })
    enableTimePicker: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'First Day Of Week',
      description: '第一天从星期几开始。可选项：1/2/3/4/5/6/7',
      setter: { concept: 'NumberInputSetter' },
    })
    firstDayOfWeek: nasl.core.Decimal = 7;

    @Prop({
      group: '主要属性',
      title: 'Format',
      description:
        '仅用于格式化日期显示的格式，不影响日期值。注意和 `valueType` 的区别，`valueType`会直接决定日期值 `value` 的格式。全局配置默认为："YYYY-MM-DD"，',
      setter: { concept: 'InputSetter' },
    })
    format: nasl.core.String = 'YYYY-MM-DD';

    @Prop({
      group: '主要属性',
      title: 'Input Props',
      description: '透传给输入框（Input）组件的参数。',
      setter: { concept: 'InputSetter' },
    })
    inputProps: object;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '左侧文本。',
      setter: { concept: 'InputSetter' },
    })
    label: any;

    @Prop({
      group: '主要属性',
      title: 'Mode',
      description: '选择器模式。可选项：year/quarter/month/week/date',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'year' },
          { title: 'quarter' },
          { title: 'month' },
          { title: 'week' },
          { title: 'date' },
        ],
      },
    })
    mode: 'year' | 'quarter' | 'month' | 'week' | 'date' = 'date';

    @Prop({
      group: '主要属性',
      title: 'Placeholder',
      description: '占位符。',
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
        '预设快捷日期选择，示例：`{ "元旦": "2021-01-01", "昨天":  dayjs().subtract(1, "day").format("YYYY-MM-DD"), "特定日期": () => ["2021-02-01"] }`。',
      setter: { concept: 'InputSetter' },
    })
    presets: object;

    @Prop({
      group: '主要属性',
      title: 'Presets Placement',
      description:
        '预设面板展示区域（包含确定按钮）。可选项：left/top/right/bottom',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'left' },
          { title: 'top' },
          { title: 'right' },
          { title: 'bottom' },
        ],
      },
    })
    presetsPlacement: 'left' | 'top' | 'right' | 'bottom' = 'bottom';

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '输入框尺寸。可选项：small/medium/large。',
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
      title: 'Time Picker Props',
      description: '透传 TimePicker 组件属性。',
      setter: { concept: 'InputSetter' },
    })
    timePickerProps: object;

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
    value: nasl.core.String | nasl.core.Decimal | any[] | nasl.core.Date = '';

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '选中值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue:
      | nasl.core.String
      | nasl.core.Decimal
      | any[]
      | nasl.core.Date = '';

    @Prop({
      group: '主要属性',
      title: 'Value Type',
      description:
        '用于格式化日期的值，仅支持部分格式，时间戳、日期等。⚠️ `YYYYMMDD` 这种格式不支持，请勿使用，如果希望支持可以给 `dayjs` 提个 PR。注意和 `format` 的区别，`format` 仅用于处理日期在页面中呈现的格式。`ValueTypeEnum` 即将废弃，请更为使用 `DatePickerValueType`。',
      setter: { concept: 'InputSetter' },
    })
    valueType: nasl.core.String;

    @Event({
      title: 'On Blur',
      description: '当输入框失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: 'On Change',
      description: '选中值发生变化时触发。',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Confirm',
      description: '如果存在“确定”按钮，则点击“确定”按钮时触发',
    })
    onConfirm: (event: any) => any;

    @Event({
      title: 'On Focus',
      description: '输入框获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: 'On Pick',
      description: '面板选中值后触发',
    })
    onPick: (event: any) => any;

    @Event({
      title: 'On Preset Click',
      description: '点击预设按钮后触发',
    })
    onPresetClick: (event: any) => any;

    @Slot({
      title: 'Label',
      description: '左侧文本。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: 'Prefix Icon',
      description: '用于自定义组件前置图标。',
    })
    slotPrefixIcon: () => Array<ViewComponent>;

    @Slot({
      title: 'Suffix Icon',
      description: '用于自定义组件后置图标。',
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
          title: 'Date Range Picker',
          code: '<el-date-range-picker-pro></el-date-range-picker-pro>',
        },
        {
          title: 'Date Picker Panel',
          code: '<el-date-picker-panel-pro></el-date-picker-panel-pro>',
        },
        {
          title: 'Date Range Picker Panel',
          code: '<el-date-range-picker-panel-pro></el-date-range-picker-panel-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Date Range Picker',
    icon: 'date-range-picker',
    description: '',
    group: 'Selector',
  })
  export class ElDateRangePickerPro extends ViewComponent {
    constructor(options?: Partial<ElDateRangePickerProOptions>) {
      super();
    }
  }

  export class ElDateRangePickerProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Allow Input',
      description: '是否允许输入日期',
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
      description: '是否显示清除按钮',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Default Time',
      description: '时间选择器默认值，当 value/defaultValue 未设置值时有效。',
      setter: { concept: 'InputSetter' },
    })
    defaultTime: any[] = ['00:00:00', '23:59:59'];

    @Prop({
      group: '主要属性',
      title: 'Disable Date',
      description:
        '禁用日期，示例：["A", "B"] 表示日期 A 和日期 B 会被禁用。{ from: "A", to: "B" } 表示在 A 到 B 之间的日期会被禁用。{ before: "A", after: "B" } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = "2021-01-01"，B = "2021-02-01"。值类型为 Function 则表示返回值为 true 的日期会被禁用。',
      setter: { concept: 'InputSetter' },
    })
    disableDate: object | any[] | any;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Enable Time Picker',
      description: '是否显示时间选择',
      setter: { concept: 'SwitchSetter' },
    })
    enableTimePicker: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'First Day Of Week',
      description: '第一天从星期几开始。可选项：1/2/3/4/5/6/7',
      setter: { concept: 'NumberInputSetter' },
    })
    firstDayOfWeek: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Format',
      description: '用于格式化日期，',
      setter: { concept: 'InputSetter' },
    })
    format: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '左侧文本。',
      setter: { concept: 'InputSetter' },
    })
    label: any;

    @Prop({
      group: '主要属性',
      title: 'Mode',
      description: '选择器模式。可选项：year/quarter/month/week/date',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'year' },
          { title: 'quarter' },
          { title: 'month' },
          { title: 'week' },
          { title: 'date' },
        ],
      },
    })
    mode: 'year' | 'quarter' | 'month' | 'week' | 'date' = 'date';

    @Prop({
      group: '主要属性',
      title: 'Panel Preselection',
      description:
        '在开始日期选中之前，面板是否显示预选状态，即是否高亮预选日期',
      setter: { concept: 'SwitchSetter' },
    })
    panelPreselection: nasl.core.Boolean = true;

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
        '预设快捷日期选择，示例：{ "特定日期范围": ["2021-01-01", "2022-01-01"], "本月": [dayjs().startOf("month"), dayjs().endOf("month")] }。',
      setter: { concept: 'InputSetter' },
    })
    presets: object;

    @Prop({
      group: '主要属性',
      title: 'Presets Placement',
      description:
        '预设面板展示区域（包含确定按钮）。可选项：left/top/right/bottom',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'left' },
          { title: 'top' },
          { title: 'right' },
          { title: 'bottom' },
        ],
      },
    })
    presetsPlacement: 'left' | 'top' | 'right' | 'bottom' = 'bottom';

    @Prop({
      group: '主要属性',
      title: 'Range Input Props',
      description: '透传给范围输入框 RangeInput 组件的参数。',
      setter: { concept: 'InputSetter' },
    })
    rangeInputProps: object;

    @Prop({
      group: '主要属性',
      title: 'Separator',
      description: '日期分隔符，支持全局配置，默认为 "-"',
      setter: { concept: 'InputSetter' },
    })
    separator: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '输入框尺寸。可选项：small/medium/large。',
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
      title: 'Time Picker Props',
      description: '透传 TimePicker 组件属性。',
      setter: { concept: 'InputSetter' },
    })
    timePickerProps: object;

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
    value: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '选中值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Value Type',
      description:
        '用于格式化日期的值，仅支持部分格式，时间戳、日期等。⚠️ `YYYYMMDD` 这种格式不支持，请勿使用，如果希望支持可以给 `dayjs` 提个 PR。注意和 `format` 的区别，`format` 仅用于处理日期在页面中呈现的格式。可选项：time-stamp/Date/YYYY/YYYY-MM/YYYY-MM-DD/YYYY-MM-DD HH/YYYY-MM-DD HH:mm/YYYY-MM-DD HH:mm:ss/YYYY-MM-DD HH:mm:ss:SSS',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'time-stamp' },
          { title: 'Date' },
          { title: 'YYYY' },
          { title: 'YYYY-MM' },
          { title: 'YYYY-MM-DD' },
          { title: 'YYYY-MM-DD HH' },
          { title: 'YYYY-MM-DD HH:mm' },
          { title: 'YYYY-MM-DD HH:mm:ss' },
          { title: 'YYYY-MM-DD HH:mm:ss:SSS' },
        ],
      },
    })
    valueType:
      | 'time-stamp'
      | 'Date'
      | 'YYYY'
      | 'YYYY-MM'
      | 'YYYY-MM-DD'
      | 'YYYY-MM-DD HH'
      | 'YYYY-MM-DD HH:mm'
      | 'YYYY-MM-DD HH:mm:ss'
      | 'YYYY-MM-DD HH:mm:ss:SSS';

    @Event({
      title: 'On Blur',
      description: '当输入框失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: 'On Change',
      description: '选中值发生变化时触发。',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Confirm',
      description: '如果存在“确定”按钮，则点击“确定”按钮时触发',
    })
    onConfirm: (event: any) => any;

    @Event({
      title: 'On Focus',
      description: '输入框获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: 'On Input',
      description:
        '输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值',
    })
    onInput: (event: any) => any;

    @Event({
      title: 'On Pick',
      description:
        '选中日期时触发，可能是开始日期，也可能是结束日期，第二个参数可以区分是开始日期或是结束日期。',
    })
    onPick: (event: any) => any;

    @Event({
      title: 'On Preset Click',
      description: '点击预设按钮后触发',
    })
    onPresetClick: (event: any) => any;

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
      title: 'Suffix Icon',
      description: '组件后置图标。',
    })
    slotSuffixIcon: () => Array<ViewComponent>;

    @Slot({
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    })
    slotTips: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Date Picker Panel',
    icon: 'date-picker-panel',
    description: '',
    group: 'Selector',
  })
  export class ElDatePickerPanelPro extends ViewComponent {
    constructor(options?: Partial<ElDatePickerPanelProOptions>) {
      super();
    }
  }

  export class ElDatePickerPanelProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Default Time',
      description: '时间选择器默认值，当 value/defaultValue 未设置值时有效',
      setter: { concept: 'InputSetter' },
    })
    defaultTime: nasl.core.String = '00:00:00';

    @Prop({
      group: '主要属性',
      title:
        'Pick Date Picker Props Value Default Value Disable Date Enable Time Picker First Day Of Week Format Mode Presets Presets Placement Time Picker Props',
      description:
        '继承 `Pick<DatePickerProps, "value" | "defaultValue" | "disableDate" | "enableTimePicker" | "firstDayOfWeek" | "format" | "mode" | "presets" | "presetsPlacement" | "timePickerProps">` 中的全部属性',
      setter: { concept: 'InputSetter' },
    })
    pickDatePickerPropsValueDefaultValueDisableDateEnableTimePickerFirstDayOfWeekFormatModePresetsPresetsPlacementTimePickerProps: any;

    @Event({
      title: 'On Cell Click',
      description: '点击日期单元格时触发',
    })
    onCellClick: (event: any) => any;

    @Event({
      title: 'On Change',
      description:
        '选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Confirm',
      description: '如果存在“确定”按钮，则点击“确定”按钮时触发',
    })
    onConfirm: (event: any) => any;

    @Event({
      title: 'On Month Change',
      description: '月份切换发生变化时触发。',
    })
    onMonthChange: (event: any) => any;

    @Event({
      title: 'On Panel Click',
      description: '点击面板时触发',
    })
    onPanelClick: (event: any) => any;

    @Event({
      title: 'On Preset Click',
      description: '点击预设按钮后触发',
    })
    onPresetClick: (event: any) => any;

    @Event({
      title: 'On Time Change',
      description: '时间切换发生变化时触发。',
    })
    onTimeChange: (event: any) => any;

    @Event({
      title: 'On Year Change',
      description: '年份切换发生变化时触发。',
    })
    onYearChange: (event: any) => any;
  }

  @Component({
    title: 'Date Range Picker Panel',
    icon: 'date-range-picker-panel',
    description: '',
    group: 'Selector',
  })
  export class ElDateRangePickerPanelPro extends ViewComponent {
    constructor(options?: Partial<ElDateRangePickerPanelProOptions>) {
      super();
    }
  }

  export class ElDateRangePickerPanelProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Default Time',
      description: '时间选择器默认值，当 value/defaultValue 未设置值时有效。',
      setter: { concept: 'InputSetter' },
    })
    defaultTime: any[] = ['00:00:00', '23:59:59'];

    @Prop({
      group: '主要属性',
      title:
        'Pick Date Range Picker Props Value Default Value Disable Date Enable Time Picker First Day Of Week Format Mode Presets Presets Placement Panel Preselection Time Picker Props',
      description:
        '继承 `Pick<DateRangePickerProps, "value"| "defaultValue" | "disableDate" | "enableTimePicker" | "firstDayOfWeek" | "format" | "mode" | "presets" | "presetsPlacement" | "panelPreselection" | "timePickerProps">` 中的全部属性',
      setter: { concept: 'InputSetter' },
    })
    pickDateRangePickerPropsValueDefaultValueDisableDateEnableTimePickerFirstDayOfWeekFormatModePresetsPresetsPlacementPanelPreselectionTimePickerProps: any;

    @Event({
      title: 'On Cell Click',
      description: '点击日期单元格时触发',
    })
    onCellClick: (event: any) => any;

    @Event({
      title: 'On Change',
      description:
        '选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Confirm',
      description: '如果存在“确定”按钮，则点击“确定”按钮时触发',
    })
    onConfirm: (event: any) => any;

    @Event({
      title: 'On Month Change',
      description: '月份切换发生变化时触发',
    })
    onMonthChange: (event: any) => any;

    @Event({
      title: 'On Panel Click',
      description: '点击面板时触发',
    })
    onPanelClick: (event: any) => any;

    @Event({
      title: 'On Preset Click',
      description: '点击预设按钮后触发',
    })
    onPresetClick: (event: any) => any;

    @Event({
      title: 'On Time Change',
      description: '时间切换发生变化时触发',
    })
    onTimeChange: (event: any) => any;

    @Event({
      title: 'On Year Change',
      description: '年份切换发生变化时触发',
    })
    onYearChange: (event: any) => any;
  }
}
