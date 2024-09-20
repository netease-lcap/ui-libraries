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
    description:
      '用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。',
    group: 'Form',
  })
  export class ElFormPro extends ViewComponent {
    @Method({
      title: '获取表单数据',
      description: '获取表单数据',
    })
    getFormData(): any {}

    @Method({
      title: '设置表单数据',
      description: '设置表单数据'
    })
    setFormData(
      @Param({
        title: '表单数据'
      })
      data: any,
    ): void {}

    @Method({
      title: '设置表单字段值',
      description: '设置表单字段值',
    })
    setFieldValue(
      @Param({
        title: '字段名称'
      })
      name: nasl.core.String,
      @Param({
        title: '字段值'
      })
      value: any,
    ): void {};

    @Method({
      title: '获取表单字段值',
      description: '获取表单字段值',
    })
    getFieldValue(
      @Param({
        title: '字段名称',
      })
      name: nasl.core.String,
    ): any {};

    @Method({
      title: '清空校验结果',
      description:
        "可使用 fields 指定清除部分字段的校验结果，fields 值为空则表示清除所有字段校验结果。清除邮箱校验结果示例：clearValidate(['email'])",
    })
    clearValidate(
      @Param({
        title: '字段列表',
      })
      fields: nasl.collection.List<nasl.core.String> = [],
    ): void {}

    @Method({
      title: '重置表单',
      description:
        "表单里面没有重置按钮<button type=\"reset\" />时可以使用该方法，默认重置全部字段为空，该方法会触发 reset 事件。如果表单属性 resetType='empty' 或者 reset.type='empty' 会重置为空；如果表单属性 resetType='initial' 或者 reset.type='initial' 会重置为表单初始值。",
    })
    resetForm(): void {}

    @Method({
      title: '提交表单',
      description:
        '表单里面没有提交按钮<button type="submit" />时可以使用该方法。showErrorMessage 表示是否在提交校验不通过时显示校验不通过的原因，默认显示。该方法会触发 submit 事件',
    })
    submit(): void {}

    @Method({
      title: '校验函数',
      description: '校验函数，包含错误文本提示等功能',
    })
    validate(): {
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
      title: '自动清空字段值',
      description: '表单项隐藏时自动清空字段值',
      group: '数据属性',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    clearFieldOnDestroy: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用整个表单',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '布局模式',
      description: '布局模式，可选线性布局/栅格布局',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '线性布局' }, { title: '栅格布局' }],
      }
    })
    layoutMode: 'linear' | 'grid' = 'linear';

    @Prop<ElFormProOptions, 'layout'>({
      group: '主要属性',
      title: '表单布局',
      description:
        '表单布局，有两种方式：纵向布局 和 行内布局。可选项：vertical/inline',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '纵向布局' }, { title: '行内布局' }],
      },
      if: (_) => _.layoutMode === 'linear',
    })
    layout: 'vertical' | 'inline' = 'vertical';

    @Prop<ElFormProOptions, 'repeat'>({
      group: '主要属性',
      title: '列数',
      description: '整个表单的划分列数',
      docDescription: '整个表单的划分列数。',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      },
      if: (_) => _.layoutMode === 'grid',
    })
    repeat: nasl.core.Integer = 4;

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
      group: '样式属性',
      title: '标签宽度',
      description: '可以整体设置label标签宽度',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '小' },
          { title: '中' },
          { title: '大' },
          { title: '自定义' },
        ]
      }
    })
    labelWidthType: 'small' | 'medium' | 'large' | '' = '';

    @Prop<ElFormProOptions, 'labelWidth'>({
      group: '样式属性',
      title: '自定义标签宽度',
      description: '可以整体设置label标签宽度，默认为100px',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => !_.labelWidthType,
    })
    labelWidth: nasl.core.String | nasl.core.Decimal = '100px';

    @Prop({
      group: '主要属性',
      title: '标签过长省略',
      description: '文字过长是否省略显示。默认文字超出时会换行。',
      docDescription: '文字过长是否省略显示，默认文字超出时会换行。',
      setter: {
          concept: 'SwitchSetter',
      },
    })
    labelEllipsis: nasl.core.Boolean = false;

    @Prop<ElFormProOptions, 'gutterType'>({
      group: '样式属性',
      title: '表单项间隔',
      description: '可以整体设置表单项间隔',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '小' },
          { title: '中' },
          { title: '大' },
          { title: '自定义' },
        ],
      },
      onChange: [{
        clear: ['gutter'],
        if: (val) => val !== 'custom',
      }, {
        update: {
          gutter: '16px',
        },
        if: (val) => val === 'custom',
      }]
    })
    gutterType: 'small' | 'medium' | 'large' | 'custom'  = 'medium';

    @Prop<ElFormProOptions, 'gutter'>({
      group: '样式属性',
      title: '自定义表单项间隔(px)',
      description: '可以整体设置表单项间隔, 例如 8px',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.gutterType === 'custom',
    })
    gutter: nasl.core.String;

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

    // @Prop({
    //   group: '主要属性',
    //   title: '阻止表单默认提交',
    //   description:
    //     '是否阻止表单提交默认事件（表单提交默认事件会刷新页面），设置为 `true` 可以避免刷新',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // preventSubmitDefault: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '重置表单的方式',
    //   description:
    //     '重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值。可选项：empty/initial',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '重置表单为空' }, { title: '重置表单数据为初始值' }],
    //   },
    // })
    // resetType: 'empty' | 'initial' = 'empty';

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
      emptyBackground: 'add-sub-large',
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
      parentAccept: "target.tag.endsWith('el-form-pro') || target.tag.endsWith('el-form-item-pro')",
      ignoreProperty: ['rules'],
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
      forceRefresh: 'parent',
      namedSlotOmitWrapper: ['label'],
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
    @Prop<ElFormItemProOptions, 'name'>({
      group: '数据属性',
      title: '表单字段名称',
      description: '表单字段名称',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.useRangeValue,
    })
    name: nasl.core.String;

    @Prop<ElFormItemProOptions, 'initialValue'>({
      group: '数据属性',
      title: '初始值',
      description: '初始值,重置表单时回到初始值',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.useRangeValue,
    })
    initialValue: any;

    @Prop<ElFormItemProOptions, 'useRangeValue'>({
      group: '数据属性',
      title: '使用区间字段',
      description: '使用区间字段, 用于日期、时间、日期时间选择器开启区间选择时，托管起始值与结束值',
      setter: { concept: 'SwitchSetter' },
      onChange: [{
        clear: ['startFieldName', 'endFieldName'],
        if: (_) => !_,
      }, {
        clear: ['name'],
        if: (_) => !_
      }],
      bindHide: true,
    })
    useRangeValue: nasl.core.Boolean = false;

    @Prop<ElFormItemProOptions, 'startFieldName'>({
      group: '数据属性',
      title: '起始值字段名称',
      description: '起始值字段名称，对应区间选择时起始值字段',
      setter: { concept: 'InputSetter' },
      if: (_) => _.useRangeValue === true,
    })
    startFieldName: nasl.core.String;

    @Prop<ElFormItemProOptions, 'endFieldName'>({
      group: '数据属性',
      title: '结束值字段名称',
      description: '结束值字段名称，对应选择时结束值字段',
      setter: { concept: 'InputSetter' },
      if: (_) => _.useRangeValue === true,
    })
    endFieldName: nasl.core.String;

    @Prop<ElFormItemProOptions, 'startInitialValue'>({
      group: '数据属性',
      title: '起始初始值',
      description: '起始初始值',
      setter: { concept: 'InputSetter' },
      if: (_) => _.useRangeValue === true,
    })
    startInitialValue: any;

    @Prop<ElFormItemProOptions, 'endInitialValue'>({
      group: '数据属性',
      title: '结束初始值',
      description: '结束初始值',
      setter: { concept: 'InputSetter' },
      if: (_) => _.useRangeValue === true,
    })
    endInitialValue: any;

    @Prop({
      group: '主要属性',
      title: '占据数',
      description: '列跨越的格数, 总格式',
      docDescription: '列跨越的格数。',
      setter: {
          concept: 'NumberInputSetter',
          min: 1,
      },
    })
    colSpan: nasl.core.Integer = 1;

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
      description: '可以整体设置label标签宽度',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '小' },
          { title: '中' },
          { title: '大' },
          { title: '自定义' },
        ],
      }
    })
    labelWidthType: 'small' | 'medium' | 'large' | '';

    @Prop<ElFormItemProOptions, 'labelWidth'>({
      group: '主要属性',
      title: '标签宽度',
      description: '可以整体设置标签宽度，优先级高于表单项',
      setter: { concept: 'InputSetter' },
      if: (_) => _.labelWidthType === '',
    })
    labelWidth: nasl.core.String | nasl.core.Decimal;


    @Prop({
      group: '主要属性',
      title: '标签过长省略',
      description: '文字过长是否省略显示。默认文字超出时会换行。',
      docDescription: '文字过长是否省略显示，默认文字超出时会换行。',
      setter: {
          concept: 'EnumSelectSetter',
          options: [{ title: '省略' }, { title: '文字换行' }, { title: '使用表单配置' }]
      },
    })
    labelEllipsis: 'show' | 'hide' | '' | nasl.core.Boolean = '';

    @Prop({
      group: '主要属性',
      title: '必填标记',
      description: '是否显示必填符号（*），优先级高于表单设置的必填标记',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '显示' }, { title: '隐藏' }, { title: '使用表单配置' }]
       },
    })
    requiredMark: 'show' | 'hide' | '' | nasl.core.Boolean = '';

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
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '显示' }, { title: '隐藏' }, { title: '使用表单配置' }]
      },
    })
    showErrorMessage: 'show' | 'hide' | '' | nasl.core.Boolean = '';

    @Prop({
      group: '主要属性',
      title: '显示状态图标',
      description:
        '校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标, 默认使用表单配置',
        setter: {
          concept: 'EnumSelectSetter',
          options: [{ title: '显示' }, { title: '隐藏' }, { title: '使用表单配置' }]
        },
    })
    statusIcon: 'show' | 'hide' | '' | nasl.core.Boolean = '';

    @Prop({
      group: '主要属性',
      title: '显示校验成功的边框',
      description: '是否显示校验成功的边框，默认不显示',
      setter: { concept: 'SwitchSetter' },
    })
    successBorder: nasl.core.Boolean = false;

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
      description: '表单组件',
      snippets: [
        {
          title: '表单项',
          code: '<el-form-item-pro></el-form-item-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
