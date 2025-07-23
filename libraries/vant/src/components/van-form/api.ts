/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      structured: true,
    },
  })
  @Component({
    title: '表单',
    icon: 'form',
    description: '用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。',
    group: 'Form',
  })
  export class VanForm extends ViewComponent {
    @Method({
      title: '重置表单',
      description: '重置表单至初始状态',
    })
    resetForm(): void {}

    @Method({
      title: '校验表单',
      description: '校验整个表单',
    })
    validate(): {
      valid: nasl.core.Boolean;
    } {
      return {} as any;
    }

    @Method({
      title: '提交表单',
      description: '提交表单数据',
    })
    submit(): void {}

    constructor(options?: Partial<VanFormOptions>) {
      super();
    }
  }

  export class VanFormOptions extends ViewComponentOptions {
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用整个表单',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '只读',
      description: '是否为只读状态',
      setter: { concept: 'SwitchSetter' },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '标签位置',
      description: '表单项标签的位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左侧' }, { title: '顶部' }],
      },
    })
    labelPosition: 'left' | 'top' = 'left';

    @Prop({
      group: '主要属性',
      title: '标签宽度',
      description: '表单项标签宽度，支持传入数字或者字符串',
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '标签对齐方式',
      description: '表单项标签对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '右对齐' }],
      },
    })
    labelAlign: 'left' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '星号位置',
      description: '必填星号的位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左侧' }, { title: '右侧' }],
      },
    })
    starPosition: 'left' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '显示冒号',
      description: '是否在 label 后面添加冒号',
      setter: { concept: 'SwitchSetter' },
    })
    colon: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '校验触发时机',
      description: '表单校验触发时机',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '输入时' }, { title: '失焦时' }, { title: '提交时' }],
      },
    })
    validateTrigger: 'onChange' | 'onBlur' | 'onSubmit' = 'onBlur';

    @Prop({
      group: '主要属性',
      title: '首个错误滚动',
      description: '是否在某一项校验不通过时停止剩下的校验，并滚动到该表单项',
      setter: { concept: 'SwitchSetter' },
    })
    scrollToError: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示错误信息',
      description: '是否显示错误提示',
      setter: { concept: 'SwitchSetter' },
    })
    showError: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示错误图标',
      description: '是否在校验不通过时在输入框右侧显示错误图标',
      setter: { concept: 'SwitchSetter' },
    })
    showErrorMessage: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '错误信息对齐方式',
      description: '错误提示文案对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '居中' }, { title: '右对齐' }],
      },
    })
    errorMessageAlign: 'left' | 'center' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '输入框尺寸',
      description: '输入框尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '正常' }, { title: '大' }],
      },
    })
    inputAlign: 'left' | 'center' | 'right' = 'left';

    @Event({
      title: '提交时',
      description: '提交表单且数据验证成功后触发',
    })
    onSubmit: (event: { values: any }) => any;

    @Event({
      title: '提交失败时',
      description: '提交表单且数据验证失败后触发',
    })
    onFailed: (event: { errorFields: any; values: any }) => any;

    @Slot({
      title: '表单内容',
      description: '表单项内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      structured: false,
      forceUpdateWhenAttributeChange: true,
      forceRefresh: true,
    },
  })
  @Component({
    title: '表单项',
    description: '表单项，用于数据录入、校验、布局等',
  })
  export class VanFormItem extends ViewComponent {
    constructor(options?: Partial<VanFormItemOptions>) {
      super();
    }
  }

  export class VanFormItemOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '字段名',
      description: '表单字段名，提交表单和重置表单时的标识',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '标签文本',
      description: '表单项标签',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '标签宽度',
      description: '表单项标签宽度，优先级高于 Form 组件的 labelWidth',
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '标签对齐方式',
      description: '表单项标签对齐方式，优先级高于 Form 组件的 labelAlign',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '右对齐' }],
      },
    })
    labelAlign: 'left' | 'right';

    @Prop({
      group: '主要属性',
      title: '显示冒号',
      description: '是否在 label 后面添加冒号',
      setter: { concept: 'SwitchSetter' },
    })
    colon: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '必填',
      description: '是否显示表单项必填星号',
      setter: { concept: 'SwitchSetter' },
    })
    required: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '星号位置',
      description: '必填星号的位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左侧' }, { title: '右侧' }],
      },
    })
    starPosition: 'left' | 'right';

    @Prop({
      group: '主要属性',
      title: '校验规则',
      description: '表单校验规则，支持传入数组',
      setter: { concept: 'InputSetter' },
      bindHide: true,
    })
    rules: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '校验触发时机',
      description: '表单校验触发时机，优先级高于 Form 组件',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '输入时' }, { title: '失焦时' }, { title: '提交时' }],
      },
    })
    validateTrigger: 'onChange' | 'onBlur' | 'onSubmit';

    @Prop({
      group: '主要属性',
      title: '显示错误信息',
      description: '是否显示错误提示',
      setter: { concept: 'SwitchSetter' },
    })
    showError: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '错误信息对齐方式',
      description: '错误提示文案对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '居中' }, { title: '右对齐' }],
      },
    })
    errorMessageAlign: 'left' | 'center' | 'right';

    @Prop({
      group: '主要属性',
      title: '介绍文本',
      description: '表单项介绍文本，显示在表单项下方',
      setter: { concept: 'InputSetter' },
    })
    intro: nasl.core.String;

    @Slot({
      title: '标签',
      description: '自定义表单项标签',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: '表单项内容',
      description: '表单项内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '标签右侧',
      description: '标签右侧额外内容',
    })
    slotButton: () => Array<ViewComponent>;
  }
} 