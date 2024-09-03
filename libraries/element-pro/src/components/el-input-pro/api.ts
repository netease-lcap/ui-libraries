/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '单行输入',
    icon: 'input',
    description: '',
    group: 'Form',
  })
  export class ElInputPro extends ViewComponent {
    constructor(options?: Partial<ElInputProOptions>) {
      super();
    }

    @Prop({
      title: '值',
    })
    value: nasl.core.String;
  }

  export class ElInputProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '值',
      description: '输入框的值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '类型',
      description:
        '输入框类型。可选项：text/url/tel/password/search/submit/hidden',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'text' },
          { title: 'url' },
          { title: 'tel' },
          { title: 'password' },
          { title: 'search' },
          { title: 'submit' },
          { title: 'hidden' },
        ],
      },
    })
    type:
      | 'text'
      | 'url'
      | 'tel'
      | 'password'
      | 'search'
      | 'submit'
      | 'hidden' = 'text';

    @Prop({
      group: '主要属性',
      title: '对齐',
      description: '文本内容位置，居左/居中/居右。可选项：left/center/right',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '居左' }, { title: '居中' }, { title: '居右' }],
      },
    })
    align: 'left' | 'center' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '允许输入超出最大长度',
      description: '超出 `maxlength` 或 `maxcharacter` 之后是否允许继续输入',
      setter: { concept: 'SwitchSetter' },
    })
    allowInputOverMax: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '宽度自适应',
      description: '宽度随内容自适应',
      setter: { concept: 'SwitchSetter' },
    })
    autoWidth: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '自动填充',
      description: '是否开启自动填充功能，HTML5 原生属性，',
      setter: { concept: 'InputSetter' },
    })
    autocomplete: nasl.core.String;

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
      title: '可清空',
      description: '是否可清空',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用输入框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '格式化',
      description:
        '指定输入框展示值的格式。注意 `type=number` 时请勿使用，此功能建议更为使用 `InputNumber` 组件。',
      setter: {
        concept: 'AnonymousFunctionSetter',
      },
    })
    format: (value: nasl.core.String) => any;

    @Prop({
      group: '主要属性',
      title: 'css类名',
      description:
        't-input 同级类名，示例："name1 name2 name3" 或 `["name1", "name2"]` 或 `[{ "name1": true }]`。',
      setter: { concept: 'InputSetter' },
    })
    inputClass: any;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '左侧文本。',
      setter: { concept: 'InputSetter' },
    })
    private label: any; // 用插槽代替

    @Prop<ElInputProOptions, 'maxcharacter'>({
      group: '主要属性',
      title: '最多字符数',
      description:
        '用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        precision: 0,
      },
      if: _ => !_.maxlength
    })
    maxcharacter: nasl.core.Decimal;

    @Prop<ElInputProOptions, 'maxlength'>({
      group: '主要属性',
      title: '最大文本长度',
      description:
        '用户最多可以输入的文本长度，一个中文等于一个计数长度。默认为空，不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用',
      setter: { concept: 'InputSetter' },
      if: _ => !_.maxcharacter
    })
    maxlength: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '名称',
      description: '名称',
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
    readonly: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '空态展示清空按钮',
      description: '输入框内容为空时，悬浮状态是否显示清空按钮，默认不显示',
      setter: { concept: 'SwitchSetter' },
    })
    showClearIconOnEmpty: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示字数统计',
      description: '是否在输入框右侧显示字数统计',
      setter: { concept: 'SwitchSetter' },
    })
    showLimitNumber: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '输入框尺寸。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '小' },
          { title: '中等' },
          { title: '大' },
        ],
      },
    })
    size: 'small' | 'medium' | 'large' = 'medium';

    @Prop({
      group: '主要属性',
      title: '拼写检查',
      description: '是否开启拼写检查，HTML5 原生属性，',
      setter: { concept: 'SwitchSetter' },
    })
    spellCheck: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '状态',
      description:
        '输入框状态。默认情况会由组件内部根据实际情况呈现，如果文本过长引起的状态变化。可选项：default/success/warning/error',
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
      title: '前缀图标',
      description: '组件前置图标。',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    prefixIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '后缀内容',
      description: '后置图标前的后置内容。',
      setter: { concept: 'InputSetter' },
    })
    suffix: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '后缀图标',
      description: '组件后置图标。',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    suffixIcon: nasl.core.String;

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
      description: '输入框的值。非受控属性。',
      setter: { concept: 'InputSetter' },
    })
    private defaultValue: nasl.core.String | nasl.core.Decimal;

    @Event({
      title: '改变时',
      description:
        '输入框值发生变化时触发。参数 `trigger=initial` 表示传入的数据不符合预期，组件自动处理后触发 change 告知父组件。如：初始值长度超过 `maxlength` 限制',
    })
    onChange: (event: nasl.core.String) => any;

    @Event({
      title: '清空按钮点击时',
      description: '清空按钮点击时触发',
    })
    onClear: (event: any) => any;

    @Event({
      title: '点击时',
      description: '点击组件时触发',
    })
    onClick: (event: any) => any;

    @Event({
      title: '中文输入结束时',
      description: '中文输入结束时触发',
    })
    onCompositionend: (event: any) => any;

    @Event({
      title: '中文输入开始时',
      description: '中文输入开始时触发',
    })
    onCompositionstart: (event: any) => any;

    @Event({
      title: '回车键按下时',
      description: '回车键按下时触发',
    })
    onEnter: (event: any) => any;

    @Event({
      title: '获得焦点时',
      description: '获得焦点时触发',
    })
    onFocus: (event: any) => any;

    @Event({
      title: '失去焦点时',
      description: '失去焦点时触发',
    })
    onBlur: (event: any) => any;

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
      title: '键盘释放时',
      description: '释放键盘时触发',
    })
    onKeyup: (event: any) => any;

    @Event({
      title: '鼠标移入时',
      description: '进入输入框时触发',
    })
    onMouseenter: (event: any) => any;

    @Event({
      title: '鼠标移出时',
      description: '离开输入框时触发',
    })
    onMouseleave: (event: any) => any;

    @Event({
      title: '粘贴时',
      description: '粘贴事件，`pasteValue` 表示粘贴板的内容',
    })
    onPaste: (event: any) => any;

    @Event({
      title: '字数超出限制时',
      description: '字数超出限制时触发',
    })
    onValidate: (event: any) => any;

    @Event({
      title: '滚动鼠标时',
      description: '输入框中滚动鼠标时触发',
    })
    onWheel: (event: any) => any;

    // @Slot({
    //   title: '左侧文本',
    //   description: '左侧文本。',
    // })
    // slotLabel: () => Array<ViewComponent>;

    // @Slot({
    //   title: '前缀图标',
    //   description: '组件前置图标。',
    // })
    // slotPrefixIcon: () => Array<ViewComponent>;

    // @Slot({
    //   title: '后置图标前的后置内容',
    //   description: '后置图标前的后置内容。',
    // })
    // slotSuffix: () => Array<ViewComponent>;

    // @Slot({
    //   title: '后置图标',
    //   description: '组件后置图标。',
    // })
    // slotSuffixIcon: () => Array<ViewComponent>;

    // @Slot({
    //   title: '提示文本',
    //   description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    // })
    // slotTips: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Default',
    //   description: '内容',
    //   snippets: [
    //     {
    //       title: 'Input Group',
    //       code: '<el-input-group-pro></el-input-group-pro>',
    //     },
    //   ],
    // })
    // slotDefault: () => Array<ViewComponent>;
  }


  @IDEExtraInfo({
    show: false,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '输入框组',
    icon: 'input-group',
    description: '',
    group: 'Form',
  })
  export class ElInputGroupPro extends ViewComponent {
    constructor(options?: Partial<ElInputGroupProOptions>) {
      super();
    }
  }

  export class ElInputGroupProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '需要间隔',
      description: '多个输入框之间是否需要间隔',
      setter: { concept: 'SwitchSetter' },
    })
    separate: nasl.core.Boolean;
  }
}
