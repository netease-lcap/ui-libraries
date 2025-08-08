/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '步进器',
    icon: 'numberh5',
    description: '数字步进器',
    group: 'Form',
  })
  export class VanStepperNumber extends ViewComponent {
    constructor(options?: Partial<VanStepperNumberOptions>) {
      super();
    }
  }

  export class VanStepperNumberOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      sync: true,
      description: '步进器绑定值',
    })
    modelValue: nasl.core.Integer | nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '最小值',
      description: '允许的最小值',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Integer = 1;

    @Prop({
      group: '数据属性',
      title: '最大值',
      description: '允许的最大值',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Integer;

    @Prop({
      group: '数据属性',
      title: '自动校正',
      description: '是否自动校正超出范围的值',
      setter: { concept: 'SwitchSetter' },
    })
    autoFixed: nasl.core.Boolean = true;

    @Prop({
      group: '数据属性',
      title: '只允许输入整数',
      description: '是否只允许输入整数',
      setter: { concept: 'SwitchSetter' },
    })
    integer: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '步长',
      description: '每次点击时改变的值',
      setter: { concept: 'NumberInputSetter' },
    })
    step: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用步进器',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用增加按钮',
      description: '是否禁用增加按钮',
      setter: { concept: 'SwitchSetter' },
    })
    disablePlus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用减少按钮',
      description: '是否禁用减少按钮',
      setter: { concept: 'SwitchSetter' },
    })
    disableMinus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用输入框',
      description: '是否禁用输入框',
      setter: { concept: 'SwitchSetter' },
    })
    disableInput: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '长按手势',
      description: '是否开启长按手势',
      setter: { concept: 'SwitchSetter' },
    })
    longPress: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '输入框宽度',
      description: '输入框宽度，默认单位为 px',
      setter: { concept: 'NumberInputSetter' },
    })
    inputWidth: nasl.core.Integer = 32;

    @Prop({
      group: '主要属性',
      title: '按钮大小',
      description: '按钮大小，默认单位为 px',
      setter: { concept: 'NumberInputSetter' },
    })
    buttonSize: nasl.core.Integer = 28;

    @Prop({
      group: '主要属性',
      title: '小数长度',
      description: '小数长度',
      setter: { concept: 'NumberInputSetter' },
    })
    decimalLength: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '输入框占位提示文字',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示输入框',
      description: '是否显示输入框',
      setter: { concept: 'SwitchSetter' },
    })
    showInput: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示增加按钮',
      description: '是否显示增加按钮',
      setter: { concept: 'SwitchSetter' },
    })
    showPlus: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示减少按钮',
      description: '是否显示减少按钮',
      setter: { concept: 'SwitchSetter' },
    })
    showMinus: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '允许输入空值',
      description: '是否允许输入空值',
      setter: { concept: 'SwitchSetter' },
    })
    allowEmpty: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '主题',
      description: '主题风格',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '圆角' }],
      },
    })
    theme: 'default' | 'round' = 'default';

    @Event({
      title: '值改变时',
      description: '绑定值被改变时触发',
    })
    onChange: (value: nasl.core.Integer) => void;

    @Event({
      title: '超过限制时',
      description: '点击不可用的按钮时触发',
    })
    onOverlimit: () => void;

    @Event({
      title: '增加时',
      description: '点击增加按钮时触发',
    })
    onPlus: () => void;

    @Event({
      title: '减少时',
      description: '点击减少按钮时触发',
    })
    onMinus: () => void;

    @Event({
      title: '输入框聚焦时',
      description: '输入框聚焦时触发',
    })
    onFocus: (event: {}) => void;

    @Event({
      title: '输入框失焦时',
      description: '输入框失焦时触发',
    })
    onBlur: (event: {}) => void;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '表单步进器',
    description: '表单步进器',
    group: 'Form',
  })
  export class VanFormStepperNumber extends VanStepperNumber {
    constructor(
      options?: Partial<
        VanFormStepperNumberOptions & VanFormItemOptions & Omit<VanStepperNumberOptions, keyof VanFormItemOptions>
      >,
    ) {
      super();
    }
  }

  export class VanFormStepperNumberOptions extends VanStepperNumberOptions {}
}
