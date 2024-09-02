/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '日期时间选择器',
    icon: 'date-time-picker',
    description: '用于选择某一具体日期时间或某一段日期时间区间。',
    group: 'Selector',
  })
  export class ElDateTimePickerPro extends ViewComponent {
    @Prop({
      title: '值',
    })
    value: ElDateTimePickerProOptions['value'];

    @Prop({
      title: '起始值',
    })
    startValue: ElDateTimePickerProOptions['startValue'];

    @Prop({
      title: '结束值',
    })
    endValue: ElDateTimePickerProOptions['endValue'];

    constructor(options?: Partial<ElDateTimePickerProOptions>) {
      super();
    }
  }

  export class ElDateTimePickerProOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '区间选择',
      description: '是否支持进行时间区间选择，关闭则为时间点选择',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [{ clear: ['placeholderRight'] }],
    })
    range: nasl.core.Boolean = false;

    @Prop<ElDateTimePickerProOptions, 'value'>({
      group: '数据属性',
      title: '值',
      description: '选中值',
      setter: { concept: 'InputSetter' },
      if: (_) => _.range === false,
      sync: true,
    })
    value:
      | nasl.core.String
      | nasl.core.Integer
      | nasl.core.Date
      | nasl.core.DateTime;

    @Prop<ElDateTimePickerProOptions, 'startValue'>({
      group: '数据属性',
      title: '起始值',
      description: '默认显示的起始日期时间值，格式如2018-08-08 08:08:08',
      setter: { concept: 'InputSetter' },
      if: (_) => !!_.range,
      sync: true,
    })
    startValue:
      | nasl.core.String
      | nasl.core.Integer
      | nasl.core.Date
      | nasl.core.DateTime;

    @Prop<ElDateTimePickerProOptions, 'endValue'>({
      group: '数据属性',
      title: '结束值',
      description: '默认显示的结束日期时间值，格式如2018-08-08 08:08:08',
      setter: { concept: 'InputSetter' },
      if: (_) => !!_.range,
      sync: true,
    })
    endValue:
      | nasl.core.String
      | nasl.core.Integer
      | nasl.core.Date
      | nasl.core.DateTime;

    @Prop({
      group: '主要属性',
      title: '转换器',
      docDescription: '- SON、Unix 时间戳、 Date 对象、 YYYY-MM-DD HH:mm:ss',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'JSON' },
          { title: 'Unix 时间戳' },
          { title: 'Date 对象' },
          { title: 'YYYY-MM-DD HH:mm:ss' },
        ],
      },
    })
    converter: 'json' | 'timestamp' | 'date' | 'format' = 'json';

    @Prop({
      group: '主要属性',
      title: '允许输入',
      description: '是否允许输入日期',
      setter: { concept: 'SwitchSetter' },
    })
    allowInput: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '无边框',
      description: '无边框模式',
      setter: { concept: 'SwitchSetter' },
    })
    borderless: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '可清除',
      description: '是否显示清除按钮',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '最小日期时间值',
      description:
        '最小可选的日期时间值，填写null则不限制，日期填写格式为“yyyy-mm-dd  00:00:00”',
      docDescription: '支持输入的最小日期时间',
    })
    minDate:
      | nasl.core.String
      | nasl.core.Decimal
      | nasl.core.Date
      | nasl.core.DateTime;

    @Prop({
      group: '数据属性',
      title: '最大日期时间值',
      description:
        '最大可选的日期时间值，填写null则不限制，日期填写格式为“yyyy-mm-dd  00:00:00”',
      docDescription: '支持输入的最大日期时间',
    })
    maxDate:
      | nasl.core.String
      | nasl.core.Decimal
      | nasl.core.Date
      | nasl.core.DateTime;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '只读',
      description: '只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '第一天从星期几开始',
      description: '第一天从星期几开始',
      setter: { concept: 'NumberInputSetter' },
    })
    firstDayOfWeek: nasl.core.Decimal = 7;

    @Prop<ElDateTimePickerProOptions, 'dateFormat'>({
      group: '主要属性',
      title: '日期展示格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '中国（2023年7月26日）' },
          { title: 'ISO（2023-07-26）' },
          { title: 'US（7/26/2023）' },
          { title: 'EU（26/7/2023）' },
        ],
      },
    })
    dateFormat: 'YYYY年M月D日' | 'YYYY-MM-DD' | 'M/D/YYYY' | 'D/M/YYYY' =
      'YYYY-MM-DD';

    @Prop<ElDateTimePickerProOptions, 'timeFormat'>({
      group: '主要属性',
      title: '时间展示格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '12: 09: 09' },
          { title: '12时09分09秒' },
          { title: '12: 09' },
          { title: '12时09分' },
        ],
      },
    })
    timeFormat: 'HH:mm:ss' | 'HH时mm分ss秒' | 'HH:mm' | 'HH时mm分' = 'HH:mm:ss';

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符。',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请选择时间';

    @Prop<ElDateTimePickerProOptions, 'placeholderRight'>({
      group: '主要属性',
      title: '右侧占位符',
      description:
        '时间选择框无内容时的提示信息，支持自定义编辑, 在没有设置的时候使用placeholder作为右侧占位符内容',
      if: (_) => _.range === true,
      implicitToString: true,
      setter: {
        concept: 'InputSetter',
        placeholder: '同占位符一致',
      },
    })
    placeholderRight: nasl.core.String = '';

    @Prop<ElDateTimePickerProOptions, 'separator'>({
      group: '主要属性',
      title: '分隔符',
      description: '日期分隔符，支持全局配置，默认为 -',
      if: (_) => _.range === true,
      setter: {
        concept: 'InputSetter',
      },
    })
    separator: nasl.core.String = '-';

    @Prop<ElDateTimePickerProOptions, 'enablePresets'>({
      group: '主要属性',
      title: '启用快捷设置',
      description: '启用预设快捷日期选择',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    enablePresets: nasl.core.Boolean = false;

    @Prop<ElDateTimePickerProOptions, 'presetsPlacement'>({
      group: '主要属性',
      title: '快捷设置位置',
      description:
        '预设面板展示区域（包含确定按钮）。可选项：left/top/right/bottom',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '左侧' },
          { title: '顶部' },
          { title: '右侧' },
          { title: '底部' },
        ],
      },
      if: (_) => _.enablePresets === true,
    })
    presetsPlacement: 'left' | 'top' | 'right' | 'bottom' = 'bottom';

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '输入框尺寸。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中' }, { title: '大' }],
      },
    })
    size: 'small' | 'medium' | 'large' = 'medium';

    // @Prop({
    //   group: '主要属性',
    //   title: 'Status',
    //   description: '输入框状态。可选项：default/success/warning/error',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [
    //       { title: 'default' },
    //       { title: 'success' },
    //       { title: 'warning' },
    //       { title: 'error' },
    //     ],
    //   },
    // })
    // status: 'default' | 'success' | 'warning' | 'error' = 'default';

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tips',
    //   description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    //   setter: { concept: 'InputSetter' },
    // })
    // tips: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Value Type',
    //   description:
    //     '用于格式化日期的值，仅支持部分格式，时间戳、日期等。⚠️ `YYYYMMDD` 这种格式不支持，请勿使用，如果希望支持可以给 `dayjs` 提个 PR。注意和 `format` 的区别，`format` 仅用于处理日期在页面中呈现的格式。`ValueTypeEnum` 即将废弃，请更为使用 `DatePickerValueType`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // valueType: nasl.core.String;
    @Prop({
      group: '样式属性',
      title: '宽度随内容自适应',
      description: '宽度随内容自适应',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    autoWidth: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '文本内容位置',
      description: '文本内容位置，居左/居中/居右',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '左对齐' },
          { title: '居中对齐' },
          { title: '右对齐' },
        ],
      },
    })
    align: 'left' | 'center' | 'right' = 'left';

    @Event({
      title: '失焦时',
      description: '当输入框失去焦点时触发',
    })
    onBlur: (event: {
      value: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      startValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      endValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      position: 'start' | 'end';
    }) => any;

    @Event({
      title: '值改变时',
      description: '选中值发生变化时触发。',
    })
    onChange: (event: {
      value: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      startValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      endValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      trigger: 'confirm' | 'pick' | 'enter' | 'preset' | 'clear';
    }) => any;

    @Event({
      title: '点击确认按钮时',
      description: '如果存在“确定”按钮，则点击“确定”按钮时触发',
    })
    onConfirm: (event: {
      value: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      startValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      endValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      position: 'start' | 'end';
    }) => any;

    @Event({
      title: '聚焦时',
      description: '输入框获得焦点时触发',
    })
    onFocus: (event: {
      value: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      startValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      endValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      position: 'start' | 'end';
    }) => any;

    @Event({
      title: '面板选中后',
      description: '面板选中值后触发',
    })
    onPick: (event: {
      value: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      startValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      endValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;
      position: 'start' | 'end';
    }) => any;

    // @Event({
    //   title: '点击预设按钮后',
    //   description: '点击预设按钮后触发',
    // })
    // onPresetClick: (event: {
    //   value: nasl.core.String | nasl.core.Date | nasl.core.DateTime,
    //   startValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime,
    //   endValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime,
    //   position: 'start' | 'end',
    //  }) => any;
  }
}
