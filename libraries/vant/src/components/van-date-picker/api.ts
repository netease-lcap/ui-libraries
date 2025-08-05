/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'drawerdropdown',
      cacheOpenKey: 'popupOpened',
      drawerCSSSelector: '.van-popup',
      dataSource: {},
    },
  })
  @Component({
    title: '日期选择器',
    icon: 'date-picker',
    description: '日期选择器',
    group: 'Selector',
  })
  export class VanDatePicker extends ViewComponent {
    constructor(options?: Partial<VanDatePickerOptions>) {
      super();
    }

    @Prop({
      title: '值',
    })
    modelValue: VanTimePickerOptions['modelValue'];

    @Prop({
      title: '起始值',
    })
    startValue: VanTimePickerOptions['startValue'];

    @Prop({
      title: '结束值',
    })
    endValue: VanTimePickerOptions['endValue'];

    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;

    @Method({
      title: 'undefined',
      description: '打开',
    })
    open(): any {}

    @Method({
      title: 'undefined',
      description: '关闭',
    })
    close(): any {}
  }

  export class VanDatePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '区间选择',
      description: '是否支持进行时间区间选择，关闭则为时间点选择',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [
        {
          clear: ['nextStepText'],
        },
      ],
    })
    isRange: nasl.core.Boolean = false;

    @Prop<VanDatePickerOptions, 'modelValue'>({
      group: '数据属性',
      title: '值',
      sync: true,
      description: '绑定值',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.isRange,
    })
    modelValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;

    @Prop<VanDatePickerOptions, 'startValue'>({
      group: '数据属性',
      title: '起始值',
      description: '默认显示的起始时间值，格式如2025-07-24',
      sync: true,
      if: (_) => _.isRange === true,
    })
    startValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;

    @Prop<VanDatePickerOptions, 'endValue'>({
      group: '数据属性',
      title: '结束值',
      description: '默认显示的结束时间值，格式如2025-07-24',
      sync: true,
      if: (_) => _.isRange === true,
    })
    endValue: nasl.core.String | nasl.core.Date | nasl.core.DateTime;

    @Prop({
      group: '数据属性',
      title: '最小日期值',
      description: '最小可选的日期值，默认为10年前，日期填写格式为“yyyy-mm-dd”',
    })
    minDate: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;

    @Prop({
      group: '数据属性',
      title: '最大日期值',
      description: '最大可选的日期值，默认为10年后，日期填写格式为“yyyy-mm-dd”',
    })
    maxDate: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;

    @Prop<VanDatePickerOptions, 'type'>({
      group: '主要属性',
      title: '时间类型',
      description: '设置时间选择类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '日期选择',
          },
          {
            title: '日期时间选择',
          },
        ],
      },
      onChange: [
        {
          update: {
            unit: 'day',
            showFormatter: 'YYYY-MM-DD',
            converter: 'YYYY/MM/dd',
          },
          if: (_) => _ === 'date',
        },
        {
          update: {
            unit: 'second',
            showFormatter: 'YYYY-MM-DD HH:mm:ss',
            converter: 'YYYY/MM/dd HH:mm:ss',
          },
          if: (_) => _ === 'datetime',
        },
      ],
    })
    type: 'date' | 'datetime' = 'date';

    @Prop<VanDatePickerOptions, 'unit'>({
      title: '最小单位',
      group: '主要属性',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '日期',
            if: (_) => _.type === 'date',
          },
          {
            title: '月份',
            if: (_) => _.type === 'date',
          },
          {
            title: '年份',
            if: (_) => _.type === 'date',
          },
          {
            title: '时',
            if: (_) => _.type === 'datetime',
          },
          {
            title: '分',
            if: (_) => _.type === 'datetime',
          },
          {
            title: '秒',
            if: (_) => _.type === 'datetime',
          },
        ],
      },
      onChange: [
        {
          update: {
            showFormatter: 'YYYY-MM-DD',
            converter: 'YYYY/MM/dd',
          },
          if: (_) => _ === 'day',
        },
        {
          update: {
            showFormatter: 'YYYY-MM',
            converter: 'YYYY/MM',
          },
          if: (_) => _ === 'month',
        },
        {
          update: {
            showFormatter: 'YYYY',
            converter: 'YYYY',
          },
          if: (_) => _ === 'year',
        },
        {
          update: {
            showFormatter: 'YYYY-MM-DD HH:mm:ss',
            converter: 'YYYY/MM/dd HH:mm:ss',
          },
          if: (_) => _ === 'second',
        },
        {
          update: {
            showFormatter: 'YYYY-MM-DD HH:mm',
            converter: 'YYYY/MM/dd HH:mm',
          },
          if: (_) => _ === 'minute',
        },
        {
          update: {
            showFormatter: 'YYYY-MM-DD HH',
            converter: 'YYYY/MM/dd HH',
          },
          if: (_) => _ === 'hour',
        },
      ],
    })
    unit: 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second' = 'day';

    @Prop<VanDatePickerOptions, 'showFormatter'>({
      group: '主要属性',
      title: '展示格式',
      description: '展示格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '中国（2023年7月26日）',
            if: (_) => _.type === 'date' && _.unit === 'day',
          },
          {
            title: 'ISO（2023-07-26）',
            if: (_) => _.type === 'date' && _.unit === 'day',
          },
          {
            title: 'US（7/26/2023）',
            if: (_) => _.type === 'date' && _.unit === 'day',
          },
          {
            title: 'EU（26/7/2023）',
            if: (_) => _.type === 'date' && _.unit === 'day',
          },
          {
            title: '中国（2023年7月）',
            if: (_) => _.type === 'date' && _.unit === 'month',
          },
          {
            title: 'ISO（2023-07）',
            if: (_) => _.type === 'date' && _.unit === 'month',
          },
          {
            title: 'US/EU（7/2023）',
            if: (_) => _.type === 'date' && _.unit === 'month',
          },
          {
            title: '中国（2023年）',
            if: (_) => _.type === 'date' && _.unit === 'year',
          },
          {
            title: 'ISO（2023）',
            if: (_) => _.type === 'date' && _.unit === 'year',
          },
          {
            title: '2023年7月26日 12时09分09秒',
            if: (_) => _.type === 'datetime' && _.unit === 'second',
          },
          {
            title: '2023-07-26 12:09:09',
            if: (_) => _.type === 'datetime' && _.unit === 'second',
          },
          {
            title: '2023年7月26日 12时09分',
            if: (_) => _.type === 'datetime' && _.unit === 'minute',
          },
          {
            title: '2023-07-26 12:09',
            if: (_) => _.type === 'datetime' && _.unit === 'minute',
          },
          {
            title: '2023年7月26日 12时',
            if: (_) => _.type === 'datetime' && _.unit === 'hour',
          },
          {
            title: '2023-07-26 12',
            if: (_) => _.type === 'datetime' && _.unit === 'hour',
          },
        ],
      },
      if: (_) => !_.advancedFormatEnable,
    })
    showFormatter:
      | 'YYYY年M月D日'
      | 'YYYY-MM-DD'
      | 'M/D/YYYY'
      | 'D/M/YYYY'
      | 'YYYY年M月'
      | 'YYYY-MM'
      | 'M/YYYY'
      | 'D/M/YYYY'
      | 'YYYY年'
      | 'YYYY'
      | 'YYYY年M月D日 HH:mm:ss'
      | 'YYYY-MM-DD HH:mm:ss'
      | 'YYYY年M月D日 HH:mm'
      | 'YYYY-MM-DD HH:mm'
      | 'YYYY年M月D日 HH'
      | 'YYYY-MM-DD HH' = 'YYYY-MM-DD';

      @Prop<VanDatePickerOptions, 'advancedFormatEnable'>({
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
  
      @Prop<VanDatePickerOptions, 'advancedFormatValue'>({
        group: '主要属性',
        title: '高级格式化内容',
        description: '用来控制数字的展示格式',
        if: _ => _.advancedFormatEnable === true,
        bindHide: true,
      })
      advancedFormatValue: nasl.core.String;

    @Prop<VanDatePickerOptions, 'converter'>({
      group: '主要属性',
      title: '转换器',
      description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: 'YYYY/MM/dd',
            if: (_) => _.type === 'date' && _.unit === 'day',
          },
          {
            title: 'YYYY/MM',
            if: (_) => _.type === 'date' && _.unit === 'month',
          },
          {
            title: 'YYYY',
            if: (_) => _.type === 'date' && _.unit === 'year',
          },
          {
            title: 'YYYY/MM/dd HH:mm:ss',
            if: (_) => _.type === 'datetime' && _.unit === 'second',
          },
          {
            title: 'YYYY/MM/dd HH:mm',
            if: (_) => _.type === 'datetime' && _.unit === 'minute',
          },
          {
            title: 'YYYY/MM/dd HH',
            if: (_) => _.type === 'datetime' && _.unit === 'hour',
          },
          {
            title: 'Unix 时间戳',
          },
          {
            title: 'JSON',
          },
          {
            title: 'Date 对象',
          },
        ],
      },
    })
    converter:
      | 'YYYY/MM/dd'
      | 'YYYY/MM'
      | 'YYYY'
      | 'YYYY/MM/dd HH:mm:ss'
      | 'YYYY/MM/dd HH:mm'
      | 'YYYY/MM/dd HH'
      | 'Unix 时间戳' | 'JSON' | 'Date 对象' = 'YYYY/MM/dd';

    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '设置右侧内容的对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '左',
          },
          {
            title: '中',
          },
          {
            title: '右',
          },
        ],
      },
    })
    inputAlign: 'left' | 'center' | 'right' = 'right';

    @Prop({
      group: '主要属性',
      title: '占位提示',
      description: '',
      setter: {
        concept: 'InputSetter',
      },
      implicitToString: true,
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '取消按钮文本',
      description: '取消按钮文本',
      setter: {
        concept: 'InputSetter',
      },
    })
    cancelButtonText: nasl.core.String = '取消';

    @Prop({
      group: '主要属性',
      title: '确认按钮文本',
      description: '确认按钮文本',
      setter: {
        concept: 'InputSetter',
      },
    })
    confirmButtonText: nasl.core.String = '确认';

    @Prop({
      group: '主要属性',
      title: '下一步按钮文本',
      description: '下一步按钮文本',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.isRange === true,
    })
    nextStepText: nasl.core.String;

    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    closeOnClickOverlay: nasl.core.Boolean = true;

    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '弹出状态',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    popupOpened: nasl.core.Boolean = false;

    @Event({
      title: '确认',
      description: '点击完成按钮时触发的事件',
    })
    onConfirm: (event: any) => void;

    @Event({
      title: '取消',
      description: '点击完成取消时触发的事件',
    })
    onCancel: (event: any) => void;

    @Slot({
      title: '组件插槽',
      description: '标题',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: '组件插槽',
      description: '顶部栏标题',
    })
    slotTitle: () => Array<ViewComponent>;
  }
}
