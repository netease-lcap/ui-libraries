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
    title: '密码输入框',
    icon: 'password',
    description: '用于输入密码，支持显示/隐藏密码',
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
      title: '绑定值',
      sync: true,
      description: '密码输入框绑定值',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.String = '';

    @Prop({
      group: '数据属性',
      title: '长度',
      description: '密码长度',
      setter: { concept: 'NumberInputSetter' },
    })
    length: nasl.core.Integer = 6;

    @Prop({
      group: '数据属性',
      title: '自动聚焦',
      description: '是否自动聚焦',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

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
      description: '是否只读',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请输入密码';

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '标识符',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示密码',
      description: '是否显示密码',
      setter: { concept: 'SwitchSetter' },
    })
    showPassword: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '隐藏密码',
      description: '是否隐藏密码',
      setter: { concept: 'SwitchSetter' },
    })
    hidePassword: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '错误信息',
      description: '错误信息',
      setter: { concept: 'InputSetter' },
    })
    errorInfo: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '提示信息',
      description: '提示信息',
      setter: { concept: 'InputSetter' },
    })
    info: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '高亮',
      description: '是否高亮',
      setter: { concept: 'SwitchSetter' },
    })
    highlight: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '聚焦',
      description: '是否聚焦',
      setter: { concept: 'SwitchSetter' },
    })
    focused: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '清除',
      description: '是否显示清除按钮',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '最大长度',
      description: '最大输入长度',
      setter: { concept: 'NumberInputSetter' },
    })
    maxlength: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '最小长度',
      description: '最小输入长度',
      setter: { concept: 'NumberInputSetter' },
    })
    minlength: nasl.core.Integer;

    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '密码输入框尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '小' }],
      },
    })
    size: 'default' | 'large' | 'small' = 'default';

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

    @Prop({
      group: '样式属性',
      title: '背景色',
      description: '背景色',
      setter: { concept: 'InputSetter' },
    })
    backgroundColor: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '边框颜色',
      description: '边框颜色',
      setter: { concept: 'InputSetter' },
    })
    borderColor: nasl.core.String;

    @Prop({
      group: '状态属性',
      title: '预览',
      description: '是否预览',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    @Event({
      title: '值改变时',
      description: '值改变时触发',
    })
    onChange: (value: nasl.core.String) => void;

    @Event({
      title: '聚焦时',
      description: '聚焦时触发',
    })
    onFocus: (event: {}) => void;

    @Event({
      title: '失焦时',
      description: '失焦时触发',
    })
    onBlur: (event: {}) => void;

    @Event({
      title: '点击时',
      description: '点击时触发',
    })
    onClick: (event: {}) => void;

    @Event({
      title: '清除时',
      description: '清除时触发',
    })
    onClear: (event: {}) => void;

    @Event({
      title: '完成时',
      description: '输入完成时触发',
    })
    onComplete: (value: nasl.core.String) => void;
  }
}
