/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: 'preview',
    },
  })
  @Component({
    title: '步进器',
    icon: 'stepper',
    description: '用于数量选择，支持步进和手动输入',
    group: 'Form',
  })
  export class VanStepper extends ViewComponent {
    constructor(options?: Partial<VanStepperOptions>) {
      super();
    }
  }

  export class VanStepperOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '步进器绑定值',
    })
    modelValue: nasl.core.Integer;

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
      title: '自动校正超',
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
      group: '数据属性',
      title: '精度',
      description: '数值精度',
      setter: { concept: 'NumberInputSetter' },
    })
    precision: nasl.core.Integer = 0;

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
      title: '只读',
      description: '是否只读',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

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
      title: '异步变更',
      description: '是否开启异步变更，开启后需要手动控制输入值',
      setter: { concept: 'SwitchSetter' },
    })
    asyncChange: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '输入框宽度',
      description: '输入框宽度，默认单位为 px',
      setter: { concept: 'InputSetter' },
    })
    inputWidth: nasl.core.String = '32px';

    @Prop({
      group: '主要属性',
      title: '按钮大小',
      description: '按钮大小，默认单位为 px',
      setter: { concept: 'InputSetter' },
    })
    buttonSize: nasl.core.String = '28px';

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
    placeholder: nasl.core.String ;

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
}
