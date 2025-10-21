/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      additionalAttribute: {
        autofocus: '"false"',
      },
      // selector: {
      //   expression: 'this',
      //   cssSelector: '.el-input',
      // },
      forceUpdateWhenAttributeChange: 'preview',
    },
  })
  @Component({
    title: '输入框',
    icon: 'input',
    description: '',
    group: 'Form',
  })
  export class ElInput extends ViewComponent {
    constructor(options?: Partial<ElInputOptions>) {
      super();
    }
  }

  export class ElInputOptions extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      sync: true,
      title: '输入值',
      description: '输入框的当前值，支持双向绑定',
      docDescription: '绑定输入框的当前值。当用户输入时，此值会自动更新。也可以程序化地设置此值来更新输入框内容。',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '默认值',
      description: '输入框的初始默认值',
      docDescription: '设置输入框的初始默认值。此属性为非受控属性，仅在组件初始化时生效。',
      setter: { concept: 'InputSetter' },
    })
    private defaultValue: nasl.core.String | nasl.core.Decimal;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '输入类型',
      description: '选择输入框的类型和用途',
      docDescription: '控制输入框的类型和用途。文本：普通文本输入；链接：URL输入；电话：电话号码输入；密码：密码输入；搜索：搜索框；多行文本：文本域。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '文本' },
          { title: '链接' },
          { title: '电话' },
          { title: '密码' },
          { title: '搜索' },
          { title: '多行文本' },
        ],
      },
      onChange: [
        {
          clear: ['showWordLimit'],
        },
      ],
    })
    type: 'text' | 'url' | 'tel' | 'password' | 'search' | 'textarea' = 'text';

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '输入框为空时显示的提示文本',
      docDescription: '设置输入框为空时显示的占位符文本，用于提示用户应该输入什么内容。',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '前缀图标',
      description: '输入框左侧显示的图标',
      docDescription: '设置输入框左侧显示的图标，用于增强视觉识别或表示输入内容类型。支持从图标库中选择或使用自定义图标。',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    prefixIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '后缀图标',
      description: '输入框右侧显示的图标',
      docDescription: '设置输入框右侧显示的图标，通常用于表示操作或状态。支持从图标库中选择或使用自定义图标。',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    suffixIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示前缀',
      description: '是否显示输入框前缀内容',
      docDescription: '开启后，输入框左侧会显示前缀内容区域，可以通过插槽自定义前缀内容。',
      setter: { concept: 'SwitchSetter' },
    })
    showPrepend: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示后缀',
      description: '是否显示输入框后缀内容',
      docDescription: '开启后，输入框右侧会显示后缀内容区域，可以通过插槽自定义后缀内容。',
      setter: { concept: 'SwitchSetter' },
    })
    showAppend: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '组件尺寸',
      description: '选择输入框的尺寸大小',
      docDescription: '控制输入框的整体尺寸。小：紧凑型输入框；中等：标准尺寸；大：宽松型输入框。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中等' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';

    @Prop({
      group: '主要属性',
      title: '最大长度',
      description: '设置输入文本的最大长度限制',
      docDescription: '设置用户最多可以输入的文本长度，一个中文等于一个计数长度。默认为空时不限制输入长度。',
      setter: { concept: 'NumberInputSetter', min: 0 },
    })
    maxlength: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '字数统计',
      description: '是否显示字数统计信息',
      docDescription: '开启后，在多行文本模式下会显示当前字数/最大字数的统计信息。仅在设置了最大长度时有效。',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.type === 'textarea' && _.maxlength,
    })
    showWordLimit: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '格式化函数',
      description: '自定义输入值的显示格式',
      docDescription: '设置一个函数来自定义输入值的显示格式。注意：当type为number时请勿使用，建议使用InputNumber组件。',
      setter: {
        concept: 'AnonymousFunctionSetter',
      },
    })
    private format: (value: nasl.core.String) => any;

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    @Prop({
      group: '交互属性',
      title: '可清空',
      description: '是否允许清空输入内容',
      docDescription: '开启后，当输入框有内容时会显示清空按钮，用户可以点击清空所有输入内容。',
      setter: { concept: 'SwitchSetter' },
    })
    clearable: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '自动聚焦',
      description: '页面加载时是否自动获得焦点',
      docDescription: '开启后，当页面加载完成时，输入框会自动获得焦点，方便用户直接输入。',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '拼写检查',
      description: '是否开启浏览器拼写检查',
      docDescription: '开启后，浏览器会对输入内容进行拼写检查，错误拼写会显示红色波浪线。这是HTML5原生属性。',
      setter: { concept: 'SwitchSetter' },
    })
    private spellCheck: nasl.core.Boolean = false;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用输入框',
      docDescription: '开启后，输入框将变为禁用状态，用户无法进行任何操作。禁用状态下输入框会显示为灰色。',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '只读状态',
      description: '是否设置为只读状态',
      docDescription: '开启后，输入框变为只读状态，用户无法修改内容但可以选择和复制文本。只读状态下输入框背景为灰色。',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '预览模式',
      description: '是否启用预览模式',
      docDescription: '开启后，输入框会以预览模式显示，通常用于只读展示场景。',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    @Event({
      title: '改变时',
      description:
        '输入框值发生变化时触发。参数 `trigger=initial` 表示传入的数据不符合预期，组件自动处理后触发 change 告知父组件。如：初始值长度超过 `maxlength` 限制',
    })
    onInput: (event: nasl.core.String) => any;

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
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '鼠标移出时',
      description: '离开输入框时触发',
    })
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '粘贴时',
      description: '粘贴事件，`pasteValue` 表示粘贴板的内容',
    })
    onPaste: (event: any) => any;

    // @Event({
    //   title: '字数超出限制时',
    //   description: '字数超出限制时触发',
    // })
    // onValidate: (event: any) => any;

    // @Event({
    //   title: '滚动鼠标时',
    //   description: '输入框中滚动鼠标时触发',
    // })
    // onWheel: (event: any) => any;

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

    @Slot({
      title: '前置',
      description: '前置',
    })
    slotPrepend: () => Array<ViewComponent>;

    @Slot({
      title: '后置',
      description: '后置',
    })
    slotAppend: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      bindStyleSelector: '.__cw-form-compose-input',
      ignoreProperty: ['rules'],
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
      forceRefresh: true,
      forceUpdateWhenAttributeChange: true,
      namedSlotOmitWrapper: ['label'],
    },
    extends: [
      {
        name: 'ElFormItemPro',
      },
      {
        name: 'ElInput',
      },
    ],
  })
  @Component({
    title: '表单输入框',
    description: '表单输入框',
    group: 'Form',
  })
  export class ElFormInput extends ViewComponent {
    constructor(
      options?: Partial<ElFormInputOptions & ElFormItemProOptions & Omit<ElInputOptions, keyof ElFormItemProOptions>>,
    ) {
      super();
    }
  }

  export class ElFormInputOptions extends ViewComponentOptions {}
}
