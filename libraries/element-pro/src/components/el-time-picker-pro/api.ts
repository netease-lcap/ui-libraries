/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '时间选择器',
    icon: 'time-picker',
    description: '用于选择某一具体时间点或某一时间段。',
    group: 'Selector',
  })
  export class ElTimePickerPro extends ViewComponent {
    @Prop({
      title: '值',
    })
    value: nasl.core.Time;

    @Prop({
      title: '起始值',
    })
    startTime: nasl.core.Time;

    @Prop({
      title: '结束值',
    })
    endTime: nasl.core.Time;

    constructor(options?: Partial<ElTimePickerProOptions>) {
      super();
    }
  }

  export class ElTimePickerProOptions extends ViewComponentOptions {
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

    @Prop<ElTimePickerProOptions, 'value'>({
      group: '数据属性',
      title: '值',
      description: '选中值。',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.range,
      sync: true,
      settable: true,
    })
    value: nasl.core.String | nasl.core.Time;

    @Prop<ElTimePickerProOptions, 'startTime'>({
      group: '数据属性',
      title: '起始值',
      description: '默认显示的起始时间值，格式如08:08:08',
      sync: true,
      if: (_) => _.range === true,
      settable: true,
    })
    startTime: nasl.core.String | nasl.core.Time;

    @Prop<ElTimePickerProOptions, 'endTime'>({
      group: '数据属性',
      title: '结束值',
      description: '默认显示的结束时间值，格式如08:08:08',
      sync: true,
      if: (_) => _.range === true,
      settable: true,
    })
    endTime: nasl.core.String | nasl.core.Time;

    @Prop({
      group: '主要属性',
      title: '允许输入',
      description: '是否允许直接输入时间',
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
      description: '是否允许清除选中值',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '最小时间值',
      description:
        '最小可选的时间值，填写null则不限制，日期填写格式为“00:00:00”',
      docDescription: '支持输入的最小时间。',
    })
    minTime: nasl.core.String | nasl.core.Time = '00:00:00';

    @Prop({
      group: '数据属性',
      title: '最大时间值',
      description:
        '最大可选的时间值，填写null则不限制，日期填写格式为“00:00:00”',
      docDescription: '支持输入的最大时间',
    })
    maxTime: nasl.core.String | nasl.core.Time = '23:59:59';

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

    @Prop<ElTimePickerProOptions, 'format'>({
      group: '主要属性',
      title: '格式化',
      description: '用于格式化时间，',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '12:09:09' },
          { title: '12时09分09秒' },
          { title: '12:09' },
          { title: '12时09分' },
          { title: '12' },
          { title: '12时' },
        ],
      },
    })
    format: 'HH:mm:ss' | 'HH时mm分ss秒' | 'HH:mm' | 'HH时mm分' = 'HH:mm:ss';

    @Prop({
      group: '主要属性',
      title: '隐藏禁用状态的时间项',
      description: '是否隐藏禁用状态的时间项',
      setter: { concept: 'SwitchSetter' },
    })
    hideDisabledTime: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请选择时间';

    @Prop<ElTimePickerProOptions, 'placeholderRight'>({
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

    @Prop<ElTimePickerProOptions, 'separator'>({
      group: '主要属性',
      title: '分隔符',
      description: '日期分隔符，支持全局配置，默认为 -',
      if: (_) => _.range === true,
      setter: {
        concept: 'InputSetter',
      },
    })
    separator: nasl.core.String = '-';

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '尺寸。可选项：small/medium/large',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中' }, { title: '大' }],
      },
    })
    size: 'small' | 'medium' | 'large' = 'medium';

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

    @Prop({
      group: '主要属性',
      title: '时间间隔步数',
      description:
        '时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ["2", "1", "1"]。',
      setter: { concept: 'InputSetter' },
    })
    steps: nasl.collection.List<nasl.core.Integer> = [1, 1, 1];

    @Event({
      title: '失焦时',
      description: '当输入框失去焦点时触发，value 表示组件当前有效值',
    })
    onBlur: (event: {
      value: nasl.core.String | nasl.core.Time;
      startTime: nasl.core.String | nasl.core.Time;
      endTime: nasl.core.String | nasl.core.Time;
      position: 'start' | 'end';
    }) => any;

    @Event({
      title: '值改变时',
      description: '选中值发生变化时触发',
    })
    onChange: (event: {
      value: nasl.core.String | nasl.core.Time;
      startTime: nasl.core.String | nasl.core.Time;
      endTime: nasl.core.String | nasl.core.Time;
    }) => any;

    @Event({
      title: '面板关闭时',
      description: '面板关闭时触发',
    })
    onClose: (event: {}) => any;

    @Event({
      title: '聚焦时',
      description: '输入框获得焦点时触发，value 表示组件当前有效值',
    })
    onFocus: (event: {
      value: nasl.core.String | nasl.core.Time;
      startTime: nasl.core.String | nasl.core.Time;
      endTime: nasl.core.String | nasl.core.Time;
      position: 'start' | 'end';
    }) => any;

    @Event({
      title: '输入框内容变化是',
      description: '当输入框内容发生变化时触发，参数 value 表示组件当前有效值',
    })
    onInput: (event: {
      value: nasl.core.String | nasl.core.Time;
      startTime: nasl.core.String | nasl.core.Time;
      endTime: nasl.core.String | nasl.core.Time;
      position: 'start' | 'end';
    }) => any;

    @Event({
      title: '面板打开时',
      description: '面板打开时触发',
    })
    onOpen: (event: {}) => any;

    @Event({
      title: '面板选中时',
      description: '面板选中值后触发',
    })
    onPick: (event: {
      value: nasl.core.String | nasl.core.Time;
      startTime: nasl.core.String | nasl.core.Time;
      endTime: nasl.core.String | nasl.core.Time;
      position: 'start' | 'end';
    }) => any;
  }
}
