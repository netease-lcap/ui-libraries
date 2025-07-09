/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 15,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '密码输入框',
    icon: 'password-input',
    description: '密码输入框，用于安全地输入密码。',
    group: 'Form',
  })
  export class VanPasswordInput extends ViewComponent {
    constructor(options?: Partial<VanPasswordInputOptions>) {
      super();
    }
  }

  export class VanPasswordInputOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      sync: true,
      title: '值',
      description: '密码输入框的值',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '密码长度',
      description: '密码长度',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        max: 20,
      },
    })
    length: nasl.core.Decimal = 6;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请输入密码';

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用密码输入框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '只读',
      description: '只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '自动聚焦',
      description: '自动聚焦',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '隐藏密码',
      description: '是否隐藏密码',
      setter: { concept: 'SwitchSetter' },
    })
    mask: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '聚焦时显示光标',
      description: '聚焦时是否显示光标',
      setter: { concept: 'SwitchSetter' },
    })
    showCursor: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '错误状态',
      description: '是否显示错误状态',
      setter: { concept: 'SwitchSetter' },
    })
    error: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '错误信息',
      description: '错误信息',
      setter: { concept: 'InputSetter' },
    })
    errorMessage: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '输入框间距',
      description: '输入框间距',
      setter: { concept: 'InputSetter' },
    })
    gutter: nasl.core.String = '0px';

    @Prop({
      group: '样式属性',
      title: '输入框大小',
      description: '输入框大小',
      setter: { concept: 'InputSetter' },
    })
    size: nasl.core.String = '35px';

    @Prop({
      group: '样式属性',
      title: '输入框颜色',
      description: '输入框颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#1989fa';

    @Prop({
      group: '样式属性',
      title: '输入框背景色',
      description: '输入框背景色',
      setter: { concept: 'InputSetter' },
    })
    backgroundColor: nasl.core.String = '#f2f3f5';

    @Prop({
      group: '样式属性',
      title: '输入框边框颜色',
      description: '输入框边框颜色',
      setter: { concept: 'InputSetter' },
    })
    borderColor: nasl.core.String = '#ebedf0';

    @Prop({
      group: '样式属性',
      title: '输入框圆角',
      description: '输入框圆角',
      setter: { concept: 'InputSetter' },
    })
    borderRadius: nasl.core.String = '4px';

    @Prop({
      group: '主要属性',
      title: '最大长度',
      description: '最大输入长度',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        max: 20,
      },
    })
    maxlength: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '最小长度',
      description: '最小输入长度',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        max: 20,
      },
    })
    minlength: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '必填',
      description: '是否必填',
      setter: { concept: 'SwitchSetter' },
    })
    required: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '表单字段名称',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Event({
      title: '输入时',
      description: '输入时触发',
    })
    onInput: (event: nasl.core.String) => any;

    @Event({
      title: '完成时',
      description: '密码输入完成时触发',
    })
    onFinish: (event: nasl.core.String) => any;

    @Event({
      title: '聚焦时',
      description: '获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: '失焦时',
      description: '失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: (event: any) => any;

    @Event({
      title: '键盘按下时',
      description: '键盘按下时触发',
    })
    onKeydown: (event: any) => any;

    @Slot({
      title: 'Default',
      description: '自定义输入框内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
