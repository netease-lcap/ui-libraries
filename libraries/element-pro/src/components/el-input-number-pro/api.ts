/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
    ideusage: {
      idetype: 'element'
    }
  })
  @Component({
    title: '数字输入框',
    icon: 'number',
    description: '',
    group: 'Form',
  })
  export class ElInputNumberPro extends ViewComponent {
    constructor(options?: Partial<ElInputNumberProOptions>) {
      super();
    }

    @Prop({
      title: '值'
    })
    value: nasl.core.Decimal;
  }

  export class ElInputNumberProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '值',
      description:
        '数字输入框的值。当值为 "" 时，输入框显示为空。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '对齐',
      description: '文本内容位置，居左/居中/居右。可选项：left/center/right',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '居左' }, { title: '居中' }, { title: '居右' }],
      },
    })
    align: 'left' | 'center' | 'right';

    @Prop({
      group: '主要属性',
      title: '允许输入超出最大长度',
      description:
        '是否允许输入超过 `max` `min` 范围外的数字。为保障用户体验，仅在失去焦点时进行数字范围矫正。默认允许超出，数字超出范围时，输入框变红提醒',
      setter: { concept: 'SwitchSetter' },
    })
    allowInputOverLimit: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '宽度自适应',
      description: '宽度随内容自适应',
      setter: { concept: 'SwitchSetter' },
    })
    autoWidth: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '小数位',
      description: '',
      setter: {
        concept: 'NumberInputSetter',
        precision: 0,
        min: 0,
        max: 17,
      },
    })
    decimalPlaces: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '禁用组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '格式化',
      description:
        '格式化输入框展示值。第二个事件参数 `context.fixedNumber` 表示处理过小数位数 `decimalPlaces` 的数字。',
      setter: {
        concept: 'AnonymousFunctionSetter'
      },
    })
    format: (value: nasl.core.Decimal) => any;

    @Prop({
      group: '主要属性',
      title: 'Input Props',
      description: '透传 Input 输入框组件全部属性。',
      setter: { concept: 'InputSetter' },
    })
    private inputProps: object;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '左侧文本。',
      setter: { concept: 'InputSetter' },
    })
    private label: any;

    @Prop({
      group: '主要属性',
      title: '大数字',
      description:
        '是否作为大数使用。JS 支持的最大数字位数是 16 位，超过 16 位的数字需作为字符串大数处理。此时，数据类型必须保持为字符串，否则会丢失数据',
      setter: { concept: 'SwitchSetter' },
    })
    private largeNumber: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '最大值',
      description: '最大值。如果是大数，请传入字符串。',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '最小值',
      description: '最小值。如果是大数，请传入字符串。',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '只读',
      description: '只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '组件尺寸。可选项：small/medium/large',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中等' }, { title: '大' }],
      },
    })
    size: 'small' | 'medium' | 'large' = 'medium';

    @Prop({
      group: '主要属性',
      title: '状态',
      description: '文本框状态。可选项：default/success/warning/error',
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
      title: '步长',
      description:
        '数值改变步数，可以是小数。如果是大数，请保证数据类型为字符串。',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
    })
    step: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: '后缀',
      description: '后置内容。',
      setter: { concept: 'InputSetter' },
    })
    suffix: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '风格',
      description: '按钮布局。可选项：column/row/normal',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'column' }, { title: 'row' }, { title: 'normal' }],
      },
    })
    theme: 'column' | 'row' | 'normal' = 'row';

    @Prop({
      group: '主要属性',
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
      setter: { concept: 'InputSetter' },
    })
    private tips: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '数字输入框的值。当值为 "" 时，输入框显示为空。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    private defaultValue: nasl.core.String | nasl.core.Decimal;

    // 👇inputProps
    @Prop({
      group: '交互属性',
      title: '自动聚焦',
      description: '自动聚焦',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '无边框',
      description: '是否开启无边框模式',
      setter: { concept: 'SwitchSetter' },
    })
    borderless: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '名称',
      setter: { concept: 'InputSetter' },
    })
    private name: nasl.core.String;
    // 👆inputProps

    @Event({
      title: '失去焦点时',
      description: '失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '改变时',
      description: '值变化时触发，`type` 表示触发本次变化的来源。',
    })
    onChange: (event: any) => any;

    @Event({
      title: '回车按下时',
      description: '回车键按下时触发',
    })
    onEnter: (event: any) => any;

    @Event({
      title: '获取焦点时',
      description: '获取焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: '键盘按下时',
      description: '键盘按下时触发',
    })
    onKeydown: (event: any) => any;

    @Event({
      title: '按下字符键时',
      description: '按下字符键时触发（keydown -> keypress -> keyup）',
    })
    onKeypress: (event: any) => any;

    @Event({
      title: '释放键盘时',
      description: '释放键盘时触发',
    })
    onKeyup: (event: any) => any;

    @Event({
      title: '校验结束时',
      description:
        '最大值或最小值校验结束后触发，`exceed-maximum` 表示超出最大值，`below-minimum` 表示小于最小值',
    })
    onValidate: (event: any) => any;

    // @Slot({
    //   title: 'Label',
    //   description: '左侧文本。',
    // })
    // slotLabel: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Suffix',
    //   description: '后置内容。',
    // })
    // slotSuffix: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Tips',
    //   description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    // })
    // slotTips: () => Array<ViewComponent>;
  }
}
