/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '表单',
    icon: 'form',
    description: '',
    group: 'Form',
  })
  export class ElFormPro extends ViewComponent {
    constructor(options?: Partial<ElFormProOptions>) {
      super();
    }
  }

  export class ElFormProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Colon',
      description: '是否在表单标签字段右侧显示冒号',
      setter: { concept: 'SwitchSetter' },
    })
    colon: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Data',
      description: '表单数据。',
      setter: { concept: 'InputSetter' },
    })
    data: object = {};

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用整个表单',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Error Message',
      description:
        '表单错误信息配置，示例：`{ idcard: "请输入正确的身份证号码", max: "字符长度不能超过 ${max}" }`。',
      setter: { concept: 'InputSetter' },
    })
    errorMessage: object;

    @Prop({
      group: '主要属性',
      title: 'Form Controlled Components',
      description:
        '允许表单统一控制禁用状态的自定义组件名称列表。默认会有组件库的全部输入类组件：TInput、TInputNumber、TCascader、TSelect、TOption、TSwitch、TCheckbox、TCheckboxGroup、TRadio、TRadioGroup、TTreeSelect、TDatePicker、TTimePicker、TUpload、TTransfer、TSlider。对于自定义组件，组件内部需要包含可以控制表单禁用状态的变量 `formDisabled`。示例：`["CustomUpload", "CustomInput"]`。',
      setter: { concept: 'InputSetter' },
    })
    formControlledComponents: any[];

    @Prop({
      group: '主要属性',
      title: 'Label Align',
      description:
        '表单字段标签对齐方式：左对齐、右对齐、顶部对齐。可选项：left/right/top',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'left' }, { title: 'right' }, { title: 'top' }],
      },
    })
    labelAlign: 'left' | 'right' | 'top' = 'right';

    @Prop({
      group: '主要属性',
      title: 'Label Width',
      description: '可以整体设置label标签宽度，默认为100px',
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String | nasl.core.Decimal = '100px';

    @Prop({
      group: '主要属性',
      title: 'Layout',
      description:
        '表单布局，有两种方式：纵向布局 和 行内布局。可选项：vertical/inline',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'vertical' }, { title: 'inline' }],
      },
    })
    layout: 'vertical' | 'inline' = 'vertical';

    @Prop({
      group: '主要属性',
      title: 'Prevent Submit Default',
      description:
        '是否阻止表单提交默认事件（表单提交默认事件会刷新页面），设置为 `true` 可以避免刷新',
      setter: { concept: 'SwitchSetter' },
    })
    preventSubmitDefault: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Required Mark',
      description: '是否显示必填符号（*），默认显示',
      setter: { concept: 'SwitchSetter' },
    })
    requiredMark: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Reset Type',
      description:
        '重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值。可选项：empty/initial',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'empty' }, { title: 'initial' }],
      },
    })
    resetType: 'empty' | 'initial' = 'empty';

    @Prop({
      group: '主要属性',
      title: 'Rules',
      description: '表单字段校验规则。',
      setter: { concept: 'InputSetter' },
    })
    rules: object;

    @Prop({
      group: '主要属性',
      title: 'Scroll To First Error',
      description:
        '表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动。可选项：""/smooth/auto',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '""' }, { title: 'smooth' }, { title: 'auto' }],
      },
    })
    scrollToFirstError: '""' | 'smooth' | 'auto';

    @Prop({
      group: '主要属性',
      title: 'Show Error Message',
      description:
        '校验不通过时，是否显示错误提示信息，统一控制全部表单项。如果希望控制单个表单项，请给 FormItem 设置该属性',
      setter: { concept: 'SwitchSetter' },
    })
    showErrorMessage: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Status Icon',
      description:
        '校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。`statusIcon` 值类型为渲染函数，则可以自定义右侧状态图标。',
      setter: { concept: 'InputSetter' },
    })
    statusIcon: any;

    @Prop({
      group: '主要属性',
      title: 'Submit With Warning Message',
      description:
        '【讨论中】当校验结果只有告警信息时，是否触发 `submit` 提交事件',
      setter: { concept: 'SwitchSetter' },
    })
    submitWithWarningMessage: nasl.core.Boolean = false;

    @Event({
      title: 'On Reset',
      description: '表单重置时触发',
    })
    onReset: (event: any) => any;

    @Event({
      title: 'On Submit',
      description:
        '表单提交时触发。其中 `context.validateResult` 表示校验结果，`context.firstError` 表示校验不通过的第一个规则提醒。`context.validateResult` 值为 `true` 表示校验通过；如果校验不通过，`context.validateResult` 值为校验结果列表。<br />【注意】⚠️ 默认情况，输入框按下 Enter 键会自动触发提交事件，如果希望禁用这个默认行为，可以给输入框添加  enter 事件，并在事件中设置 `e.preventDefault()`。',
    })
    onSubmit: (event: any) => any;

    @Event({
      title: 'On Validate',
      description:
        '校验结束后触发，result 值为 true 表示校验通过；如果校验不通过，result 值为校验结果列表。',
    })
    onValidate: (event: any) => any;

    @Slot({
      title: 'Status Icon',
      description:
        '校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。`statusIcon` 值类型为渲染函数，则可以自定义右侧状态图标。',
    })
    slotStatusIcon: () => Array<ViewComponent>;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        { title: 'Form Item', code: '<el-form-item-pro></el-form-item-pro>' },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Form Item',
    icon: 'form-item',
    description: '',
    group: 'Form',
  })
  export class ElFormItemPro extends ViewComponent {
    constructor(options?: Partial<ElFormItemProOptions>) {
      super();
    }
  }

  export class ElFormItemProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'For',
      description: 'label 原生属性',
      setter: { concept: 'InputSetter' },
    })
    for: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Help',
      description: '表单项说明内容。',
      setter: { concept: 'InputSetter' },
    })
    help: any;

    @Prop({
      group: '主要属性',
      title: 'Label',
      description: '字段标签名称。',
      setter: { concept: 'InputSetter' },
    })
    label: any = '';

    @Prop({
      group: '主要属性',
      title: 'Label Align',
      description:
        '表单字段标签对齐方式：左对齐、右对齐、顶部对齐。默认使用 Form 的对齐方式，优先级高于 Form.labelAlign。可选项：left/right/top',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'left' }, { title: 'right' }, { title: 'top' }],
      },
    })
    labelAlign: 'left' | 'right' | 'top';

    @Prop({
      group: '主要属性',
      title: 'Label Width',
      description: '可以整体设置标签宽度，优先级高于 Form.labelWidth',
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: '表单字段名称',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Required Mark',
      description: '是否显示必填符号（*），优先级高于 Form.requiredMark',
      setter: { concept: 'SwitchSetter' },
    })
    requiredMark: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Rules',
      description: '表单字段校验规则。',
      setter: { concept: 'InputSetter' },
    })
    rules: any[];

    @Prop({
      group: '主要属性',
      title: 'Show Error Message',
      description:
        '校验不通过时，是否显示错误提示信息，优先级高于 `Form.showErrorMessage`',
      setter: { concept: 'SwitchSetter' },
    })
    showErrorMessage: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Status',
      description: '校验状态，可在需要完全自主控制校验状态时使用。',
      setter: { concept: 'InputSetter' },
    })
    status: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Status Icon',
      description:
        '校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。`statusIcon` 值类型为渲染函数，则可以自定义右侧状态图标。优先级高级 Form 的 statusIcon。',
      setter: { concept: 'InputSetter' },
    })
    statusIcon: any;

    @Prop({
      group: '主要属性',
      title: 'Success Border',
      description: '是否显示校验成功的边框，默认不显示',
      setter: { concept: 'SwitchSetter' },
    })
    successBorder: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Tips',
      description:
        '自定义提示内容，样式跟随 `status` 变动，可在需要完全自主控制校验规则时使用。',
      setter: { concept: 'InputSetter' },
    })
    tips: any;

    @Slot({
      title: 'Help',
      description: '表单项说明内容。',
    })
    slotHelp: () => Array<ViewComponent>;

    @Slot({
      title: 'Label',
      description: '字段标签名称。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: 'Status Icon',
      description:
        '校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。`statusIcon` 值类型为渲染函数，则可以自定义右侧状态图标。优先级高级 Form 的 statusIcon。',
    })
    slotStatusIcon: () => Array<ViewComponent>;

    @Slot({
      title: 'Tips',
      description:
        '自定义提示内容，样式跟随 `status` 变动，可在需要完全自主控制校验规则时使用。',
    })
    slotTips: () => Array<ViewComponent>;
  }
}
