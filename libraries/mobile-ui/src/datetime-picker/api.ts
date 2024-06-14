/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '时间选择',
    icon: 'time-picker',
    description: '时间选择，支持日期、年月、时分等维度',
    group: "Selector"
  })
  export class VanDatetimePicker extends ViewComponent {
    constructor(options?: Partial<VanDatetimePickerOptions>) {
      super();
    }
    @Prop({
      title: '值',
    })
    value: VanDatetimePickerOptions['value'];

    @Prop({
      title: '起始值',
    })
    startValue: VanDatetimePickerOptions['startValue'];

    @Prop({
      title: '结束值',
    })
    endValue: VanDatetimePickerOptions['endValue'];

    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;

    @Prop({
      title: '预览',
    })
    preview: nasl.core.Boolean;

    @Method({
      title: 'undefined',
      description: '打开'
    })
    open(): any {}
    @Method({
      title: 'undefined',
      description: '关闭'
    })
    close(): any {}
  }
  export class VanDatetimePickerOptions extends ViewComponentOptions {
    @Prop({
      title: '左侧标题',
      description: '左侧文本插槽内容存在时优先展示插槽内容'
    })
    private labelField: nasl.core.String;
    @Prop<VanDatetimePickerOptions, 'type'>({
      group: '主要属性',
      title: '时间类型',
      description: '设置时间选择类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '时间选择'
        }, {
          title: '日期选择'
        }, {
          title: '日期时间选择'
        }]
      },
      onChange: [{
        clear: ['unit', 'show-formatter']
      }]
    })
    type: 'time' | 'date' | 'datetime' = 'datetime';
    @Prop<VanDatetimePickerOptions, 'unit'>({
      title: '最小单位',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '日期',
          if: _ => _.type === 'date'
        }, {
          title: '周',
          if: _ => _.type === 'date'
        }, {
          title: '月份',
          if: _ => _.type === 'date'
        }, {
          title: '季度',
          if: _ => _.type === 'date'
        }, {
          title: '年份',
          if: _ => _.type === 'date'
        }, {
          title: '分',
          if: _ => _.type !== 'date'
        }, {
          title: '秒',
          if: _ => _.type !== 'date'
        }]
      },
      onChange: [{
        clear: ['show-formatter']
      }]
    })
    unit: 'date' | 'week' | 'month' | 'quarter' | 'year' | 'minute' | 'second';
    @Prop<VanDatetimePickerOptions, 'showFormatter'>({
      title: '展示格式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '中国（2023年7月26日）',
          if: _ => _.type === 'date' && _.unit === 'date'
        }, {
          title: 'ISO（2023-07-26）',
          if: _ => _.type === 'date' && _.unit === 'date'
        }, {
          title: 'US（7/26/2023）',
          if: _ => _.type === 'date' && _.unit === 'date'
        }, {
          title: 'EU（26/7/2023）',
          if: _ => _.type === 'date' && _.unit === 'date'
        }, {
          title: '2023-28周',
          if: _ => _.type === 'date' && _.unit === 'week'
        }, {
          title: '2023年第28周',
          if: _ => _.type === 'date' && _.unit === 'week'
        }, {
          title: '2023-W28',
          if: _ => _.type === 'date' && _.unit === 'week'
        }, {
          title: '中国（2023年7月）',
          if: _ => _.type === 'date' && _.unit === 'month'
        }, {
          title: 'ISO（2023-07）',
          if: _ => _.type === 'date' && _.unit === 'month'
        }, {
          title: 'US/EU（7/2023）',
          if: _ => _.type === 'date' && _.unit === 'month'
        }, {
          title: '2023年第3季度',
          if: _ => _.type === 'date' && _.unit === 'quarter'
        }, {
          title: '2023年Q3',
          if: _ => _.type === 'date' && _.unit === 'quarter'
        }, {
          title: '2023-Q3',
          if: _ => _.type === 'date' && _.unit === 'quarter'
        }, {
          title: '中国（2023年）',
          if: _ => _.type === 'date' && _.unit === 'year'
        }, {
          title: 'ISO（2023）',
          if: _ => _.type === 'date' && _.unit === 'year'
        }, {
          title: '12:09:09',
          if: _ => _.type === 'time' && _.unit === 'second'
        }, {
          title: '12时09分09秒',
          if: _ => _.type === 'time' && _.unit === 'second'
        }, {
          title: '12:09',
          if: _ => _.type === 'time' && _.unit === 'minute'
        }, {
          title: '12时09分',
          if: _ => _.type === 'time' && _.unit === 'minute'
        }, {
          title: '2023-07-26 12:09:09',
          if: _ => _.type === 'datetime' && _.unit === 'second'
        }, {
          title: '2023年7月26日 12时09分09秒',
          if: _ => _.type === 'datetime' && _.unit === 'second'
        }, {
          title: '2023-07-26 12:09',
          if: _ => _.type === 'datetime' && _.unit === 'minute'
        }, {
          title: '2023年7月26日 12时09分',
          if: _ => _.type === 'datetime' && _.unit === 'minute'
        }]
      },
      if: _ => !_.advancedFormatEnable
    })
    showFormatter: 'YYYY年M月D日' | 'YYYY-MM-DD' | 'M/D/YYYY' | 'D/M/YYYY' | 'GGGG-W周' | 'GGGG年第W周' | 'GGGG-WWWW' | 'YYYY年M月' | 'YYYY-MM' | 'M/YYYY' | 'YYYY年第Q季度' | 'YYYY年QQ' | 'YYYY-QQ' | 'YYYY年' | 'YYYY' | 'HH:mm:ss' | 'HH时mm分ss秒' | 'HH:mm' | 'HH时mm分' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY年M月D日 HH时mm分ss秒' | 'YYYY-MM-DD HH:mm HH:mm' | 'YYYY年M月D日 HH时mm分';
    @Prop<VanDatetimePickerOptions, 'advancedFormatEnable'>({
      group: '主要属性',
      title: '高级格式化',
      description: '用来控制数字的展示格式',
      onChange: [
        { clear: ['advancedFormatValue'] }
      ],
      setter: {
        concept: 'SwitchSetter',
      },
    })
    advancedFormatEnable: nasl.core.Boolean = false;

    @Prop<VanDatetimePickerOptions, 'advancedFormatValue'>({
      group: '主要属性',
      title: '高级格式化内容',
      description: '用来控制数字的展示格式',
      if: _ => _.advancedFormatEnable === true,
      bindHide: true,
    })
    advancedFormatValue: nasl.core.String;
    @Prop({
      title: '区间选择',
      description: '是否支持区间选择',
      setter: {
        concept: "SwitchSetter"
      }
    })
    range: nasl.core.Boolean = false;
    @Prop<VanDatetimePickerOptions, 'startValue'>({
      title: '起始值',
      sync: true,
      if: _ => _.range === true
    })
    startValue: nasl.core.String | nasl.core.DateTime | nasl.core.Date | nasl.core.Time;
    @Prop<VanDatetimePickerOptions, 'endValue'>({
      title: '结束值',
      sync: true,
      if: _ => _.range === true
    })
    endValue: nasl.core.String | nasl.core.DateTime | nasl.core.Date | nasl.core.Time;
    @Prop({
      title: '是否使用新版外观',
      description: '是否使用新版外观',
      setter: {
        concept: "SwitchSetter"
      }
    })
    isNew: nasl.core.Boolean = false;
    @Prop<VanDatetimePickerOptions, 'value'>({
      group: '数据属性',
      title: '值',
      description: '用于标识时间选择的值',
      sync: true,
      if: _ => _.range !== true
    })
    value: nasl.core.String | nasl.core.DateTime | nasl.core.Date | nasl.core.Time;
    @Prop({
      group: '数据属性',
      title: '最小日期',
      description: '当时间选择类型为datetime时可选的最小时间，精确到分钟, 默认为十年前'
    })
    minDate: nasl.core.String | nasl.core.DateTime | nasl.core.Date | nasl.core.Time;
    @Prop({
      group: '数据属性',
      title: '最大日期',
      description: '当时间选择类型为datetime时可选的最大时间，精确到分钟, 默认为十年后'
    })
    maxDate: nasl.core.String | nasl.core.DateTime | nasl.core.Date | nasl.core.Time;
    @Prop<VanDatetimePickerOptions, 'maxHour'>({
      group: '数据属性',
      title: '最大小时',
      description: '当时间选择类型为 time 时',
      if: _ => _.type === 'time',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0,
        max: 23
      }
    })
    maxHour: nasl.core.Integer = 23;
    @Prop<VanDatetimePickerOptions, 'minHour'>({
      group: '数据属性',
      title: '最小小时',
      description: '当时间选择类型为 time 时',
      if: _ => _.type === 'time',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0,
        max: 23
      }
    })
    minHour: nasl.core.Integer = 0;
    @Prop<VanDatetimePickerOptions, 'maxMinute'>({
      group: '数据属性',
      title: '最大分钟',
      description: '当时间选择类型为 time 时',
      if: _ => _.type === 'time',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0,
        max: 59
      }
    })
    maxMinute: nasl.core.Integer = 59;
    @Prop<VanDatetimePickerOptions, 'minMinute'>({
      group: '数据属性',
      title: '最小分钟',
      description: '当时间选择类型为 time 时',
      if: _ => _.type === 'time',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0,
        max: 59
      }
    })
    minMinute: nasl.core.Integer = 0;
    @Prop<VanDatetimePickerOptions, 'converter'>({
      group: '主要属性',
      title: '转换器',
      description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: 'YYYY/MM/dd HH:mm:ss'
        }, {
          title: 'Unix 时间戳'
        }, {
          title: 'JSON'
        }, {
          title: 'Date 对象'
        }]
      },
      if: _ => _.type === 'datetime' || _.type === 'date'
    })
    converter: 'format' | 'timestamp' | 'json' | 'date' = 'format';
    @Prop({
      group: '主要属性',
      title: '自定义展示格式',
      description: '只用于页面上展示的格式，例如：yyyy年MM月dd日'
    })
    private displayFormat: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '顶部栏标题',
      implicitToString: true,
    })
    title: nasl.core.String = '';
    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '设置右侧内容的对齐方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左'
        }, {
          title: '中'
        }, {
          title: '右'
        }]
      }
    })
    inputAlign: 'left' | 'center' | 'right' = 'right';
    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnClickOverlay: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      }
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '占位提示',
      description: '',
      setter: {
        concept: "InputSetter"
      },
      implicitToString: true,
    })
    placeholder: nasl.core.String;
    @Prop({
      group: '状态属性',
      title: '预览',
      description: '显示预览态',
      docDescription: '',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    preview: nasl.core.Boolean = false;
    @Event({
      title: '确认',
      description: '点击完成按钮时触发的事件'
    })
    onConfirm: (event: nasl.core.String) => void;
    @Event({
      title: '取消',
      description: '点击完成取消时触发的事件'
    })
    onCancel: (event: nasl.ui.BaseEvent) => void;

    @Slot({
      title: '',
      description: ''
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '',
      description: ''
    })
    slotTop: () => Array<ViewComponent>;

    @Slot({
      title: '',
      description: ''
    })
    slotBottom: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'undefined',
    //   description: '插入`<van-picker-action-slot>`子组件',
    //   snippets: [{
    //     title: '事件插槽',
    //     code: '<van-picker-action-slot target-method="confirm"></van-picker-action-slot>'
    //   }]
    // })
    // slotDefault: () => Array<VanPickerActionSlot>;

    @Slot({
      title: 'undefined',
      description: '自定义',
    })
    slotPannelTitle: () => Array<ViewComponent>;
    @Slot({
      title: 'undefined',
      description: '自定义选择器顶部内容',
    })
    slotPickerTop: () => Array<VanPickerActionSlot>;
    @Slot({
      title: 'undefined',
      description: '自定义选择器底部内容',
    })
    slotPickerBottom: () => Array<VanPickerActionSlot>;
  }
  @Component({
    title: '时间选择事件插槽',
    group: "Selector"
  })
  export class VanDatetimePickerActionSlot extends ViewComponent {
    constructor(options?: Partial<VanDatetimePickerActionSlotOptions>) {
      super();
    }
  }
  export class VanDatetimePickerActionSlotOptions extends ViewComponentOptions {
    @Prop({
      title: '触发的事件名称',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '确认'
        }, {
          title: '取消'
        }]
      }
    })
    targetMethod: 'confirm' | 'cancel';

    @Slot({
      title: '',
      description: ''
    })
    slotDefault: () => Array<ViewComponent>;
  }
  @Component({
    title: '事件插槽',
    group: "Selector"
  })
  export class VanPickerActionSlot extends ViewComponent {
    constructor(options?: Partial<VanPickerActionSlotOptions>) {
      super();
    }
  }
  export class VanPickerActionSlotOptions extends ViewComponentOptions {
    @Prop({
      title: '触发的事件名称',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '确认'
        }, {
          title: '取消'
        }, {
          title: '无'
        }]
      }
    })
    targetMethod: 'confirm' | 'cancel' | 'none';

    @Slot({
      title: 'undefined',
      description: '内容自定义',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
