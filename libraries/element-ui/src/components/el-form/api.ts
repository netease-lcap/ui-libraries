/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '表单',
    icon: 'form',
    description:
      '由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据',
    group: 'Form',
  })
  export class ElForm extends ViewComponent {
    constructor(options?: Partial<ElFormOptions>) {
      super();
    }

    @Method({
      title: 'Validate',
      description:
        '对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise',
    })
    validate(): any {}

    @Method({
      title: 'Validate Field',
      description: '对部分表单字段进行校验的方法',
    })
    validateField(): any {}

    @Method({
      title: 'Reset Fields',
      description: '对整个表单进行重置，将所有字段值重置为初始值并移除校验结果',
    })
    resetFields(): any {}

    @Method({
      title: 'Clear Validate',
      description:
        '移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果',
    })
    clearValidate(): any {}
  }

  export class ElFormOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Model',
      description: '表单数据对象',
      setter: { concept: 'InputSetter' },
    })
    model: object;

    @Prop({
      group: '主要属性',
      title: 'Rules',
      description: '表单验证规则',
      setter: { concept: 'InputSetter' },
    })
    rules: object;

    @Prop({
      group: '主要属性',
      title: 'Inline',
      description: '行内表单模式',
      setter: { concept: 'SwitchSetter' },
    })
    inline: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Label Position',
      description:
        '表单域标签的位置，如果值为 left 或者 right 时，则需要设置 `label-width`',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'right' }, { title: 'left' }, { title: 'top' }],
      },
    })
    labelPosition: 'right' | 'left' | 'top' = 'right';

    @Prop({
      group: '主要属性',
      title: 'Label Width',
      description:
        "表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 `auto`。",
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Label Suffix',
      description: '表单域标签的后缀',
      setter: { concept: 'InputSetter' },
    })
    labelSuffix: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Hide Required Asterisk',
      description: '是否隐藏必填字段的标签旁边的红色星号',
      setter: { concept: 'SwitchSetter' },
    })
    hideRequiredAsterisk: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Show Message',
      description: '是否显示校验错误信息',
      setter: { concept: 'SwitchSetter' },
    })
    showMessage: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Inline Message',
      description: '是否以行内形式展示校验信息',
      setter: { concept: 'SwitchSetter' },
    })
    inlineMessage: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Status Icon',
      description: '是否在输入框中显示校验结果反馈图标',
      setter: { concept: 'SwitchSetter' },
    })
    statusIcon: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Validate On Rule Change',
      description: '是否在 `rules` 属性改变后立即触发一次验证',
      setter: { concept: 'SwitchSetter' },
    })
    validateOnRuleChange: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '用于控制该表单内组件的尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'medium' }, { title: 'small' }, { title: 'mini' }],
      },
    })
    size: 'medium' | 'small' | 'mini';

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description:
        '是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Event({
      title: 'On Validate',
      description: '任一表单项被校验后触发',
    })
    onValidate: (event: any) => any;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [{ title: 'Form Item', code: '<el-form-item></el-form-item>' }],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Form Item',
    icon: 'form-item',
    description: '',
    group: 'Form',
  })
  export class ElFormItem extends ViewComponent {
    constructor(options?: Partial<ElFormItemOptions>) {
      super();
    }

    @Method({
      title: 'Reset Field',
      description: '对该表单项进行重置，将其值重置为初始值并移除校验结果',
    })
    resetField(): any {}

    @Method({
      title: 'Clear Validate',
      description: '移除该表单项的校验结果',
    })
    clearValidate(): any {}
  }

  export class ElFormItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Prop',
      description:
        '表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的',
      setter: { concept: 'InputSetter' },
    })
    prop: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '标签文本',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Label Width',
      description: "表单域标签的的宽度，例如 '50px'。支持 `auto`。",
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Required',
      description: '是否必填，如不设置，则会根据校验规则自动生成',
      setter: { concept: 'SwitchSetter' },
    })
    required: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Rules',
      description: '表单验证规则',
      setter: { concept: 'InputSetter' },
    })
    rules: object;

    @Prop({
      group: '主要属性',
      title: 'Error',
      description:
        '表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息',
      setter: { concept: 'InputSetter' },
    })
    error: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Show Message',
      description: '是否显示校验错误信息',
      setter: { concept: 'SwitchSetter' },
    })
    showMessage: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Inline Message',
      description: '以行内形式展示校验信息',
      setter: { concept: 'SwitchSetter' },
    })
    inlineMessage: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '用于控制该表单域下组件的尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'medium' }, { title: 'small' }, { title: 'mini' }, { title: '默认'}],
      },
    })
    size: 'medium' | 'small' | 'mini' | '' = '';

    @Slot({
      title: 'Default',
      description: 'Form Item 的内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'Label',
      description: '标签文本的内容',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: 'Error',
      description: '自定义表单校验信息的显示方式，参数为 { error }',
    })
    slotError: (current: Current<any>) => Array<ViewComponent>;
  }
}
