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
    title: '日历',
    icon: 'calendar',
    description: '日历展示',
    group: 'Selector',
  })
  export class VanCalendar extends ViewComponent {
    constructor(options?: Partial<VanCalendarOptions>) {
      super();
    }
    @Prop({
      title: '值',
    })
    modelValue: VanCalendarOptions['modelValue'];

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

  export class VanCalendarOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '类型',
      description: '类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '单个日期',
          },
          {
            title: '多个日期',
          },
          {
            title: '范围',
          },
        ],
      },
      onChange: [
        {
          clear: ['maxRange', 'showRangePrompt', 'rangePrompt'],
        },
      ],
    })
    type: 'single' | 'multiple' | 'range' = 'single';

    @Prop({
      group: '数据属性',
      title: '值',
      sync: true,
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    modelValue:
      | nasl.core.Date
      | nasl.core.String
      | nasl.core.Integer
      | nasl.collection.List<nasl.core.Date | nasl.core.String | nasl.core.Integer>;

    @Prop({
      group: '数据属性',
      title: '最小日期值',
      description: '可选择的最小日期。切换模式 为 平铺 时为当前日期',
    })
    minDate: nasl.core.Date | nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '最大日期值',
      description: '可选择的最大日期。切换模式 为 平铺 时为当前日期的六个月后',
    })
    maxDate: nasl.core.Date | nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '最多可选天数',
      description: '日期最多可选天数',
      if: (_) => _.type === 'range' || _.type === 'multiple',
      setter: { concept: 'NumberInputSetter' },
    })
    maxRange: nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '展示超过最大范围提示',
      description: '范围选择超过最多可选天数时，是否展示提示文案',
      if: (_) => _.type === 'range',
      setter: { concept: 'SwitchSetter' },
    })
    showRangePrompt: nasl.core.Boolean = true;

    @Prop({
      group: '数据属性',
      title: '超过最大范围提示',
      description: '选择超过最多可选天数时的提示文案',
      if: (_) => (_.type === 'range' && _.showRangePrompt) || _.type === 'multiple',
    })
    rangePrompt: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '切换模式',
      description: '切换模式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '平铺月份',
          },
          {
            title: '按月切换',
          },
          {
            title: '按年切换',
          },
        ],
      },
    })
    switchMode: 'none' | 'month' | 'year' = 'none';

    @Prop<VanCalendarOptions, 'showFormatter'>({
      group: '主要属性',
      title: '展示格式',
      description: '展示格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '中国（2023年7月26日）',
          },
          {
            title: 'ISO（2023-07-26）',
          },
          {
            title: 'US（7/26/2023）',
          },
          {
            title: 'EU（26/7/2023）',
          },
        ],
      },
      if: (_) => !_.advancedFormatEnable,
    })
    showFormatter:
      | 'YYYY年M月D日'
      | 'YYYY-MM-DD'
      | 'M/D/YYYY'
      | 'D/M/YYYY' = 'YYYY-MM-DD';

    @Prop<VanCalendarOptions, 'advancedFormatEnable'>({
      group: '主要属性',
      title: '高级格式化',
      description: '用来控制数字的展示格式',
      onChange: [{ clear: ['advancedFormatValue'] }],
      setter: {
        concept: 'SwitchSetter',
      },
    })
    advancedFormatEnable: nasl.core.Boolean = false;

    @Prop<VanCalendarOptions, 'advancedFormatValue'>({
      group: '主要属性',
      title: '高级格式化内容',
      description: '用来控制数字的展示格式',
      if: (_) => _.advancedFormatEnable === true,
      bindHide: true,
    })
    advancedFormatValue: nasl.core.String;

    @Prop<VanCalendarOptions, 'converter'>({
      group: '主要属性',
      title: '转换器',
      description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: 'YYYY/MM/dd',
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
      | 'Unix 时间戳'
      | 'JSON'
      | 'Date 对象' = 'YYYY/MM/dd';

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
      title: '确认按钮文本',
      description: '确认按钮文本',
      setter: {
        concept: 'InputSetter',
      },
    })
    confirmText: nasl.core.String = '确认';

    @Prop({
      group: '主要属性',
      title: '确认按钮禁用态文字',
      description: '确认按钮处于禁用状态时的文字',
      setter: {
        concept: 'InputSetter',
      },
    })
    confirmDisabledText: nasl.core.String = '确认';

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
      title: '确认时',
      description: '点击完成按钮时触发的事件',
    })
    onConfirm: (event: Date | Array<Date>) => void;

    @Event({
      title: '选择时',
      description: '选择日期时触发的事件',
    })
    onSelect: (event: Date | Array<Date>) => void;

    @Event({
      title: '打开时',
      description: '打开时触发的事件',
    })
    onOpen: () => void;

    @Event({
      title: '关闭时',
      description: '关闭时触发的事件',
    })
    onClose: () => void;

    @Event({
      title: '打开后',
      description: '打开弹出层且动画结束后触发',
    })
    onOpened: () => void;

    @Event({
      title: '关闭后',
      description: '关闭弹出层且动画结束后触发',
    })
    onClosed: () => void;

    @Event({
      title: '取消选择时',
      description: '当日历组件的选择类型为多个日期时，取消选中日期时触发',
    })
    onUnselect: (event: Date) => void;

    @Event({
      title: '月份进入可视区域时',
      description: '当某个月份进入可视区域时触发（切换模式为平铺月份时生效）',
    })
    onMonthShow: (event: {
      date: Date;
      title: string;
    }) => void;

    @Event({
      title: '超过最大范围时',
      description: '范围选择超过最多可选天数时触发',
    })
    onOverRange: () => void;

    @Event({
      title: '点击副标题时',
      description: '点击日历副标题时触发',
    })
    onClickSubtitle: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => void;

    @Event({
      title: '点击禁用日期时',
      description: '点击禁用日期时触发',
    })
    onClickDisabledDate: (event: Date | Array<Date>) => void;

    @Event({
      title: '点击遮罩层时',
      description: '点击遮罩层时触发',
    })
    onClickOverlay: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => void;

    @Event({
      title: '面板切换时',
      description: '面板切换时触发',
    })
    onPanelChange: (event: {
      date: Date;
    }) => void;

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

    @Slot({
      title: '组件插槽',
      description: '副标题',
    })
    slotSubtitle: () => Array<ViewComponent>;
  }
}
