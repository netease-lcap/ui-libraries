/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "['el-form-item-pro'].includes(target.tag)",
    },
  })
  @Component({
    title: '表单',
    icon: 'form',
    description:
      '用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。',
    group: 'Form',
  })
  export class ElFormPro extends ViewComponent {
    @Method({
      title: '清空校验结果',
      description:
        "可使用 fields 指定清除部分字段的校验结果，fields 值为空则表示清除所有字段校验结果。清除邮箱校验结果示例：clearValidate(['email'])",
    })
    clearValidate(
      @Param({
        title: '字段列表',
      })
      fields: nasl.collection.List<nasl.core.String> = null,
    ): void {}

    @Method({
      title: '重置表单',
      description:
        "表单里面没有重置按钮<button type=\"reset\" />时可以使用该方法，默认重置全部字段为空，该方法会触发 reset 事件。如果表单属性 resetType='empty' 或者 reset.type='empty' 会重置为空；如果表单属性 resetType='initial' 或者 reset.type='initial' 会重置为表单初始值。",
    })
    reset(
      @Param({
        title: '设置具体重置哪些字段',
      })
      params: {
        type: 'initial' | 'empty';
        fields: nasl.collection.List<nasl.core.String>;
      } = null,
    ): void {}

    @Method({
      title: '提交表单',
      description:
        '表单里面没有提交按钮<button type="submit" />时可以使用该方法。showErrorMessage 表示是否在提交校验不通过时显示校验不通过的原因，默认显示。该方法会触发 submit 事件',
    })
    submit(
      @Param({
        title: '提交表单选项',
      })
      params: {
        showErrorMessage: nasl.core.Boolean;
      } = null,
    ): void {}

    @Method({
      title: '校验函数',
      description: '校验函数，包含错误文本提示等功能',
    })
    validate(
      @Param({
        title: '校验选项',
      })
      params: {
        fields: nasl.collection.List<nasl.core.String>;
        showErrorMessage: nasl.core.Boolean;
        trigger: 'blur' | 'change' | 'submit' | 'all';
      },
    ): {
      valid: nasl.core.Boolean;
    } {
      return {} as any;
    }

    constructor(options?: Partial<ElFormProOptions>) {
      super();
    }
  }

  export class ElFormProOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '表单数据',
      description: '绑定表单数据，表单项可通过字段名获取值',
      setter: {
        concept: 'InputSetter',
      },
    })
    data: object = {};

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用整个表单',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Error Message',
    //   description:
    //     '表单错误信息配置，示例：`{ idcard: "请输入正确的身份证号码", max: "字符长度不能超过 ${max}" }`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // errorMessage: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Form Controlled Components',
    //   description:
    //     '允许表单统一控制禁用状态的自定义组件名称列表。默认会有组件库的全部输入类组件：ElInput、ElInputNumber、ElCascader、ElSelect、ElOption、ElSwitch、TCheckbox、ElCheckboxGroup、ElRadio、ElRadioGroup、ElTreeSelect、ElDatePicker、ElTimePicker、ElUpload、ElTransfer、ElSlider。对于自定义组件，组件内部需要包含可以控制表单禁用状态的变量 `formDisabled`。示例：`["CustomUpload", "CustomInput"]`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // formControlledComponents: any[];
    @Prop({
      group: '主要属性',
      title: '表单布局',
      description:
        '表单布局，有两种方式：纵向布局 和 行内布局。可选项：vertical/inline',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '纵向布局' }, { title: '行内布局' }],
      },
    })
    layout: 'vertical' | 'inline' = 'vertical';

    @Prop({
      group: '主要属性',
      title: '标签布局',
      description: '表单字段标签对齐方式：左对齐、右对齐、顶部对齐',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '左对齐' },
          { title: '右对齐' },
          { title: '顶部对齐' },
        ],
      },
    })
    labelAlign: 'left' | 'right' | 'top' = 'right';

    @Prop({
      group: '主要属性',
      title: '标签宽度',
      description: '可以整体设置label标签宽度，默认为100px',
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String | nasl.core.Decimal = '100px';

    @Prop({
      group: '主要属性',
      title: '必填标记',
      description: '是否显示必填符号（*），默认显示',
      setter: { concept: 'SwitchSetter' },
    })
    requiredMark: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '冒号',
      description: '是否在表单标签字段右侧显示冒号',
      setter: { concept: 'SwitchSetter' },
    })
    colon: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '阻止表单默认提交',
      description:
        '是否阻止表单提交默认事件（表单提交默认事件会刷新页面），设置为 `true` 可以避免刷新',
      setter: { concept: 'SwitchSetter' },
    })
    preventSubmitDefault: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '重置表单的方式',
      description:
        '重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值。可选项：empty/initial',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '重置表单为空' }, { title: '重置表单数据为初始值' }],
      },
    })
    resetType: 'empty' | 'initial' = 'empty';

    @Prop({
      group: '主要属性',
      title: '自动滚动到校验不通过的字段',
      description:
        '表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '不滚动' },
          { title: '平滑滚动' },
          { title: '瞬间直达' },
        ],
      },
    })
    scrollToFirstError: '' | 'smooth' | 'auto' = '';

    @Prop({
      group: '主要属性',
      title: '显示错误提示',
      description:
        '校验不通过时，是否显示错误提示信息，统一控制全部表单项。如果希望控制单个表单项，请给表单项设置该属性',
      setter: { concept: 'SwitchSetter' },
    })
    showErrorMessage: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示状态图标',
      description:
        '校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。',
      setter: { concept: 'SwitchSetter' },
    })
    statusIcon: nasl.core.Boolean = false;

    @Event({
      title: '重置时',
      description: '表单重置时触发',
    })
    onReset: (event: {}) => any;

    @Event({
      title: '提交时',
      description:
        '表单提交时触发。其中 `context.validateResult` 表示校验结果，`context.firstError` 表示校验不通过的第一个规则提醒。`context.validateResult` 值为 `true` 表示校验通过；如果校验不通过，`context.validateResult` 值为校验结果列表。<br />【注意】⚠️ 默认情况，输入框按下 Enter 键会自动触发提交事件，如果希望禁用这个默认行为，可以给输入框添加  enter 事件，并在事件中设置 `e.preventDefault()`。',
    })
    onSubmit: (event: {
      valid: nasl.core.Boolean;
      firstError: nasl.core.String;
    }) => any;

    @Event({
      title: '校验结束后',
      description: '校验结束后触发',
    })
    onValidate: (event: {
      valid: nasl.core.Boolean;
      firstError: nasl.core.String;
    }) => any;

    @Slot({
      title: '表单内容',
      description: '插入表单项',
      snippets: [
        {
          title: '表单项',
          code: '<el-form-item-pro><template #label><el-text text="表单项"></el-text></template></el-form-item-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag.endsWith('el-form-pro')",
      ignoreProperty: ['rules'],
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
    },
  })
  @Component({
    title: '表单项',
    description: '表单项',
  })
  export class ElFormItemPro extends ViewComponent {
    constructor(options?: Partial<ElFormItemProOptions>) {
      super();
    }
  }

  export class ElFormItemProOptions extends ViewComponentOptions {
    // @Prop({
    //   group: '主要属性',
    //   title: 'For',
    //   description: 'label 原生属性',
    //   setter: { concept: 'InputSetter' },
    // })
    // for: nasl.core.String;

    @Prop<ElFormItemProOptions, 'help'>({
      group: '主要属性',
      title: '帮助文本',
      description: '表单项说明内容。',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.helpIsSlot,
    })
    help: nasl.core.String;

    @Prop<ElFormItemProOptions, 'helpIsSlot'>({
      group: '主要属性',
      title: '帮助文本使用插槽',
      description: '帮助文本使用插槽方式添加',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [{
        clear: ['help'],
        if: (val) => val
      }]
    })
    helpIsSlot: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Label',
    //   description: '字段标签名称。',
    //   setter: { concept: 'InputSetter' },
    // })
    // label: any = '';

    @Prop({
      group: '主要属性',
      title: '标签布局',
      description:
        '表单字段标签对齐方式：左对齐、右对齐、顶部对齐。默认使用 Form 的对齐方式，优先级高于 Form.labelAlign。可选项：left/right/top',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '左对齐' },
          { title: '右对齐' },
          { title: '顶部对齐' },
          { title: '使用表单设置' },
        ],
      },
    })
    labelAlign: 'left' | 'right' | 'top' | '' = '';

    @Prop({
      group: '主要属性',
      title: '标签宽度',
      description: '可以整体设置标签宽度，优先级高于表单项',
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '字段名称',
      description: '表单字段名称',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '必填标记',
      description: '是否显示必填符号（*），优先级高于表单设置的必填标记',
      setter: { concept: 'SwitchSetter' },
    })
    requiredMark: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '验证规则',
      description: '表单字段校验规则。',
      setter: { concept: 'InputSetter' },
      bindHide: true,
    })
    rules: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示错误信息',
      description: '校验不通过时，是否显示错误提示信息，默认使用表单配置',
      setter: { concept: 'SwitchSetter' },
    })
    showErrorMessage: nasl.core.Boolean;

    // @Prop({
    //   group: '主要属性',
    //   title: '校验状态',
    //   description: '校验状态，可在需要完全自主控制校验状态时使用。',
    //   setter: { concept: 'InputSetter' },
    // })
    // status: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示状态图标',
      description:
        '校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标, 默认使用表单配置',
      setter: { concept: 'SwitchSetter' },
    })
    statusIcon: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '显示校验成功的边框',
      description: '是否显示校验成功的边框，默认不显示',
      setter: { concept: 'SwitchSetter' },
    })
    successBorder: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tips',
    //   description:
    //     '自定义提示内容，样式跟随 `status` 变动，可在需要完全自主控制校验规则时使用。',
    //   setter: { concept: 'InputSetter' },
    // })
    // tips: any;

    @Slot({
      title: '说明内容',
      description: '表单项说明内容。',
    })
    slotHelp: () => Array<ViewComponent>;

    @Slot({
      title: '标签',
      description: '字段标签名称。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: '表单组件',
      description: '字段标签名称。',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
