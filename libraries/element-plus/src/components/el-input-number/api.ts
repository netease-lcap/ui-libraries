/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '数字输入框',
    icon: 'number',
    description: '仅允许输入标准的数字值，可定义范围',
    group: 'Form',
  })
  export class ElInputNumber extends ViewComponent {
    constructor(options?: Partial<ElInputNumberOptions>) {
      super();
    }
  }

  export class ElInputNumberOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '值',
      description: '绑定值',
      setter: { concept: 'NumberInputSetter' },
    })
    value: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '最小值',
      description: '允许的最小值',
      setter: { concept: 'NumberInputSetter' },
    })
    min: nasl.core.Decimal = -Infinity;

    @Prop({
      group: '主要属性',
      title: '最大值',
      description: '允许的最大值',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal = Infinity;

    @Prop({
      group: '主要属性',
      title: '步长',
      description: '计数器步长',
      setter: { concept: 'NumberInputSetter' },
    })
    step: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: '严格步长',
      description: '是否只能输入步长的倍数',
      setter: { concept: 'SwitchSetter' },
    })
    stepStrictly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '精度',
      description: '数值精度',
      setter: { concept: 'NumberInputSetter' },
    })
    precision: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '计数器尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '小' }],
      },
    })
    size: '' | 'default' | 'large' | 'small';

    @Prop({
      group: '主要属性',
      title: '只读',
      description: '是否只读',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用计数器',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '控制按钮',
      description: '是否使用控制按钮',
      setter: { concept: 'SwitchSetter' },
    })
    controls: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '控制按钮位置',
      description: '控制按钮位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '右侧' }],
      },
    })
    controlsPosition: '' | 'right';

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '原生 name 属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '输入框占位文本',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '清空值',
    //   description: '输入框被清空时显示的值',
    //   setter: { concept: 'InputSetter' },
    // })
    // valueOnClear: nasl.core.Decimal | null;

    @Prop({
      group: '主要属性',
      title: '表单验证',
      description: '是否触发表单验证',
      setter: { concept: 'SwitchSetter' },
    })
    validateEvent: nasl.core.Boolean = true;

    @Event({
      title: '值改变时',
      description: '绑定值被改变时触发',
    })
    onChange: (value: nasl.core.Decimal) => any;

    @Event({
      title: '失去焦点时',
      description: '在 Input 失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '获得焦点时',
      description: '在 Input 获得焦点时触发',
    })
    onFocus: (event: any) => any;
  }
}
