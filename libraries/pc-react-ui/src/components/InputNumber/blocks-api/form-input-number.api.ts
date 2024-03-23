/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '表单输入框',
    description: '表单输入框',
  })
  export class FormInputNumber extends ViewComponent {
    constructor(options?: Partial<FormInputNumberOptions & FormItemOptions>) {
      super();
    }
  }

  export class FormInputNumberOptions extends ViewComponentOptions {
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
