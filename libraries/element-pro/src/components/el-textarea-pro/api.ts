/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '多行文本框',
    icon: 'textarea',
    description: '',
    group: 'Form',
  })
  export class ElTextareaPro extends ViewComponent {
    constructor(options?: Partial<ElTextareaProOptions>) {
      super();
    }
  }

  export class ElTextareaProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Allow Input Over Max',
      description: '超出maxlength或maxcharacter之后是否还允许输入',
      setter: { concept: 'SwitchSetter' },
    })
    allowInputOverMax: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Autofocus',
      description: '自动聚焦，拉起键盘',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Autosize',
      description:
        '高度自动撑开。 autosize = true 表示组件高度自动撑开，同时，依旧允许手动拖高度。如果设置了 autosize.maxRows 或者 autosize.minRows 则不允许手动调整高度。',
      setter: { concept: 'InputSetter' },
    })
    autosize: nasl.core.Boolean | object = false;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用文本框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '左侧文本。',
      setter: { concept: 'InputSetter' },
    })
    label: any;

    @Prop({
      group: '主要属性',
      title: 'Maxcharacter',
      description: '用户最多可以输入的字符个数，一个中文汉字表示两个字符长度',
      setter: { concept: 'NumberInputSetter' },
    })
    maxcharacter: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Maxlength',
      description: '用户最多可以输入的字符个数',
      setter: { concept: 'InputSetter' },
    })
    maxlength: nasl.core.Decimal | nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: '名称，HTML 元素原生属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Placeholder',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Readonly',
      description: '只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Status',
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
    status: 'default' | 'success' | 'warning' | 'error';

    @Prop({
      group: '主要属性',
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
      setter: { concept: 'InputSetter' },
    })
    tips: any;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '文本框值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '文本框值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: nasl.core.String | nasl.core.Decimal;

    @Event({
      title: 'On Blur',
      description: '失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: 'On Change',
      description: '输入内容变化时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Focus',
      description: '获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: 'On Keydown',
      description: '键盘按下时触发',
    })
    onKeydown: (event: any) => any;

    @Event({
      title: 'On Keypress',
      description: '按下字符键时触发（keydown -> keypress -> keyup）',
    })
    onKeypress: (event: any) => any;

    @Event({
      title: 'On Keyup',
      description: '释放键盘时触发',
    })
    onKeyup: (event: any) => any;

    @Slot({
      title: 'Label',
      description: '左侧文本。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    })
    slotTips: () => Array<ViewComponent>;
  }
}
