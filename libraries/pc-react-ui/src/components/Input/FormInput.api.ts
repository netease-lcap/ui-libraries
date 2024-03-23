/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单输入框',
    description: '表单输入框',
  })
  export class FormInput extends ViewComponent {
    constructor(options?: Partial<FormInputOptions>) {
      super();
    }
  }

  export class FormInputOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '标题自定义',
      description: '开启标题自定义后,标题去会变成插槽,可以自由拖入组件定义标题',
      docDescription: '开启标题自定义后,标题去会变成插槽,可以自由拖入组件定义标题',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    labelIsSlot: nasl.core.Boolean = false;

    @Prop<FormInputOptions, 'labelText'>({
      group: '主要属性',
      title: '标题',
      docDescription: '选择分组的标题，标题只有在没有文本插槽的时候生效',
      if: (_) => _.labelIsSlot === false,
    })
    labelText: nasl.core.String;

    @Prop({
      title: '字段名称',
      description: '表单项名称。',
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '占据数',
      description: '列跨越的格数',
      docDescription: '列跨越的格数。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    span: nasl.core.Decimal = 24;

    @Prop({
      group: '主要属性',
      title: '必填标记',
      description: '是否必填。仅显示样式，如果要验证必填项，需要在`rules`中添加必填规则。',
      docDescription: '是否必填。仅显示样式，如果要验证必填项，需要在rules中添加必填规则。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    required: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '释义提示',
      description: '鼠标悬浮标签后的图标显示释义提示信息',
      docDescription: '默认提示消息。',
    })
    tooltip: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '验证规则',
      description: '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型',
      docDescription: '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型，详见[验证规则](#验证规则)。',
      bindHide: true,
    })
    rules: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '类型',
      description: '文本框或者密码框',
      docDescription: '文本框或者密码框。文本：文本类型。密码：密码类型。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '文本' }, { title: '密码' }],
      },
    })
    type: 'text' | 'password' = 'text';

    @Prop({
      group: '数据属性',
      title: '值',
      description: '输入的值',
      sync: true,
      docDescription: '输入框的值。',
    })
    value: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '为空时显示的占位符文本',
      docDescription: '内容为空时的提示文本。',
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '最大字符数',
      docDescription: '限定输入文本最大长度。',
      setter: {
        concept: 'NumberInputSetter',
        precision: 0,
      },
    })
    maxlength: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '前缀图标',
      docDescription: '设置输入框的前缀图标。',
      setter: {
        concept: 'IconSetter',
      },
    })
    prefix: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '后缀图标',
      docDescription: '设置输入框的后缀图标。',
      setter: {
        concept: 'IconSetter',
      },
    })
    suffix: nasl.core.String = '';

    @Prop({
      group: '交互属性',
      title: '可清除',
      description: '可点击清除按钮一键清除内容',
      docDescription: '是否在输入框有内容时会显示清除内容的按钮。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    allowClear: nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '是否展示字数',
      description: '是否展示字数',
      designerValue: false,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showCount: nasl.core.Boolean = false;

    @Event({
      title: '改变后',
      description: '值变化时触发。（注意：与原生事件不同）',
    })
    onChange: (event: { value: nasl.core.String; oldValue: nasl.core.String }) => any;

    @Event({
      title: '获得焦点',
      description: '获得焦点时触发。',
    })
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '失去焦点',
      description: '失去焦点时触发。',
    })
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    @Event({
      title: '键盘按下',
      description: '键盘按键按下时触发',
    })
    onKeyDown: (event: {
      altKey: nasl.core.Boolean;
      code: nasl.core.String;
      ctrlKey: nasl.core.Boolean;
      isComposing: nasl.core.Boolean;
      key: nasl.core.String;
      metaKey: nasl.core.Boolean;
      repeat: nasl.core.Boolean;
      shiftKey: nasl.core.Boolean;
    }) => any;

    @Event({
      title: '键盘松开',
      description: '键盘按键松开时触发',
    })
    onKeyUp: (event: {
      altKey: nasl.core.Boolean;
      code: nasl.core.String;
      ctrlKey: nasl.core.Boolean;
      isComposing: nasl.core.Boolean;
      key: nasl.core.String;
      metaKey: nasl.core.Boolean;
      repeat: nasl.core.Boolean;
      shiftKey: nasl.core.Boolean;
    }) => any;
  }
}
