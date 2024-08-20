/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true
  })
  @Component({
    title: '输入框',
    icon: 'input',
    description: '',
    group: 'Form',
  })
  export class ElInputPro extends ViewComponent {
    constructor(options?: Partial<ElInputProOptions>) {
      super();
    }
  }

  export class ElInputProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Align',
      description: '文本内容位置，居左/居中/居右。可选项：left/center/right',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'left' }, { title: 'center' }, { title: 'right' }],
      },
    })
    align: 'left' | 'center' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: 'Allow Input Over Max',
      description: '超出 `maxlength` 或 `maxcharacter` 之后是否允许继续输入',
      setter: { concept: 'SwitchSetter' },
    })
    allowInputOverMax: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Auto Width',
      description: '宽度随内容自适应',
      setter: { concept: 'SwitchSetter' },
    })
    autoWidth: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Autocomplete',
      description: '是否开启自动填充功能，HTML5 原生属性，',
      setter: { concept: 'InputSetter' },
    })
    autocomplete: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Autofocus',
      description: '自动聚焦',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Borderless',
      description: '是否开启无边框模式',
      setter: { concept: 'SwitchSetter' },
    })
    borderless: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Clearable',
      description: '是否可清空',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用输入框',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Format',
      description:
        '指定输入框展示值的格式。注意 `type=number` 时请勿使用，此功能建议更为使用 `InputNumber` 组件。',
      setter: { concept: 'InputSetter' },
    })
    format: any;

    @Prop({
      group: '主要属性',
      title: 'Input Class',
      description:
        't-input 同级类名，示例："name1 name2 name3" 或 `["name1", "name2"]` 或 `[{ "name1": true }]`。',
      setter: { concept: 'InputSetter' },
    })
    inputClass: nasl.core.String | object | any[];

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
      description:
        '用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用',
      setter: { concept: 'NumberInputSetter' },
    })
    maxcharacter: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Maxlength',
      description:
        '用户最多可以输入的文本长度，一个中文等于一个计数长度。默认为空，不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用',
      setter: { concept: 'InputSetter' },
    })
    maxlength: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: '名称',
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
    readonly: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Show Clear Icon On Empty',
      description: '输入框内容为空时，悬浮状态是否显示清空按钮，默认不显示',
      setter: { concept: 'SwitchSetter' },
    })
    showClearIconOnEmpty: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Show Limit Number',
      description: '是否在输入框右侧显示字数统计',
      setter: { concept: 'SwitchSetter' },
    })
    showLimitNumber: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '输入框尺寸。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'small' },
          { title: 'medium' },
          { title: 'large。TS 类型：`SizeEnum`。[通用类型定义](https:' },
          { title: '' },
          { title: 'github.com' },
          { title: 'Tencent' },
          { title: 'tdesign-vue' },
          { title: 'blob' },
          { title: 'develop' },
          { title: 'src' },
          { title: 'common.ts)' },
        ],
      },
    })
    size:
      | 'small'
      | 'medium'
      | 'large。TS 类型：`SizeEnum`。[通用类型定义](https:'
      | ''
      | 'github.com'
      | 'Tencent'
      | 'tdesign-vue'
      | 'blob'
      | 'develop'
      | 'src'
      | 'common.ts)' = 'medium';

    @Prop({
      group: '主要属性',
      title: 'Spell Check',
      description: '是否开启拼写检查，HTML5 原生属性，',
      setter: { concept: 'SwitchSetter' },
    })
    spellCheck: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Status',
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
      title: 'Suffix',
      description: '后置图标前的后置内容。',
      setter: { concept: 'InputSetter' },
    })
    suffix: any;

    @Prop({
      group: '主要属性',
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
      setter: { concept: 'InputSetter' },
    })
    tips: any;

    @Prop({
      group: '主要属性',
      title: 'Type',
      description:
        '输入框类型。`type=number` 仅支持最基础的数字输入功能，更多功能建议使用 `InputNumber` 组件。可选项：text/number/url/tel/password/search/submit/hidden',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'text' },
          { title: 'number' },
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
      | 'number'
      | 'url'
      | 'tel'
      | 'password'
      | 'search'
      | 'submit'
      | 'hidden' = 'text';

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '输入框的值。支持语法糖 `v-model`。',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '输入框的值。非受控属性。',
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
      description:
        '输入框值发生变化时触发。参数 `trigger=initial` 表示传入的数据不符合预期，组件自动处理后触发 change 告知父组件。如：初始值长度超过 `maxlength` 限制',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Clear',
      description: '清空按钮点击时触发',
    })
    onClear: (event: any) => any;

    @Event({
      title: 'On Click',
      description: '点击组件时触发',
    })
    onClick: (event: any) => any;

    @Event({
      title: 'On Compositionend',
      description: '中文输入结束时触发',
    })
    onCompositionend: (event: any) => any;

    @Event({
      title: 'On Compositionstart',
      description: '中文输入开始时触发',
    })
    onCompositionstart: (event: any) => any;

    @Event({
      title: 'On Enter',
      description: '回车键按下时触发',
    })
    onEnter: (event: any) => any;

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

    @Event({
      title: 'On Mouseenter',
      description: '进入输入框时触发',
    })
    onMouseenter: (event: any) => any;

    @Event({
      title: 'On Mouseleave',
      description: '离开输入框时触发',
    })
    onMouseleave: (event: any) => any;

    @Event({
      title: 'On Paste',
      description: '粘贴事件，`pasteValue` 表示粘贴板的内容',
    })
    onPaste: (event: any) => any;

    @Event({
      title: 'On Validate',
      description: '字数超出限制时触发',
    })
    onValidate: (event: any) => any;

    @Event({
      title: 'On Wheel',
      description: '输入框中滚动鼠标时触发',
    })
    onWheel: (event: any) => any;

    @Slot({
      title: 'Label',
      description: '左侧文本。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: 'Prefix Icon',
      description: '组件前置图标。',
    })
    slotPrefixIcon: () => Array<ViewComponent>;

    @Slot({
      title: 'Suffix',
      description: '后置图标前的后置内容。',
    })
    slotSuffix: () => Array<ViewComponent>;

    @Slot({
      title: 'Suffix Icon',
      description: '组件后置图标。',
    })
    slotSuffixIcon: () => Array<ViewComponent>;

    @Slot({
      title: 'Tips',
      description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    })
    slotTips: () => Array<ViewComponent>;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        {
          title: 'Input Group',
          code: '<el-input-group-pro></el-input-group-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Input Group',
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
      title: 'Separate',
      description: '多个输入框之间是否需要间隔',
      setter: { concept: 'SwitchSetter' },
    })
    separate: nasl.core.Boolean;
  }
}
