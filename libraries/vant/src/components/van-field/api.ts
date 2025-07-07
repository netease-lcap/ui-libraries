/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
      forceUpdateWhenAttributeChange: true,
    },
  })
  @Component({
    title: '输入框',
    icon: 'input',
    description: '用于输入文本内容',
    group: 'Form',
  })
  export class VanField extends ViewComponent {
    constructor(options?: Partial<VanFieldOptions>) {
      super();
    }
  }

  export class VanFieldOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      sync: true,
      title: '值',
      description: '输入框的值',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '类型',
      description: '输入框类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '文本' },
          { title: '密码' },
          { title: '数字' },
          { title: '邮箱' },
          { title: '电话' },
          { title: '多行文本' },
        ],
      },
    })
    type: 'text' | 'password' | 'number' | 'email' | 'tel' | 'textarea' = 'text';

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '请输入内容';

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
      title: '最大文本长度',
      description: '用户最多可以输入的文本长度',
      setter: { concept: 'NumberInputSetter', min: 0 },
    })
    maxlength: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '输入框尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '正常' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';

    @Prop({
      group: '主要属性',
      title: '前缀图标',
      description: '组件前置图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    prefixIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '后缀图标',
      description: '组件后置图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    suffixIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '标签',
      description: '输入框标签',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '标签宽度',
      description: '标签宽度，支持 px 单位',
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '标签对齐方式',
      description: '标签对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '顶部对齐' }, { title: '右对齐' }],
      },
    })
    labelAlign: 'left' | 'top' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '是否显示标签',
      description: '是否显示标签',
      setter: { concept: 'SwitchSetter' },
    })
    showLabel: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否必填',
      description: '是否必填',
      setter: { concept: 'SwitchSetter' },
    })
    required: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '自动聚焦',
      description: '自动聚焦',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '自动完成',
      description: '自动完成',
      setter: { concept: 'SwitchSetter' },
    })
    autocomplete: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '拼写检查',
      description: '是否开启拼写检查',
      setter: { concept: 'SwitchSetter' },
    })
    spellcheck: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '多行文本行数',
      description: '多行文本的行数',
      setter: { concept: 'NumberInputSetter', min: 1 },
    })
    rows: nasl.core.Integer = 3;

    @Prop({
      group: '主要属性',
      title: '自动调整高度',
      description: '是否自动调整高度',
      setter: { concept: 'SwitchSetter' },
    })
    autosize: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '最大高度',
      description: '最大高度',
      setter: { concept: 'InputSetter' },
    })
    maxHeight: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '最小高度',
      description: '最小高度',
      setter: { concept: 'InputSetter' },
    })
    minHeight: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '输入框对齐方式',
      description: '输入框对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '居中' }, { title: '右对齐' }],
      },
    })
    inputAlign: 'left' | 'center' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '错误信息',
      description: '错误信息',
      setter: { concept: 'InputSetter' },
    })
    errorMessage: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '错误状态',
      description: '是否显示错误状态',
      setter: { concept: 'SwitchSetter' },
    })
    error: nasl.core.Boolean = false;

    @Event({
      title: '输入时',
      description: '输入框值发生变化时触发',
    })
    onInput: (event: nasl.core.String) => any;

    @Event({
      title: '改变时',
      description: '输入框值改变时触发',
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
      title: '键盘释放时',
      description: '释放键盘时触发',
    })
    onKeyup: (event: any) => any;

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
      title: '粘贴时',
      description: '粘贴事件',
    })
    onPaste: (event: any) => any;

    @Slot({
      title: '前置',
      description: '前置内容',
    })
    slotPrepend: () => Array<ViewComponent>;

    @Slot({
      title: '后置',
      description: '后置内容',
    })
    slotAppend: () => Array<ViewComponent>;

    @Slot({
      title: '标签',
      description: '自定义标签',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: '输入框',
      description: '自定义输入框',
    })
    slotInput: () => Array<ViewComponent>;

    @Slot({
      title: '按钮',
      description: '自定义按钮',
    })
    slotButton: () => Array<ViewComponent>;

  }
} 