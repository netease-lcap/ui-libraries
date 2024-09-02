/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
    ideusage: {
      idetype: 'element'
    }
  })
  @Component({
    title: '多行输入',
    icon: 'textarea',
    description: '',
    group: 'Form',
  })
  export class ElTextareaPro extends ViewComponent {
    constructor(options?: Partial<ElTextareaProOptions>) {
      super();
    }
    @Prop({
      title: '值',
    })
    value: nasl.core.String;
  }

  export class ElTextareaProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '值',
      description: '文本框值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '允许输入超出最大长度',
      description: '超出maxlength或maxcharacter之后是否还允许输入',
      setter: { concept: 'SwitchSetter' },
    })
    allowInputOverMax: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '自动聚焦',
      description: '自动聚焦，拉起键盘',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '高度自动撑开',
      description:
        '高度自动撑开。 开启表示组件高度自动撑开，同时，依旧允许手动拖高度。如果设置了 最大行数 或者 最小行数 则不允许手动调整高度。',
      setter: { concept: 'SwitchSetter' },
    })
    autosize: nasl.core.Boolean = false;

    @Prop<ElTextareaProOptions, 'minRows'>({
      group: '主要属性',
      title: '最小行数',
      description: '最小行数，autosize 属性为 true 时有效',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        precision: 0,
      },
      if: _ => !!_.autosize,
    })
    minRows: nasl.core.Decimal;

    @Prop<ElTextareaProOptions, 'maxRows'>({
      group: '主要属性',
      title: '最大行数',
      description: '最大行数，autosize 属性为 true 时有效',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        precision: 0,
      },
      if: _ => !!_.autosize,
    })
    maxRows: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '禁用',
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
    private label: any;

    @Prop<ElTextareaProOptions, 'maxcharacter'>({
      group: '主要属性',
      title: '最多字符数',
      description: '用户最多可以输入的字符个数，一个中文汉字表示两个字符长度',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        precision: 0,
      },
      if: _ => !_.maxlength,
    })
    maxcharacter: nasl.core.Decimal;

    @Prop<ElTextareaProOptions, 'maxlength'>({
      group: '主要属性',
      title: '最大文本长度',
      description: '用户最多可以输入的字符个数',
      setter: { concept: 'InputSetter' },
      if: _ => !_.maxcharacter,
    })
    maxlength: nasl.core.Decimal | nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '名称，HTML 元素原生属性',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

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
    status: 'default' | 'success' | 'warning' | 'error';

    @Prop({
      group: '主要属性',
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
      setter: { concept: 'InputSetter' },
    })
    tips: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '文本框值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    private defaultValue: nasl.core.String | nasl.core.Decimal;

    @Event({
      title: '失去焦点时',
      description: '失去焦点时触发',
    })
    onBlur: (event: any) => any;

    @Event({
      title: '改变时',
      description: '输入内容变化时触发',
    })
    onChange: (event: any) => any;

    @Event({
      title: '获得焦点时',
      description: '获得焦点时触发',
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

    // @Slot({
    //   title: 'Label',
    //   description: '左侧文本。',
    // })
    // slotLabel: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Tips',
    //   description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    // })
    // slotTips: () => Array<ViewComponent>;
  }
}
