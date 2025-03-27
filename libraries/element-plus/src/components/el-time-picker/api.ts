/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
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
  export class ElTimePicker extends ViewComponent {
    @Prop({
      title: '值',
    })
    modelValue: nasl.core.Time;

    @Prop({
      title: '起始值',
    })
    startValue: nasl.core.Time;

    @Prop({
      title: '结束值',
    })
    endValue: nasl.core.Time;

    @Method({
      title: '使组件获取焦点',
      description: '使组件获取焦点',
    })
    focus: () => void;

    @Method({
      title: '使组件失去焦点',
      description: '使组件失去焦点',
    })
    blur: () => void;

    @Method({
      title: '打开时间选择器弹窗',
      description: '打开时间选择器弹窗',
    })  
    handleOpen: () => void;

    @Method({
      title: '关闭时间选择器弹窗',
      description: '关闭时间选择器弹窗',
    })
    handleClose: () => void;

    constructor(options?: Partial<ElTimePickerOptions>) {
      super();
    }
  }

  export class ElTimePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '区间选择',
      description: '是否支持进行时间区间选择，关闭则为时间点选择',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [{ clear: ['startPlaceholder', 'endPlaceholder'] }],
    })
    isRange: nasl.core.Boolean = false;

    @Prop<ElTimePickerOptions, 'value'>({
      group: '数据属性',
      title: '值',
      description: '选中值。',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.isRange,
      sync: true,
    })
    value: nasl.core.String | nasl.core.Time;

    @Prop<ElTimePickerOptions, 'startValue'>({
      group: '数据属性',
      title: '起始值',
      description: '默认显示的起始时间值，格式如08:08:08',
      sync: true,
      if: (_) => _.isRange === true,
    })
    startValue: nasl.core.String | nasl.core.Time;

    @Prop<ElTimePickerOptions, 'endValue'>({
      group: '数据属性',
      title: '结束值',
      description: '默认显示的结束时间值，格式如08:08:08',
      sync: true,
      if: (_) => _.isRange === true,
    })
    endValue: nasl.core.String | nasl.core.Time;

    @Prop({
      group: '主要属性',
      title: '允许输入',
      description: '是否允许直接输入时间',
      setter: { concept: 'SwitchSetter' },
    })
    editable: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '禁止选择部分小时选项',
      description: '禁止选择部分小时选项',
      docDescription: '禁止选择部分小时选项',
      bindOpen: true,
      setter: {
          concept: 'AnonymousFunctionSetter',
      }
    })
    disabledHours: (role: nasl.core.String, comparingDate: any) => {
      /**
       * @title 禁止选择的小时
       */
      hours: nasl.collection.List<nasl.core.Integer>
    };

    @Prop({
      group: '主要属性',
      title: '禁止选择部分分钟选项',
      description: '禁止选择部分分钟选项',
      docDescription: '禁止选择部分分钟选项',
      bindOpen: true,
      setter: {
          concept: 'AnonymousFunctionSetter',
      }
    })
    disabledMinutes: (hour: nasl.core.Integer, role: nasl.core.String, comparingDate: any) => {
      /**
       * @title 禁止选择的分钟
       */
      minutes: nasl.collection.List<nasl.core.Integer>
    };

    @Prop({
      group: '主要属性',
      title: '禁止选择部分秒选项',
      description: '禁止选择部分秒选项',
      docDescription: '禁止选择部分秒选项',
      bindOpen: true,
      setter: {
          concept: 'AnonymousFunctionSetter',
      }
    })
    disabledSeconds: (hour: nasl.core.Integer, minute: nasl.core.Integer, role: nasl.core.String, comparingDate: any) => {
      /**
       * @title 禁止选择的秒
       */
      seconds: nasl.collection.List<nasl.core.Integer>
    };

    @Prop({
      group: '主要属性',
      title: '可清除',
      description: '是否允许清除选中值',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '只读',
      description: '只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop<ElTimePickerOptions, 'format'>({
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
        ],
      },
    })
    format: 'HH:mm:ss' | 'HH时mm分ss秒' | 'HH:mm' | 'HH时mm分' = 'HH:mm:ss';

    @Prop<ElTimePickerOptions, 'placeholder'>({
      group: '主要属性',
      title: '占位符',
      description: '非范围选择时的占位内容',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.isRange,
      sync: true,
    })
    placeholder: nasl.core.String = '请选择时间';

    @Prop<ElTimePickerOptions, 'startPlaceholder'>({
      group: '主要属性',
      title: '起始占位符',
      description:
        '时间选择框无内容时的提示信息，支持自定义编辑, 在没有设置的时候使用placeholder作为右侧占位符内容',
      if: (_) => _.isRange === true,
      implicitToString: true,
      setter: {
        concept: 'InputSetter',
        placeholder: '同占位符一致',
      },
    })
    startPlaceholder: nasl.core.String = '请选择时间';

    @Prop<ElTimePickerOptions, 'endPlaceholder'>({
      group: '主要属性',
      title: '结束占位符',
      description: '结束占位符',
      setter: { concept: 'InputSetter' },
      if: (_) => _.isRange === true,
    })
    endPlaceholder: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '箭头控制',
      description: '是否使用箭头控制时间',
      setter: { concept: 'SwitchSetter' },
    })
    arrowControl: nasl.core.Boolean = false;

    @Prop<ElTimePickerOptions, 'separator'>({
      group: '主要属性',
      title: '分隔符',
      description: '日期分隔符，支持全局配置，默认为 -',
      if: (_) => _.isRange === true,
      setter: {
        concept: 'InputSetter',
      },
    })
    separator: nasl.core.String = '-';

    @Prop({
      title: '前缀图标',
      description: '前缀图标',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    prefixIcon: nasl.core.String = 'Clock';

    @Prop({
      title: '自定义清除图标',
      description: '自定义清除图标',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    clearIcon: nasl.core.String = 'CircleClose';

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '尺寸。可选项：small/medium/large',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '大' }, { title: '中' }, { title: '小' }],
      },
    })
    size: 'large' | 'default' | 'small' = 'default';

    @Prop({
      group: '样式属性',
      title: '将下拉列表插入至 body 元素',
      description: '是否将 popover 的下拉列表插入至 body 元素',
      setter: { concept: 'SwitchSetter' },
    })
    teleported: nasl.core.Boolean = true;

    @Event({
      title: '改变后',
      description: '值变化时触发。',
    })
    onChange: (event: nasl.collection.List<nasl.core.Time>) => any;

    @Event({
      title: '失去焦点',
      description: '失去焦点时触发',
    })
    onBlur: (event: FocusEvent) => any;

    @Event({
      title: '聚焦',
      description: '聚焦时触发',
    })
    onFocus: (event: FocusEvent) => any;

    @Event({
      title: '清除',
      description: '清除时触发',
    })
    onClear: (event: FocusEvent) => any;

    @Event({
      title: '显示',
      description: '显示时触发',
    })
    onVisibleChange: (event: nasl.core.Boolean) => any;
  }


  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      ignoreProperty: ['rules'],
      bindStyleAttr: 'inputStyle',
      bindStyleSelector: '.__cw-form-compose-input',
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
      forceRefresh: 'parent',
      namedSlotOmitWrapper: ['label'],
    },
    extends: [{
      name: 'ElFormItemPro',
      excludes: [
        'slotDefault',
      ],
    }, {
      name: 'ElDatePicker',
    }],
  })
  @Component({
    title: '时间选择器',
    description: '表单时间选择器',
    group: 'Form',
  })
  export class ElFormTimePicker extends ViewComponent {
    constructor(options?: Partial<ElFormTimePickerOptions & ElFormItemProOptions & Omit<ElTimePickerOptions, keyof ElFormItemProOptions>>) {
      super();
    }
  }

  export class ElFormTimePickerOptions extends ViewComponentOptions {
    @Prop<ElFormTimePickerOptions, 'useRangeValue'>({
      group: '数据属性',
      title: '使用区间字段',
      description: '使用区间字段, 用于日期、时间、日期时间选择器开启区间选择时，托管起始值与结束值',
      setter: { concept: 'SwitchSetter' },
      if: (_) => false,
      bindHide: true,
    })
    useRangeValue: nasl.core.Boolean = false;

    @Prop<ElFormTimePickerOptions, 'isRange'>({
      group: '数据属性',
      title: '区间选择',
      description: '是否支持进行时间区间选择，关闭则为时间点选择',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [
        {
          clear: ['startPlaceholder', 'endPlaceholder'],
        },
        {
          clear: ['placeholder'],
          if: (_) => !_,
        },
        {
          update: {
            useRangeValue: true,
          },
          if: (_) => !!_,
        },
        {
          update: {
            useRangeValue: false,
          },
          clear: ['startPlaceholder', 'endPlaceholder', 'name', 'startFieldName', 'endFieldName'],
          if: (_) => !_,
        },
      ],
      bindHide: true,
    })
    isRange: nasl.core.Boolean = false;
  }
}
