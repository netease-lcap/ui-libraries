/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      translateBindingProperty: ['modelValue'],
      displaySlotInline: {
        label: true,
      },
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
    modelValue: nasl.core.String | nasl.core.Integer | nasl.core.Decimal;

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
      title: '开启点击反馈',
      description: '是否开启点击反馈',
      setter: { concept: 'SwitchSetter' },
    })
    clickable: nasl.core.Boolean = false;

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
      title: '冒号',
      description: '是否显示冒号',
      setter: { concept: 'SwitchSetter' },
    })
    colon: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '输入框尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '正常' }, { title: '大' }],
      },
    })
    size: 'default' | 'large' = 'default';

    @Prop({
      group: '主要属性',
      title: '前缀图标',
      description: '组件前置图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    leftIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '后缀图标',
      description: '组件后置图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    rightIcon: nasl.core.String;

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
      title: '自动聚焦',
      description: '是否自动聚焦，iOS 系统不支持该属性',
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
      if: (_) => _.type === 'textarea',
    })
    rows: nasl.core.Integer = 3;

    @Prop({
      group: '主要属性',
      title: '自动调整高度',
      description: '是否自动调整高度',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.type === 'textarea',
    })
    autosize: nasl.core.Boolean = false;


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
      title: '错误状态',
      description: '是否将输入内容标红',
      setter: { concept: 'SwitchSetter' },
    })
    error: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '格式化函数',
      description: '自定义格式化函数',
      setter: { concept: 'AnonymousFunctionSetter' },
    })
    formatter: (
      value: nasl.core.String | nasl.core.Integer | nasl.core.Decimal,
    ) => nasl.core.String | nasl.core.Integer | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '格式化触发时机',
      description: '格式化触发时机',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '输入时' }, { title: '失焦时' }] },
    })
    formatTrigger: 'onChange' | 'onBlur' = 'onChange';

    @Prop({
      group: '主要属性',
      title: '显示字数统计',
      description: '是否显示字数统计',
      if: (_) => _.maxlength && _.maxlength > 0,
      setter: { concept: 'SwitchSetter' },
    })
    showWordLimit: nasl.core.Boolean = false;

    @Event({
      title: '输入时',
      description: '输入框值发生变化时触发',
    })
    onInput: (value: nasl.core.String | nasl.core.Decimal) => void;

    @Event({
      title: '值改变时',
      description: '值改变时触发',
    })
    onChange: (value: nasl.core.String | nasl.core.Decimal) => void;

    @Event({
      title: '清空按钮点击时',
      description: '清空按钮点击时触发',
    })
    onClear: (event: any) => any;

    @Event({
      title: '点击时',
      description: '点击组件时触发',
    })
    onClick: (event: MouseEvent) => void;

    @Event({
      title: '点击输入区',
      description: '点击输入区域时触发',
    })
    onClickInput: (event: MouseEvent) => void;

    @Event({
      title: '获得焦点时',
      description: '获得焦点时触发',
    })
    onFocus: (event: Event) => void;

    @Event({
      title: '失去焦点时',
      description: '失去焦点时触发',
    })
    onBlur: (event: Event) => void;

    @Slot({
      title: '标签',
      description: '自定义标签',
    })
    slotLabel: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      forceUpdateWhenAttributeChange: true,
      displaySlotInline: {
        label: true,
      },
    },
    extends: [
      {
        name: 'VanFormItem',
      },
      {
        name: 'VanField',
      },
    ],
  })
  @Component({
    title: '表单输入框',
    icon: 'input',
    description: '用于表单输入文本内容',
    group: 'Form',
  })
  export class VanFormField extends ViewComponent {
    constructor(
      options?: Partial<VanFormFieldOptions & VanFormItemOptions & Omit<VanFieldOptions, keyof VanFormItemOptions>>,
    ) {
      super();
    }
  }

  export class VanFormFieldOptions extends ViewComponentOptions {}
}
